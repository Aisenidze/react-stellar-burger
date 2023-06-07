import done from '../../image/done.svg';
import styles from './OrderDetails.module.css';

const ModalOrder = (props) => {
  const { item } = props;

  return (
    <div className={styles.main}>
      <div className={`${styles.wrapper} pt-30 pb-30`}>
        <p className={`${styles.order} pr-30 pl-30 text text_type_digits-large`}>{item.order.number}</p>
        <p className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</p>
        <img src={done} alt='gif-заказа'></img>
        <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default ModalOrder;
