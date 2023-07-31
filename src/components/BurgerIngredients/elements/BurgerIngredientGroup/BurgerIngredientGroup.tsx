import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { IUseLocation } from '../../../../types';
import { TIngredient } from '../../../../services/types';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredientGroup.module.css';

type TBurgerIngredientGroupProps = {
    titleId: string
    title: string
    data: Array<TIngredient> | undefined
}

const BurgerIngredientGroup = React.forwardRef<HTMLHeadingElement, TBurgerIngredientGroupProps>((props, ref) => {
    const location = useLocation<IUseLocation>()

    return (
        <div className={styles.cards}>
            <h3 className={classNames(styles.card__title, `text text_type_main-medium`)} id={props.titleId} ref={ref}>{props.title}</h3>
            <ul className={classNames(styles.cards__list, `ml-4 mt-6 mb-10 cards__list`)}>
                {props.data?.map((card: TIngredient) => {
                    return (
                        <Link className={classNames(styles.card__link, `text text_type_main-small`)} key={card._id} to={{
                            pathname: `/ingredients/${card._id}`,
                            state: { background: location }
                        }}>
                            <BurgerIngredient key={card._id} cardData={card} />
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}
)

export default BurgerIngredientGroup;
