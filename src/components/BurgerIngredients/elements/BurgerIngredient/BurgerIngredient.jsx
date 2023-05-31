import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalDetails from "../../../ModalDetails/ModalDetails";
import Modal from "../../../Modal/Modal";
import styles from './BurgerIngredient.module.css';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";


const BurgerIngredient = (props) =>  {
    const {ingredient} = props;
    const [open, setShow] = useState(false);
    const { initialIngredient, applyIngredients } = useSelector((state) => state.cons);
    const countDraggedIngredients = useMemo(() => {
        if (ingredient?.type === 'bun') {
            if (ingredient?._id === initialIngredient?._id) return 2
            return 0
        }
        if (!!(applyIngredients?.length)) return applyIngredients.filter((element) => element?._id === ingredient._id).length
        return 0
    }, [ingredient,initialIngredient,applyIngredients])

    const [{isDragStart}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragStart: monitor.isDragging()
        })
    });
    return (
    <div ref={dragRef}>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`} onClick={() => setShow((p) => !p)}>
            <div className={styles.counter}>
                <Counter count={countDraggedIngredients} size='small'/>
            </div>
            <div className={`${styles.content} ml-4 mb-10 mr-6`}>
                <img className={`${styles.illustration} pl-4 pr-4 pb-1`} src={ingredient.image} alt="" />
                <div className={styles.price_content}>
                    <p className={`text text_type_digits-default pr-2`}>{ingredient.price}</p>
                    <CurrencyIcon className={`${styles.icon}`}/>
                </div>
                <p className={`pt-1`}>{ingredient.name}</p>
            </div>
        </div>
        <Modal open={open} closeModal={() => setShow(false)} marker='modal_1'>
            <ModalDetails item={ingredient} />
        </Modal>    
    </div>
    )
}
export default BurgerIngredient;

BurgerIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
}