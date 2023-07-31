import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, FC, useMemo } from 'react';
import { onFetchOrder } from '../../services/actions/actions';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { IUseLocation } from '../../types';
import { IUseParams } from '../../types';
import { TOrder } from '../../services/types';
import Loading from '../../pages/Loading/Loading';
import styles from './OrderDetails.module.css';

const OrderDetails: FC = () => {
    const { id } = useParams<IUseParams>();
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(store => store.data.ingredients);
    const orders = useAppSelector(store => store.data.orders?.orders);
    const location = useLocation<IUseLocation>();
    const background = location.state?.background;

    let orderMatch: undefined | TOrder | null = null;

    useEffect(() => {
        if (location.pathname.startsWith('/profile') && !background) {
            dispatch(onFetchOrder(id))
        } else if ((location.pathname.startsWith('/feed')) && !background) {
            dispatch(onFetchOrder(id))
        }
    }, [location.pathname, dispatch, background, id]);

    orderMatch = orders?.find(order => order.number.toString() === id)

    const returnIngredientsPrice = useCallback(() => {
        const arrOfIngredientsPrice = orderMatch?.ingredients?.map(ingredient => ingredients?.find(item => item._id === ingredient)?.price);

        return arrOfIngredientsPrice?.reduce((acc: number, item: number | undefined) => {
            if (item) {
                acc += item
            }
            return acc
        }, 0)
    }, [orderMatch?.ingredients, ingredients])

    const returnIngredientsQuantity = useCallback((id: string | undefined) => {
        let ingredientsQuantity = 0
        orderMatch?.ingredients.map(ingredientId => {
            if (ingredientId === id) ingredientsQuantity++
        })
        return ingredientsQuantity
    }, [orderMatch?.ingredients])

    const returnIngredients = useMemo(() => {
        const mutatedIngredients = Array.from(new Set(orderMatch?.ingredients))
        return mutatedIngredients.map((ingredient, index) => {
            return ingredients?.find(item => item._id === ingredient)
        })
    }, [orderMatch?.ingredients, ingredients])
    
    if (orderMatch) {
      return (
        <div className={`pl-10 pr-10 pb-10 ${styles.order}`}>
            <p className={`mt-15 mb-10 text text_type_digits-default ${styles.orderNumber}`}>
                {`#${orderMatch.number}`}
            </p>
            <p className={`text text_type_main-medium ${styles.orderName}`}>{`${orderMatch.name}`}</p>
            <p className={`mt-2 mb-15 text text_type_main-small ${styles.orderStatus} ${orderMatch.status === 'done' ? 'text_color_success' : null}`}>
                {`${orderMatch.status === 'done' ? 'Выполнен' : 'Готовится'}`}
            </p>
            <p className={`mb-6 text text_type_main-medium ${styles.orderName}`}>Состав:</p>
            <ul className={styles.orderIngredients}>
                {
                  returnIngredients.map((ingredient, index) => (
                    <li key={ingredient?._id || index} className={`${styles.ingredientElement}`} >
                      <div className={`${styles.ingredientImageBlock}`}>
                        <img src={ingredient?.image} alt={ingredient?.name} className={`${styles.ingredientImage}`} />
                        <p className={`text_type_main-small ${styles.ingredientName}`}>{ingredient?.name}</p>
                      </div>
                      <div className={`${styles.ingredientTotal}`}>
                        <p className={`mr-2 text text_type_digits-default`}>{`${returnIngredientsQuantity(ingredient?._id)} x ${ingredient?.price}`}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </li>
                  ))
                  }
            </ul>

            <div className={`mt-10 ${styles.orderHeader}`}>
                <p className={`text text_color_inactive text_type_main-default ${styles.orderNumber}`}>
                    <FormattedDate date={new Date(orderMatch.createdAt)} /> i-GMT+3
                </p>
                <div className={`${styles.orderTotal}`}>
                    <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
      );
    } else {
        return (<Loading />)
    }
}

export default OrderDetails;