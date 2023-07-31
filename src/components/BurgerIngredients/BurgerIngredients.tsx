import { useInView } from 'react-intersection-observer';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./elements/BurgerIngredient/BurgerIngredient";
import styles from './BurgerIngredients.module.css';
import { useAppSelector } from "../../hooks/typeHook";
import { FC } from 'react';

const BurgerIngredients: FC = () => {
  const { buns } = useAppSelector(state => state.buns);
  const bun = buns?.data.filter((item) => item.type === "bun");
  const sauces = buns?.data.filter((item) => item.type === "sauce");
  const mains = buns?.data.filter((item) => item.type === "main");

  const { ref: refBuns, inView: bunsIsView, entry: bunsEntry } = useInView({
    threshold: 0,
  });
  const { ref: refSauces, inView: saucesIsView, entry: bunsSauces } = useInView({
    threshold: 0,
  });
  const { ref: refMains, inView: mainsIsView, entry: mainsEntry } = useInView({
    threshold: 0,
  });

  function scrollingTo(value: any) {
    value?.target.scrollIntoView({behavior:"smooth"});
  }
  
  return (
    <div className={styles.main}>
      <h1>Соберите бургер</h1>
      <nav className={styles.menu_ingredients}>
        <Tab value="buns" active={bunsIsView} onClick={() => {
          scrollingTo(bunsEntry);
        }}>
          Булки
        </Tab>
        <Tab value="sauces" active={saucesIsView && !bunsIsView} onClick={() => {
          scrollingTo(bunsSauces);
        }}>
          Соусы
        </Tab>
        <Tab value="mains" active={mainsIsView && !bunsIsView && !saucesIsView} onClick={() => {
          scrollingTo(mainsEntry);
        }}>
          Начинки
        </Tab>
      </nav>

      <div className={styles.scrollbar}>
        <div ref={refBuns}>
          <h2>Булки</h2>
          <div className={`${styles.buns} startDrag isDragging`}>
            {bun?.map((bun) => (
              <BurgerIngredient ingredient={bun} key={bun._id}/>
            ))}
          </div>
        </div>

        <div ref={refSauces}>
          <h2>Соусы</h2>
          <div className={`${styles.buns} startDrag isDragging`}>
            {sauces?.map((sauce) => (
              <BurgerIngredient ingredient={sauce} key={sauce._id}/>
            ))}
          </div>
        </div>

        <div ref={refMains}>
          <h2>Начинки</h2>
          <div className={`${styles.buns} startDrag isDragging`}>
            {mains?.map((main) => (
              <BurgerIngredient ingredient={main} key={main._id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BurgerIngredients;
