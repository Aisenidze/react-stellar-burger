import { FC, useMemo } from 'react';
import { useAppSelector } from '../../services/types';
import styles from './OrdersSummary.module.css';

export const OrdersSummary: FC = () => {
    const orders = useAppSelector(store => store.data?.orders)
    const totalOrders = orders?.total;
    const totalOrdersToday = orders?.totalToday

    const readyOrders = useMemo(() => {
        return orders?.orders?.filter(order => order.status === 'done').map(order => order.number)
    }, [orders?.orders]);

    const notReadyOrders = useMemo(() => {
        return orders?.orders?.filter(order => order.status !== 'done').map(order => order.number)
    }, [orders?.orders]);

    return (
        <div className={` ${styles.ordersSummaryContainer}`}>
            <article className={`mb-15 ${styles.ordersBoard}`}>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> Готовы:</p>
                    <ul className={` ${styles.boardList}`}>
                        {readyOrders?.map((order, index) => (
                            index < 20 &&
                                <li key={order} className={`text text_type_digits-default text_color_success ${styles.boardItem}`}>{order}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> В работе:</p>
                    <ul className={` ${styles.boardList}`}>
                        {
                            notReadyOrders?.map((order, index) => (
                                index < 20 &&
                                    <li key={order} className={`text text_type_digits-default ${styles.boardItem}`}>{order}</li>
                            ))
                        }
                    </ul>
                </div>
                </article>
            <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{totalOrders}</p>
            <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{totalOrdersToday}</p>
        </div>
    )
}
