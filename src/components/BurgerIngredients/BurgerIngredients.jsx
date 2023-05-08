import BurgerIngredient from "./elements/BurgerIngredient/BurgerIngredient";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';

const BurgerIngredients = (props) => {
    const {items} = props;
    const buns = items.filter((item) => item.type === "bun");
    const sauces = items.filter((item) => item.type === "sauce");
    const mains = items.filter((item) => item.type === "main");
    const [currentIngredients, setCurrentIngredients] = useState('buns');

    function handleOnIngredient(item) {
        setCurrentIngredients(item)
    }

    
    return (
    <div className={styles.main}>
            <h1>Соберите бургер</h1>
            <nav className={styles.menu_ingredients}>
            <Tab value="buns" active={currentIngredients === 'buns'} onClick={() => handleOnIngredient('buns')}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentIngredients === 'sauces'} onClick={() => handleOnIngredient('sauces')}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentIngredients === 'mains'} onClick={() => handleOnIngredient('mains')}>
          Начинки
        </Tab>
            </nav>
            <div className={styles.scrollbar}>
                <h2>Булки</h2>
                <div className={styles.buns}>
                    {buns.map((bun) => (
                        <BurgerIngredient ingredient={bun} key={bun._id} />
                    ))}
                </div>
                <h2>Соусы</h2>
                <div className={styles.buns}>
                    {sauces.map((sauce) => (
                        <BurgerIngredient ingredient={sauce} key={sauce._id} />
                    ))}
                </div>
                <h2>Начинки</h2>
                <div className={styles.buns}>
                    {mains.map((main) => (
                        <BurgerIngredient ingredient={main} key={main._id} />
                    ))}
                </div>
            </div>
    </div>
    )
}
export default BurgerIngredients;