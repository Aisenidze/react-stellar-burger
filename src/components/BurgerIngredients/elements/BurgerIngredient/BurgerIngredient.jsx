import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import PropTypes from "prop-types";

const BurgerIngredient = (props) =>  {
    const {ingredient} = props;

    return (
    <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
        <div className={styles.counter}>
            <Counter size='small'/>
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
    )
}
export default BurgerIngredient;

BurgerIngredient.propTypes = {
    ingredient: PropTypes.array.isRequired,
}
