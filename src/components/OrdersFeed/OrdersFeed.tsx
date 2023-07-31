import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import { useAppSelector } from '../../services/types';
import { Order } from '../Order/Order';
import classNames from 'classnames';
import styles from './OrdersFeed.module.css';

export const OrdersFeed: FC = () => {
    const location = useLocation();
    const ingredients = useAppSelector(store => store.data?.ingredients);
    const orders = useAppSelector(store => store.data?.orders);

    if (orders && ingredients) {
        return (
            <ul className={classNames(styles.list, `mt-10`)}>
                {
                    orders?.orders?.map(order => (
                        <Link className={classNames(styles.order__link, `text text_type_main-small`)} key={order.number} to={{
                            pathname: location.pathname.startsWith('/profile') ? `/profile/orders/${order.number}` : `/feed/${order.number}`,
                            state: { background: location }
                        }}>
                            <Order orderInfo={order} />
                        </Link>
                    ))
                }
            </ul>
        )
    } else {
        return (
            <Loading />
        );
    }
}