import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalDetails from "../../../ModalDetails/ModalDetails";
import Modal from "../../../Modal/Modal";
import styles from './BurgerIngredient.module.css';
import { useDrag } from "react-dnd";


const BurgerIngredient = (props) =>  {
    const {ingredient} = props;
    const [open, setShow] = useState(false);

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
                <Counter count={ingredient.__v} size='small'/>
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


// import { useDrag } from "react-dnd";

// const Smile = ({ data }) => {
//   const [{ isDragStart }, dragRef] = useDrag({
//     type: "ball",
//     item: data,
//     collect: (monitor) => ({
//       isDragStart: monitor.isDragging()
//     })
//   });

//   return (
//     <div className={isDragStart ? "smile dragged" : "smile"} ref={dragRef}>
//       {data.content}
//     </div>
//   );
// };

// export default Smile;

