import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import styles from './HomeCard.module.scss';

interface IHomeCard {
  setIsGameModalVisible: Dispatch<SetStateAction<boolean>>;
  setIsSettingsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const HomeCard = ({
  setIsGameModalVisible,
  setIsSettingsModalVisible,
}: IHomeCard) => {
  const { isDarkThemeUsed } = useTheme();

  const headingClassName = classNames({
    [styles['home__card__rows__heading']]: true,
    [styles['home__card__rows__heading--dark']]: isDarkThemeUsed,
  });

  const homeCardRowsHeadingImageClassName = classNames({
    [styles['home__card__rows__heading__image']]: true,
    [styles['home__card__rows__heading__image--dark']]: isDarkThemeUsed,
  });

  return (
    <div className={styles.home}>
      <div className={styles['home__card']}>
        <div className={styles['home__card__rows']}>
          <h1 className={headingClassName}>
            Coder's memo
            <img
              className={homeCardRowsHeadingImageClassName}
              src='./images/code.png'
              alt='code'
            />
          </h1>
          <Button
            className={styles['home__card__rows__button']}
            onClick={() => setIsGameModalVisible(true)}
          >
            Play game
          </Button>
          <Button
            className={styles['home__card__rows__button']}
            onClick={() => setIsSettingsModalVisible(true)}
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
