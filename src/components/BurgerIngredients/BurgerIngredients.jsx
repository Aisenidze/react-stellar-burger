import { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredient from "./elements/BurgerIngredient/BurgerIngredient";
import styles from './BurgerIngredients.module.css';
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const {buns} = useSelector(state => state.buns);
  const bun = buns.data.filter((item) => item.type === "bun");
  const sauces = buns.data.filter((item) => item.type === "sauce");
  const mains = buns.data.filter((item) => item.type === "main");
  const [currentIngredients, setCurrentIngredients] = useState('bun');

  const refBuns = useRef(null);
  const refSauces = useRef(null);
  const refMains = useRef(null);


  function handleOnIngredient(item) {
      setCurrentIngredients(item)
  }

  function scrollingTo(value) {
    value.current.scrollIntoView();
  }

  return (
    <div className={styles.main}>
      <h1>Соберите бургер</h1>
      <nav className={styles.menu_ingredients}>
        <Tab value="buns" active={currentIngredients === 'bun'} onClick={() => {
          handleOnIngredient('bun')
          scrollingTo(refBuns);
        }}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentIngredients === 'sauce'} onClick={() => {
          handleOnIngredient('sauce')
          scrollingTo(refSauces);
        }}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentIngredients === 'main'} onClick={() => {
          handleOnIngredient('main')
          scrollingTo(refMains);
        }}>
          Начинки
        </Tab>
      </nav>

      <div className={styles.scrollbar}>
        <h2 ref={refBuns}>Булки</h2>
        <div className={`${styles.buns} startDrag isDragging`}>
          {bun.map((bun) => (
            <BurgerIngredient ingredient={bun} key={bun._id} />
          ))}
        </div>
        <h2 ref={refSauces}>Соусы</h2>
        <div className={`${styles.buns} startDrag isDragging`}>
          {sauces.map((sauce) => (
            <BurgerIngredient ingredient={sauce} key={sauce._id} />
          ))}
        </div>
        <h2 ref={refMains}>Начинки</h2>
        <div className={`${styles.buns} startDrag isDragging`}>
          {mains.map((main) => (
            <BurgerIngredient ingredient={main} key={main._id} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default BurgerIngredients;