import React from 'react';
import styles from './NotFoundPage.module.css';

export const NotFound404 = () => {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h3 className='text text_type_main-large mt-10 mb-10'>Страница не найдена!</h3>
        <div className='text text_type_main-default'>Попробуйте вернуться на главную страницу:
          <div className={`${styles.link} text text_type_main-default ml-2`} to='/'>Главная страница</div></div>
      </div>
    </main>
  );
}