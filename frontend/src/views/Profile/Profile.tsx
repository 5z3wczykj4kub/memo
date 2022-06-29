import { Tab } from '@headlessui/react';
import { Navigate, useParams } from 'react-router-dom';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import useAppSelector from '../../hooks/useAppSelector';
import { useGetUserByIdQuery } from '../../rtk/api';
import { selectCurrentUser } from '../../rtk/authSlice';
import styles from './Profile.module.scss';

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const isCurrentUserAuthenticated =
    currentUser.id || localStorage.getItem('token');

  const { userId } = useParams();

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isSuccess: isUserProfileFetchedWithSuccess,
    isError: isUserProfileFetchedWithError,
  } = useGetUserByIdQuery(userId!, { skip: !isCurrentUserAuthenticated });

  if (!isCurrentUserAuthenticated) return <Navigate to='/' replace />;

  return (
    <main className={styles.profile}>
      <Tab.Group>
        <BackToHomeLink />
        <UsernameHeader
          username={userProfileData?.username}
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
