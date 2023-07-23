import { FC, useCallback, useMemo } from "react";
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { useDrag } from "react-dnd";
import { openModal } from "../../../../services/ModalSlice/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/typeHook";
import { BunsData } from "../../../../services/AppSlice/AppSlice";

interface BurgerIngredientProps {
    ingredient: BunsData;
}

const BurgerIngredient: FC<BurgerIngredientProps> = (props) =>  {
    const { ingredient } = props;
    const dispatch = useAppDispatch();
    const { initialIngredient, applyIngredients } = useAppSelector((state) => state.cons);

    const countDraggedIngredients = useMemo(() => {
        if (ingredient?.type === 'bun') {
            if (ingredient?._id === initialIngredient?._id) return 2
            return 0
        }
        if (!!(applyIngredients?.length)) return applyIngredients.filter((element: BunsData) => element?._id === ingredient._id).length
        return 0
    }, [ingredient,initialIngredient,applyIngredients])

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragStart: monitor.isDragging()
        })
    });
    const handleOpen = useCallback(() => {
        dispatch(openModal({ isOpen: true, modalType: "ingredient", modalContent: ingredient }))
        window.history.pushState({ modal: ingredient._id },'check',`/ingredient/${ingredient._id}`);
    }, [dispatch, ingredient])

    return (
    <div ref={dragRef}>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`} onClick={() => handleOpen()}>
            <div className={styles.counter}>
                <Counter count={countDraggedIngredients} size='small'/>
            </div>
            <div className={`${styles.content} ml-4 mb-10 mr-6`}>
                <img className={`${styles.illustration} pl-4 pr-4 pb-1`} src={ingredient.image} alt="картинка-ингредиента" />
                <div className={styles.price_content}>
                    <p className={`text text_type_digits-default pr-2`}>{ingredient.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`pt-1`}>{ingredient.name}</p> 
            </div>
        </div>
    </div>
    )
}
export default BurgerIngredient;
