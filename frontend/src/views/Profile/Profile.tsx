import { Tab } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useEffectOnce from '../../hooks/useEffectOnce';
import { api, useGetUserByIdQuery } from '../../rtk/api';
import { selectCurrentUser, setShouldUpdate } from '../../rtk/authSlice';
import { IResponseCatchError, IUserProfile } from '../../rtk/types';
import styles from './Profile.module.scss';

const PROFILE_UPDATE_TOAST_MESSAGE = {
  PENDING: 'Updating profile data...',
  SUCCESS: 'Profile updated',
  ERROR: 'Failed to update profile data',
};

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  const { userId } = useParams();

  const shouldRefetchUserProfile =
    userId === currentUser.id && currentUser.shouldUpdate;

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isSuccess: isUserProfileFetchedWithSuccess,
    isError: isUserProfileFetchedWithError,
  } = useGetUserByIdQuery(userId!, {
    refetchOnMountOrArgChange: shouldRefetchUserProfile,
  });

  useEffectOnce(async () => {
    if (!userProfileData || !shouldRefetchUserProfile) return;

    const getUserByIdPromise = api.util.getRunningOperationPromise(
      'getUserById',
      userId!
    );

    try {
      await toast.promise(
        getUserByIdPromise?.unwrap() as Promise<IUserProfile>,
        {
          pending: PROFILE_UPDATE_TOAST_MESSAGE.PENDING,
          success: PROFILE_UPDATE_TOAST_MESSAGE.SUCCESS,
          error: PROFILE_UPDATE_TOAST_MESSAGE.ERROR,
        }
      );
    } catch (error) {
      (error as IResponseCatchError).data.errors.forEach(({ message }) =>
        toast.error(message, { toastId: message })
      );
    } finally {
      dispatch(setShouldUpdate(false));
    }
  });

  return (
    <main className={styles.profile}>
      <Tab.Group>
        <BackToHomeLink />
        <UsernameHeader
          isUserProfileLoading={isUserProfileLoading}
          isUserProfileFetchedWithSuccess={isUserProfileFetchedWithSuccess}
          isUserProfileFetchedWithError={isUserProfileFetchedWithError}
        />
        {isUserProfileFetchedWithSuccess && (
          <>
            <TabList />
            <Tab.Panels className={styles['profile__tab-panels']}>
              <ProfileTabPanel {...userProfileData} />
              <Tab.Panel>Coming soon</Tab.Panel>
              <Tab.Panel>Coming soon</Tab.Panel>
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
    </main>
  );
};

export default Profile;
