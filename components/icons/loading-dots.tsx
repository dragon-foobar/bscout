import styles from './loading-dots.module.css';

const LoadingDots = ({ color = '#F2A900' }: { color: string }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
