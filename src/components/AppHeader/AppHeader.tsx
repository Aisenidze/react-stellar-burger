import { FC } from 'react';
import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/types';
import { IUseLocation } from '../../types';
import styles from './AppHeader.module.css';
import classNames from 'classnames';

const AppHeader: FC = () => {
    const { pathname } = useLocation<IUseLocation>();
    const store = useAppSelector(store => store);

    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <div className={classNames(styles.header__group, styles.link)}>
                    <NavLink to='/' className={classNames(styles.header__button, `pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`)} activeClassName={styles.active}>
                        <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={pathname !== '/' ? { color: '#8585AD' } : undefined}>Конструктор</p>
                    </NavLink>
                    <NavLink to='/feed' className={classNames(styles.header__button, `pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`)} activeClassName={styles.active}>
                        <ListIcon type={pathname.startsWith('/feed') ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={!pathname.startsWith('/feed') ? { color: '#8585AD' } : undefined}>Лента заказов</p>
                    </NavLink>
                </div>
                <Link to='/'>
                    <Logo />
                </Link>
                <NavLink to={`/profile`} className={classNames(styles.header__button, styles.link,`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`)} activeClassName={styles.active}>
                    <ProfileIcon type={pathname.startsWith('/profile') ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default ml-2`} style={!pathname.startsWith('/profile') ? { color: '#8585AD' } : undefined}>{store.user.userData.name ? store.user.userData.name : 'Личный кабинет'} </p>
                </NavLink>
            </nav>
        </header >
    );
}

export default AppHeader;