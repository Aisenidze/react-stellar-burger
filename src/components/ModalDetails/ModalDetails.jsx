import styles from './ModalDetails.module.css';
import PropTypes from 'prop-types';

const ModalDetails = (props) => {
  const { item } = props;

  return (
    <>
      <div className={styles.main}>
        <div className={`${styles.wrapper} pl-10 pr-10 pt-10 pb-15`}>
          <div className={`${styles.heading} `}>
          <p className="text text_type_main-large">Детали ингредиента</p>
          </div>
          <img src={item.image_large} alt={item.name} />
          <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`}>{item.name}</p>
          <ul className={styles.info}>
            <li className={`${styles.items} text text_type_main-default text_color_inactive pr-5`}>
              <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
              {item.calories}
            </li>
            <li className={`${styles.items} text text_type_main-default text_color_inactive pr-5`}>
              <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
              {item.proteins}
            </li>
            <li className={`${styles.items} text text_type_main-default text_color_inactive pr-5`}>
              <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
              {item.fat}
            </li>
            <li className={`${styles.items} text text_type_main-default text_color_inactive`}>
              <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
              {item.carbohydrates}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ModalDetails;

ModalDetails.propTypes = {
  item: PropTypes.object.isRequired,
}