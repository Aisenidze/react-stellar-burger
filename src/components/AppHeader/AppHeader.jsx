import { Logo, BurgerIcon, ProfileIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.wrapper}>
                <div className={styles['header_left-content']}>
                    <button className={styles.button_header}>
                        <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-small pl-2">Конструктор</p>
                        </div>
                    </button>
                    <button className={styles.button_header}>
                    <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                    </div>
                    </button>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles['header_right-content']}>
                <button className={styles.button_header}>
                    <div className={`${styles.box_items} pr-5 pt-4 pb-4`}>
                        <ProfileIcon type="primary"/>
                        <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
                    </div>
                </button>
                </div>
            </nav>
        </header>
    ) 
}
export default AppHeader;