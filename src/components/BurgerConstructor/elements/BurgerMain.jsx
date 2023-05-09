import { CurrencyIcon, LockIcon, DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import ModalDetails from "../../ModalDetails/ModalDetails";
import PropTypes from "prop-types";

const BurgerMain = (props) => {
  const { ingredients, indexof, ingredientlength } = props;
  const [open, setShow] = useState(false);

  return (
    <div>
      <div onClick={() => setShow((p) => !p)}>
        <ConstructorElement
          type= {indexof === 0 ? 'top' :  (indexof === ingredientlength - 1 ? 'bottom' : '') }
          isLocked={indexof === 0 ? true :  (indexof === ingredientlength - 1 ? true : false) }
          text={ingredients.name}
          price={ingredients.price}
          thumbnail={ingredients.image}
        />
      </div>
      <Modal open={open} closeModal={() => setShow(false)} marker='modal_1'>
        <ModalDetails item={ingredients} />
      </Modal>
    </div>
  )
}

export default BurgerMain;

BurgerMain.propTypes = {
  ingredients: PropTypes.array.isRequired,
  indexof: PropTypes.array.isRequired,
  ingredientlength: PropTypes.array.isRequired,
}
