import { Tab } from '@headlessui/react';
import BackToHomeLink from '../../components/Profile/BackToHomeLink/BackToHomeLink';
import ProfileTabPanel from '../../components/Profile/ProfileTabPanel/ProfileTabPanel';
import TabList from '../../components/Profile/TabList/TabList';
import UsernameHeader from '../../components/Profile/UsernameHeader/UsernameHeader';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <main className={styles.profile}>
      <BackToHomeLink />
      <UsernameHeader />
      <Tab.Group>
        <TabList />
        <Tab.Panels className={styles['profile__tab-panels']}>
          <ProfileTabPanel />
          <Tab.Panel>Coming soon</Tab.Panel>
          <Tab.Panel>Coming soon</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default Profile;
