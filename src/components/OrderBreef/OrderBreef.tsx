import { FC } from "react";
import orderAcceptedImg from "../../image/graphics.svg";
import { useAppSelector } from "../../services/types";
import styles from "./OrderBreef.module.css";

export const OrderBrief: FC = () => {
  const orderNumber = useAppSelector(
    (store) => store.burgerConstructor.orderNumber
  );

  return (
    <div className={styles.order}>
      <h2
        className={`text text_type_digits-large mt-30 mb-8 ${styles.order__title}`}
      >
        {orderNumber}
      </h2>
      <p className={`text text_type_main-medium ${styles.order__id}`}>
        Идентификатор заказа
      </p>
      <img
        className={`mt-15 mb-15 ${styles.order__image}`}
        src={orderAcceptedImg}
        alt="Ваш заказ принят"
      />
      <p className={`text text_type_main-default ${styles.order__description}`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-default mt-2 mb-30 ${styles.order__descriptionReady}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderBrief;
