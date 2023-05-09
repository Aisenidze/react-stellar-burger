import styles from './ModalOrder.module.css';
import done from '../../image/done.svg';
import PropTypes from 'prop-types';

const ModalOrder = (props) => {
  const { item } = props;

  return (
    <div className={styles.main}>
      <div className={`${styles.wrapper} pt-30 pb-30`}>
        <p className={`${styles.order} pr-30 pl-30 text text_type_digits-large`}>{item.price}</p>
        <p className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</p>
        <img src={done}></img>
        <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default ModalOrder;

ModalOrder.propTypes = {
  item: PropTypes.number.isRequired,
};
