import { useMemo, FC } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import {
  TIngredient,
  useAppDispatch,
  useAppSelector,
} from "../../../../services/types";
import { getCardData } from "../../../../services/reducers/dataReducer";
import { openIngredient } from "../../../../services/reducers/modalReducer";
import styles from "./BurgerIngredient.module.css";
import classNames from "classnames";

interface IBurgerIngredientProps {
  cardData: TIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ cardData }) => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((store) => store.burgerConstructor);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: cardData,
  });

  const getCardsData = (cardData: TIngredient) => {
    dispatch(getCardData(cardData));
    dispatch(openIngredient);
  };

  const quantity = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient._id === cardData._id)
      .length;
  }, [ingredients, cardData._id]);

  return (
    <li
      ref={dragRef}
      tabIndex={0}
      className={styles.card}
      onClick={() => getCardsData(cardData)}
    >
      {quantity !== 0 && <Counter count={quantity} size="default" />}
      <img
        src={cardData.image}
        alt={cardData.name}
        className={styles.card__image}
      ></img>
      <div className={classNames(styles.card__price, `mb-2`)}>
        <p className={classNames(styles.card__count, `mr-2`)}>
          {cardData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={classNames(
          styles.card__description,
          `text text_type_main-small`
        )}
      >
        {cardData.name}
      </p>
    </li>
  );
};

export default BurgerIngredient;
