import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { nanoid } from 'nanoid';

import Modal from "../Modal/Modal";
import BurgerMain from "./elements/BurgerMain";
import OrderDetail from "../OrderDetails/OrderDetails";
import { applyIngredientsThunk, applyOrderThunk, constructorThunk } from "../../services/ConstructorSlice/ConstructorSlice";

import styles from './BurgerConstructor.module.css';
import { bunsThunk } from "../../AppSlice/AppSlice";

const BurgerConstructor = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { initialIngredient, applyIngredients, applyOrder } = useSelector((state) => state.cons)

  const countIngredients = useMemo(() => {
    if (!initialIngredient) return 0
    return [...applyIngredients, initialIngredient, initialIngredient].reduce((acc, el) => acc + el.price, 0)
  }, [applyIngredients, initialIngredient]);

  const [, dropIngredient] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item => addElement(item))
  }));
  const addElement = useCallback((element) => {
    const data = { ...element, id: nanoid() }

    if (data.type === 'bun') {
      return dispatch(constructorThunk({ data, edit: 'initialIngredient'}))
    }

    dispatch(applyIngredientsThunk({ data }));

    dispatch(bunsThunk([...applyIngredients, data]))
  }, [applyIngredients, initialIngredient, dispatch])
    return (
    <div ref={dropIngredient}>
          <div className={styles.constructor_main}>
              
                 {initialIngredient ? (<div className={styles.top}><BurgerMain ingredients={initialIngredient} indexof={'top'}/></div>) : (<p className="text text_type_main-large pt-3">Выберите булку</p>)}
              
            {initialIngredient ? (<div className={styles.scrollbar}>
                {!!applyIngredients.length && applyIngredients.map((main, index) => (
                  <BurgerMain ingredients={main} key={main.id} indexof={''} index={index} />
                  ))}
            </div>) : (null)}
                {initialIngredient ? (<div className={styles.bottom}><BurgerMain ingredients={initialIngredient} indexof={'bottom'}/></div>) : (null)}
        <div className={`${styles.constructor_info} pt-10 pr-4`}>
          <div className={`${styles.summary} pr-10`}>
          <p className="text text_type_digits-medium">{countIngredients}</p>
          <CurrencyIcon/>
          </div>
          <button
            className={`${styles.constructor_btn} text text_type_main-small`}
            onClick={() => {
              setOpen((prev) => !prev)
              dispatch(applyOrderThunk({ items: [...applyIngredients, initialIngredient, initialIngredient]}))
            }}
          >Оформить заказ</button>
        </div>
      </div>
        <Modal open={open} closeModal={() => {
          setOpen(false)
          dispatch(applyOrderThunk({ items: null }))
        }}>
          {applyOrder && <OrderDetail item={applyOrder} />}
        </Modal>
    </div>
  )
}
export default BurgerConstructor;
