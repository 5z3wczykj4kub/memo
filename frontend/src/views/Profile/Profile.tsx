import { Tab } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import useAppSelector from '../../hooks/useAppSelector';
import useEffectOnce from '../../hooks/useEffectOnce';
import { useGetUserByIdQuery } from '../../rtk/api';
import { selectCurrentUser } from '../../rtk/authSlice';
import styles from './Profile.module.scss';

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { userId } = useParams();

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isSuccess: isUserProfileFetchedWithSuccess,
    isError: isUserProfileFetchedWithError,
    refetch,
  } = useGetUserByIdQuery(userId!);

  /**
   * TODO:
   * - Add transitions.
   * - Display promise toast.
   * - Handle error cases.
   */
  useEffectOnce(() => {
    if (userId === currentUser.id) refetch();
  });

  return (
    <main className={styles.profile}>
      {isUserProfileLoading && <p>Fetching user profile...</p>}
      {isUserProfileFetchedWithSuccess && (
        <>
          <BackToHomeLink />
          <UsernameHeader />
          <Tab.Group>
            <TabList />
            <Tab.Panels className={styles['profile__tab-panels']}>
              <ProfileTabPanel {...userProfileData} />
              <Tab.Panel>Coming soon</Tab.Panel>
              <Tab.Panel>Coming soon</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
      {isUserProfileFetchedWithError && (
        <p>Something went wrong. Please try again</p>
      )}
    </main>
  );
};

export default Profile;
