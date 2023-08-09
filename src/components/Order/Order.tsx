import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, FC } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/types";
import { IUseLocation } from "../../types";
import { TOrder } from "../../services/types";
import Loading from "../../pages/Loading/Loading";
import styles from "./Order.module.css";

interface IOrderProps {
  orderInfo: TOrder;
}

export const Order: FC<IOrderProps> = ({ orderInfo }) => {
  const ingredients = useAppSelector((store) => store.data?.ingredients);
  const user = useAppSelector((state) => state.user.userData.name);
  const location = useLocation<IUseLocation>();

  const returnIngredientsPrice = useCallback(() => {
    const arrOfIngredientsPrice = orderInfo?.ingredients?.map((ingredient) => {
      if (ingredient !== null) {
        return ingredients?.find((item) => item?._id === ingredient)?.price;
      } else {
        return 0;
      }
    });

    return arrOfIngredientsPrice.reduce(
      (acc: number, item: number | undefined) => {
        if (item) {
          acc += item;
        }
        return acc;
      },
      0
    );
  }, [ingredients, orderInfo?.ingredients]);

  const returnIngredients = useCallback(() => {
    const mutatedIngredients = Array.from(new Set(orderInfo?.ingredients));
    return mutatedIngredients.map((ingredient, index) => {
      return ingredients?.find((item) => item._id === ingredient);
    });
  }, [ingredients, orderInfo?.ingredients]);

  let offset = -45;

  if (orderInfo && ingredients) {
    return (
      <li className={`pl-6 pr-6 pb-6 mr-2 ${styles.order}`}>
        <div className={`mt-6 ${styles.orderHeader}`}>
          <p className={`text text_type_digits-default ${styles.orderNumber}`}>
            {`#${orderInfo?.number}`}
          </p>
          <p
            className={`text text_color_inactive text_type_main-default ${styles.orderNumber}`}
          >
            <FormattedDate date={new Date(orderInfo?.createdAt)} /> i-GMT+3
          </p>
        </div>
        <p
          className={`text text_type_main-medium ${styles.orderName}`}
        >{`${orderInfo?.name}`}</p>

        {user && location.pathname === "/profile/orders" && (
          <p
            className={`text text_type_main-small ${styles.orderStatus} ${
              orderInfo?.status === "done" ? "text_color_success" : null
            }`}
          >{`${orderInfo?.status === "done" ? "Выполнен" : "Готовится"}`}</p>
        )}

        <div className={`mb-6 ${styles.orderContent}`}>
          <ul className={` ${styles.orderIngredients}`}>
            {returnIngredients().map((ingredient, index) => {
              offset = offset + 45;
              if (index > 5) {
                return null;
              } else if (index === 5) {
                return (
                  <li
                    key={index}
                    style={{ zIndex: 6 - index, left: offset + "px" }}
                    className={`${styles.orderIngredientElement}`}
                  >
                    <img
                      src={ingredient?.image}
                      alt={ingredient?.name}
                      style={{ zIndex: 6 - index, opacity: 0.4 }}
                      className={`${styles.orderIngredientImage}`}
                    />
                    <p
                      className={`text  ${styles.orderIngredientCounter}`}
                      style={{ zIndex: 6 }}
                    >
                      {`+${returnIngredients().length - index}`}
                    </p>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    style={{ zIndex: 6 - index, left: offset + "px" }}
                    className={`${styles.orderIngredientElement}`}
                  >
                    <img
                      src={ingredient?.image}
                      alt={ingredient?.name}
                      style={{ zIndex: 6 - index }}
                      className={`${styles.orderIngredientImage}`}
                    />
                  </li>
                );
              }
            })}
          </ul>
          <div className={`pt-5 ${styles.orderTotal}`}>
            <p className={`mr-2 text text_type_digits-default`}>
              {returnIngredientsPrice()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    );
  } else {
    return <Loading />;
  }
};
