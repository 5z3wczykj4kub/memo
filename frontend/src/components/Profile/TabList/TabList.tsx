import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import useTheme from '../../../hooks/useTheme';
import styles from '../../../views/Profile/Profile.module.scss';
import Button from '../../General/Button/Button';

const TabList = () => {
  const { isDarkThemeUsed } = useTheme();

  const tabs = ['Profile', 'Ranking', 'Achievements'];

  return (
    <Tab.List className={styles['profile__tab-list']}>
      {tabs.map((tab) => (
        <Tab key={tab} as={Fragment}>
          {({ selected }) => (
            <Button
              className={classNames({
                [styles['profile__tab-list__tab']]: true,
                [styles['profile__tab-list__tab--selected']]: selected,
                [styles['profile__tab-list__tab--dark']]: isDarkThemeUsed,
              })}
            >
              {tab}
            </Button>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
};

export default TabList;
