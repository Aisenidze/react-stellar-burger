import { Logo, BurgerIcon, ProfileIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { FC } from "react";

const AppHeader: FC = () => {
    const match = useLocation().pathname;

    return (
        <header className={styles.header}>
            <nav className={styles.wrapper}>
                <div className={styles['header_left-content']}>
                    <Link className={styles.button_header} to='/'>
                        <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                            <BurgerIcon type={match === '/' ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-default ${match !== '/' && 'text_color_inactive'} pl-2`}>Конструктор</p>
                        </div>
                    </Link>
                    <button className={styles.button_header}>
                    <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                        <ListIcon type={match === '/lens' ? 'primary' : 'secondary'}/>
                        <p className={`text text_type_main-default ${match !== '/lens' && 'text_color_inactive'} pl-2`}>Лента заказов</p>
                    </div>
                    </button>
                </div>
                <Link className={styles.logo} to='/'>
                    <Logo />
                </Link>
                <div className={styles['header_right-content']}>
                <Link className={styles.button_header} to='/profile'>
                    <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                        <ProfileIcon type={match === '/profile' ? 'primary' : 'secondary'} />
                        <p className={`text text_type_main-default ${match !== '/profile' && 'text_color_inactive'} pl-2`}>Личный кабинет</p>
                    </div>
                </Link>
                </div>
            </nav>
        </header>
    ) 
}
export default AppHeader;
