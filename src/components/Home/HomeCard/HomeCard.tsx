import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import styles from './HomeCard.module.scss';

interface IHomeCard {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const HomeCard = ({ setIsModalVisible }: IHomeCard) => {
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
          <Button onClick={() => setIsModalVisible(true)}>Play game</Button>
          <Button>Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
