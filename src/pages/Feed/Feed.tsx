import { useEffect, FC } from "react";
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from "../../services/reducers/dataReducer";
import { BASE_WSS } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/types";
import { IUseLocation } from "../../types";
import { OrdersFeed } from "../../components/OrdersFeed/OrdersFeed";
import { OrdersSummary } from "../../components/OrdersSummary/OrdersSummary";
import Loading from "../Loading/Loading";
import styles from "./Feed.module.css";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.data?.orders);
  const location = useLocation<IUseLocation>();

  useEffect(() => {
    dispatch(setWebsocketConnection(`${BASE_WSS}/orders/all`));
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, [location.pathname, dispatch]);

  return (
    <section className={`${styles.feed}`}>
      <h3 className={`mt-10 mb-5 text text_type_main-large ${styles.title}`}>
        Лента заказов
      </h3>
      <div className={` ${styles.feedContainer}`}>
        {!orders ? (
          <Loading />
        ) : (
          <>
            <div className={`${styles.ordersFeed}`}>
              <OrdersFeed />
            </div>
            <div className={`${styles.ordersSummary}`}>
              <OrdersSummary />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
