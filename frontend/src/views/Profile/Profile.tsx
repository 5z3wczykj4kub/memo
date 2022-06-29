import { Tab } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import { useGetUserByIdQuery } from '../../rtk/api';
import styles from './Profile.module.scss';

const Profile = () => {
  const { userId } = useParams();

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isSuccess: isUserProfileFetchedWithSuccess,
    isError: isUserProfileFetchedWithError,
  } = useGetUserByIdQuery(userId!);

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
