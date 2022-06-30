import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import { IUserProfile } from '../../../rtk/types';
import calculateLevel from '../../../utils/functions/calculateLevel';
import styles from '../../../views/Profile/Profile.module.scss';

interface IExperience {
  experience: IUserProfile['experience'];
}

const Experience = ({ experience }: IExperience) => {
  const { currentLevel, currentLevelExperience, currentLevelProgress } =
    calculateLevel(experience!);

  return (
    <>
      <div className={styles['profile__tab-panels__panel__heading']}>
        Level {currentLevel}
      </div>
      <div className={styles['profile__tab-panels__panel__progress']}>
        <TrophyIcon
          className={styles['profile__tab-panels__panel__progress__trophy']}
        />
        <div className={styles['profile__tab-panels__panel__progress__bar']}>
          <div
            className={
              styles['profile__tab-panels__panel__progress__bar__line']
            }
          >
            <div
              className={
                styles[
                  'profile__tab-panels__panel__progress__bar__line__percent'
                ]
              }
              style={{
                width: currentLevelProgress,
              }}
            ></div>
          </div>
          <div
            className={styles['profile__tab-panels__panel__progress__bar__exp']}
          >
            <div>{currentLevelExperience} EXP</div>
            <div>6000 EXP</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
