import { useMemo, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../services/types';
import { onPlaceOrder } from '../../services/actions/actions';
import { Ingredient } from './elements/Ingredient';
import Loading from '../../pages/Loading/Loading';
import { TIngredient } from '../../services/types';
import { IUseLocation } from '../../types';
import styles from './BurgerConstructor.module.css';

interface IBurgerConstructorProps {
    onDropHandler: (mutatedIngredient: TIngredient & { index: string }) => void
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {
    const dispatch = useAppDispatch();
    const store = useAppSelector(store => store);
    const user = useAppSelector(store => store.user.userData.name);
    const orderRequest = useAppSelector(store => store.burgerConstructor.orderRequest)
    const location = useLocation<IUseLocation>();
    const history = useHistory();
    const { burgerConstructor } = store || {} || undefined;

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (ingredient: TIngredient) => {
            let index = uuidv4()
            let mutatedIngredient = { index, ...ingredient }
            onDropHandler(mutatedIngredient);
            return { mutatedIngredient }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    })

    const isActive = (burgerConstructor.bun && user.length ? true : false)

    const cart = useMemo(() => {
        if (burgerConstructor.bun && burgerConstructor.ingredients)
            return [burgerConstructor?.bun?._id, ...burgerConstructor.ingredients?.map((item) => item?._id), burgerConstructor?.bun._id]
    }, [burgerConstructor.bun, burgerConstructor.ingredients])

    const total = useMemo(() => {
        if (burgerConstructor.bun && burgerConstructor.ingredients) {
            return burgerConstructor?.bun.price * 2 + Array.from(burgerConstructor?.ingredients).reduce((accum: number, item: TIngredient) => {
                if (item) {
                    accum += item.price;
                }
                return accum;
            }, 0)
        }

    }, [burgerConstructor])

    const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
        if (!user) {
            history.push('/login')
        } else if (cart) {
            event.preventDefault();
            dispatch(onPlaceOrder(cart))
            history.push({
                pathname: '/order',
                state: {
                    background: location
                }
            })
        }
    }

    if (orderRequest) {
        return (
            <Loading />
        );
    }

    return (
        <form ref={dropTarget} name='order' action='#' onSubmit={handlePlaceOrder} className={classNames(`mt-25 ml-4`, {
            [styles['burger-constructor']]: !isHover,
            [styles['burger-constructor__hover']]: isHover,
        })}>
            {
                burgerConstructor?.bun &&
                <div className={classNames(styles.burgerConstructor__item, 'mb-4 pr-2')}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (верх)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }
            <ul className={styles.burgerConstructor__listitem}>
                {burgerConstructor.ingredients.map((position, index) => <Ingredient key={position.index} id={position.index} position={position} index={index} />)}
            </ul>
            {
                burgerConstructor?.bun &&
                <div className={classNames(styles.burgerConstructor__item, 'mt-4 pr-2')}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (низ)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }
            <div className={classNames(styles.burgerConstructor__checkout, `mt-10 pb-10`)}>
                {burgerConstructor?.bun && burgerConstructor?.ingredients &&
                    <div className={styles.burgerConstructor__total}>
                        <p className={classNames(styles.burgerConstructor__ordersum, `mr-2 text text_type_main - large`)}>{total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                }
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    disabled={!isActive}
                >
                    Оформить заказ
                </Button>
            </div>
            {!user &&
                <p className={classNames(styles.burgerConstructor__text, `text text_type_main-default text_color_inactive`)}>Для того чтобы оформить заказ нужно&nbsp;
                    <Link
                        className={classNames(styles.burgerConstructor__link , `text text_type_main-default`)}
                        to={{
                            pathname: `/login`,
                        }}>
                        войти
                    </Link>
                </p>
            }

            {!burgerConstructor.bun &&
                <p className={classNames(styles.burgerConstructor__text, `mt-5 text text_type_main-default text_color_inactive`)}>Для оформления заказа необходимо добавить булочку
                </p>
            }

        </form >
    )
}

export default BurgerConstructor;