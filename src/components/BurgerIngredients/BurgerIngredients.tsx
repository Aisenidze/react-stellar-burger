import { FC } from "react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientGroup from "./elements/BurgerIngredientGroup/BurgerIngredientGroup";
import { toggleIngredientsTab } from "../../services/reducers/dataReducer";
import { useAppDispatch, useAppSelector } from "../../services/types";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, ingredientsCurrentTab } = useAppSelector((store) => store.data);

  const handleTabClick = (tab: string) => {
    dispatch(toggleIngredientsTab(tab));
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      dispatch(toggleIngredientsTab("bun"));
    } else if (inViewSauces) {
      dispatch(toggleIngredientsTab("sauce"));
    } else if (inViewFilling) {
      dispatch(toggleIngredientsTab("main"));
    }
  }, [
    ingredientsCurrentTab,
    inViewBuns,
    inViewFilling,
    inViewSauces,
    dispatch,
  ]);

  const dataBun = useMemo(() => {
    return ingredients?.filter((item) => item.type === "bun");
  }, [ingredients]);

  const dataMain = useMemo(() => {
    return ingredients?.filter((item) => item.type === "main");
  }, [ingredients]);

  const dataSauce = useMemo(() => {
    return ingredients?.filter((item) => item.type === "sauce");
  }, [ingredients]);

  return (
    <section className={styles.ingredients}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={classNames(styles[`ingredients__switcher`], `mb-10`)}>
        <Tab
          value="bun"
          active={ingredientsCurrentTab === "bun"}
          onClick={() => {
            handleTabClick("bun");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={ingredientsCurrentTab === "sauce"}
          onClick={() => {
            handleTabClick("sauce");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={ingredientsCurrentTab === "main"}
          onClick={() => {
            handleTabClick("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles[`ingredients__content`]}>
        <BurgerIngredientGroup
          ref={bunsRef}
          data={dataBun}
          titleId="bun"
          title={"Булки"}
        />
        <BurgerIngredientGroup
          ref={saucesRef}
          data={dataSauce}
          titleId="sauce"
          title={"Соусы"}
        />
        <BurgerIngredientGroup
          ref={mainsRef}
          data={dataMain}
          titleId="main"
          title={"Начинки"}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
