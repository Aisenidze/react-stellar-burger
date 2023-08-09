import { useEffect, FC } from "react";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { onLogout } from "../../services/actions/actions";
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from "../../services/reducers/dataReducer";
import { BASE_WSS } from "../../utils/utils";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from "../../services/types";
import { IUseLocation } from "../../types";
import styles from "./Profile.module.css";
import Loading from "../Loading/Loading";
import { ProfileData } from "../../components/ProfileData/ProfileData";
import { OrdersFeed } from "../../components/OrdersFeed/OrdersFeed";

export const Profile: FC = () => {
  const logoutRequest = useAppSelector((store) => store.user.logoutRequest);
  const orders = useAppSelector((store) => store.data?.orders);
  const dispatch = useAppDispatch();
  const { url } = useRouteMatch();
  const location = useLocation<IUseLocation>();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch(setWebsocketConnection(`${BASE_WSS}/orders?token=${accessToken}`));
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, [url, dispatch, accessToken]);

  const onLogoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(onLogout());
  };

  if (logoutRequest) {
    return <Loading />;
  }

  return (
    <div className={`${styles.profile}`}>
      <nav className={`mt-30 ${styles.menu}`}>
        <NavLink
          to={`${url}`}
          exact
          className={`text text_type_main-medium ${styles.link}`}
          activeClassName={styles.link_active}
        >
          Профиль
        </NavLink>
        <NavLink
          to={`${url}/orders`}
          className={`text text_type_main-medium ${styles.link}`}
          activeClassName={styles.link_active}
        >
          История заказов
        </NavLink>
        <button
          type="button"
          className={`text text_type_main-medium text_color_inactive from global ${styles.button}`}
          onClick={onLogoutHandler}
        >
          Выход
        </button>

        {location.pathname === `${url}` && (
          <p
            className={`mt-20 text text_color_inactive text_type_main-default ${styles.text}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}

        {location.pathname.startsWith(`${url}/orders`) && (
          <p
            className={`mt-20 text text_color_inactive text_type_main-default ${styles.text}`}
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        )}
      </nav>
      <article className={`mt-10 ${styles.content}`}>
        <Route path={`${url}`} exact>
          <ProfileData />
        </Route>
        <Route path={`${url}/orders`} exact>
          {!orders ? (
            <Loading />
          ) : orders && orders.orders.length === 0 ? (
            <>
              <p
                className={`mt-20 text text_color_inactive text_type_main-large ${styles.textNoOrders}`}
              >
                Нет заказов
              </p>
              <Link
                to={`/`}
                className={`mt-10 text text_type_main-medium ${styles.createOrder}`}
              >
                Создать первый заказ
              </Link>
            </>
          ) : (
            <OrdersFeed />
          )}
        </Route>
      </article>
    </div>
  );
};
