import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__404']}>404</h1>
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFound;
