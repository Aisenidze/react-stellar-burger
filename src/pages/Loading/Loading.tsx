import { FC, memo } from "react";
import styles from './Loading.module.css';

const Loading: FC = () => {
  return <div className={styles.load}>Loading...</div>
};

export default memo(Loading);
