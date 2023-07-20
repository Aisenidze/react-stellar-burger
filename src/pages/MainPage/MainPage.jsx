import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import Modal from "../../components/Modal/Modal";
import styles from './MainPage.module.css'


export function MainPage() {
  return (
        <div className={styles.template}>
          <div className={styles.wrapper}>
            <BurgerIngredients/>
            <BurgerConstructor/>
            <Modal/>
          </div>
        </div>
  )
}

