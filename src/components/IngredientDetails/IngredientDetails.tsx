import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/types";
import { IUseParams } from "../../types";
import Loading from "../../pages/Loading/Loading";
import styles from "./IngredientDetails.module.css";

export const IngredientDetails: FC = () => {
  const { id } = useParams<IUseParams>();
  const ingredients = useAppSelector((store) => store.data?.ingredients);

  const ingredientMatch = ingredients?.find((item) => {
    return item._id === id;
  });

  const { image_large, name, calories, carbohydrates, fat, proteins } =
    ingredientMatch || {};

  if (ingredientMatch) {
    return (
      <div className={`pl-10 pr-10 ${styles.ingredient}`}>
        <div className={`mt-10 ${styles.ingredient__header}`}>
          <h2
            className={`text text_type_main-large ${styles.ingredient__title}`}
          >
            Детали ингредиента
          </h2>
        </div>
        <img
          className={`mt-15 mb-15 ${styles.ingredient__image}`}
          src={image_large}
          alt="Ингредиент"
        />
        <p
          className={`text text_type_main-medium mt-4 mb-8 ${styles.ingredient__name}`}
        >
          {name}
        </p>
        <ul
          className={`text text_type_main-default mb-15 ${styles.ingredient__listItem}`}
        >
          <li
            className={`text text_type_main-default ${styles.ingredient__item}`}
          >
            <p
              className={`text text_type_main-default ${styles.ingredient__itemText}`}
            >
              Калории,ккал
            </p>
            <p className={`${styles.ingredient__itemValue}`}>{calories}</p>
          </li>
          <li
            className={`text text_type_main-default ${styles.ingredient__item}`}
          >
            <p
              className={`text text_type_main-default ${styles.ingredient__itemText}`}
            >
              Белки, г
            </p>
            <p className={`${styles.ingredient__itemValue}`}>{carbohydrates}</p>
          </li>
          <li
            className={`text text_type_main-default ${styles.ingredient__item}`}
          >
            <p
              className={`text text_type_main-default ${styles.ingredient__itemText}`}
            >
              Жиры, г
            </p>
            <p className={`${styles.ingredient__itemValue}`}>{fat}</p>
          </li>
          <li
            className={`text text_type_main-default ${styles.ingredient__item}`}
          >
            <p
              className={`text text_type_main-default ${styles.ingredient__itemText}`}
            >
              Углеводы, г
            </p>
            <p className={`${styles.ingredient__itemValue}`}>{proteins}</p>
          </li>
        </ul>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default IngredientDetails;
