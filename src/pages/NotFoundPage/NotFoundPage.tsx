import { FC } from 'react';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export const NotFound404: FC = () => {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h3 className='text text_type_main-large mt-10 mb-10'>Страница не найдена!</h3>
        <div className='text text_type_main-default'>Попробуйте вернуться на главную страницу:
          <Link className={`${styles.link} text text_type_main-default ml-2`} to='/'>Главная страница</Link>
        </div>
      </div>
    </main>
  );
}