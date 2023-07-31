import { FC } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound: FC = () => {
    return (
        <div className={`${styles.notFound}`}>
            <Link to='/'>
                <Logo />
            </Link>
            <h2 className={`text text_type_main-large mt-10 mb-8 ${styles.notFound_title}`}>Страница не найдена</h2>
            <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Ошибка 404</h3>
            <Link to='/' className={`text text_type_main-default ${styles.link}`}>
                На главную
            </Link>
        </div >
    )
}