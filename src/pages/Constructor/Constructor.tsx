import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { addIngredient } from "../../services/reducers/constructorReducer";
import { useAppDispatch } from "../../services/types";
import { TIngredient } from "../../services/types";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./Constructor.module.css";

export const Constructor: FC = () => {
  const dispatch = useAppDispatch();

  const handleDrop = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.column}>
          <BurgerIngredients />
        </div>
        <div className={styles.column}>
          <BurgerConstructor onDropHandler={handleDrop} />
        </div>
      </DndProvider>
    </main>
  );
};
