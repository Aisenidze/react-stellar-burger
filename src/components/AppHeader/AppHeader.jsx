import { Logo, BurgerIcon, ProfileIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.wrapper}>
                <div className={styles['header_left-content']}>
                    <button className={styles.button_header}>
                        <div className={`${styles.box_items} pl-5 pr-5 pt-4 pb-4`}>
                            <BurgerIcon type="primary" />
                            <p>Конструктор</p>
                        </div>
                    </button>
                    <button className={styles.button_header}>
                    <div className={`${styles.box_items} pl-5 pr-5 pt-4 pb-4`}>
                        <ListIcon type="secondary"/>
                        <p>Лента заказов</p>
                    </div>
                    </button>
                </div>
                <div>
                    <Logo />
                </div>
                <div className={styles['header_right-content']}>
                <button className={styles.button_header}>
                    <div className={`${styles.box_items} pl-5 pr-5 pt-4 pb-4`}>
                        <ProfileIcon type="primary"/>
                        <p>Личный кабинет</p>
                    </div>
                </button>
                </div>
            </nav>
        </header>
    ) 
}
export default AppHeader;