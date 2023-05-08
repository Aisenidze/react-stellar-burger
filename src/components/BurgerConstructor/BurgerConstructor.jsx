import { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../Modal/Modal";
import BurgerMain from "./elements/BurgerMain";
import ModalOrder from "../ModalOrder/ModalOrder";

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = (props) => {
    const {items} = props;

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`${styles.constructor_main} pl-10 pt-25`}>
                <div className={`${styles.constructor_wrapper}`}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {items.map((main, index) => (
                            <BurgerMain ingredients={main} key={main._id} indexof={index} ingredientlength={items.length}/>
                        ))}
                </div>
                </div>
                <div className={`${styles.constructor_info} pt-10 pr-4`}>
                    <div className={`${styles.summary} pr-10`}>
                    <p>2000!</p>
                    <CurrencyIcon/>
                    </div>
                    <button
                        className={`${styles.constructor_btn}`}
                        onClick={() => setOpen((prev) => !prev)}
                    >Оформить заказ</button>
                </div>
            </div>
            <Modal open={open} closeModal={() => setOpen(false)}>
                <ModalOrder item={{ price: 102020202 }} />
            </Modal>
        </>
    )
}
export default BurgerConstructor;