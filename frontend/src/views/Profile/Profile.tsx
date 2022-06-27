import { Tab } from '@headlessui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import useAppSelector from '../../hooks/useAppSelector';
import useEffectOnce from '../../hooks/useEffectOnce';
import { useGetUserByIdQuery } from '../../rtk/api';
import { selectCurrentUser } from '../../rtk/authSlice';
import { IResponseCatchError } from '../../rtk/types';
import styles from './Profile.module.scss';

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { userId } = useParams();

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isSuccess: isUserProfileFetchedWithSuccess,
    isError: isUserProfileFetchedWithError,
    error: userProfileError,
    refetch,
  } = useGetUserByIdQuery(userId!);

  /**
   * TODO:
   * - Add transitions.
   * - Display `isFetching` toast.
   */
  useEffectOnce(() => {
    if (userId === currentUser.id) refetch();
  });

  useEffect(() => {
    if (!userProfileError) return;
    toast.error('Failed to fetch user profile page');
    (userProfileError as IResponseCatchError).data.errors.forEach(
      ({ message }) => toast.error(message, { toastId: message })
    );
  }, [userProfileError]);

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
