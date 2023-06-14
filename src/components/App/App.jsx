import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { bunsThunk } from '../../services/AppSlice/AppSlice';
import styles from './App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

function App() {
  const dispatch = useDispatch();
  const {buns, error, isLoading} = useSelector(state => state.buns);
  const { modalType, modalContent } = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(bunsThunk())
  }, [dispatch]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (isLoading) {
    return <div>Загрузка...</div>;
  } else if (!buns?.data) {
    return <div>Загрузка...</div>;
  } else {


    return (
      <DndProvider backend={HTML5Backend}>
        <AppHeader/>
        <main className={styles.main}>
        <div className={styles.template}>
          <div className={styles.wrapper}>
            <BurgerIngredients/>
            <BurgerConstructor/>
            <Modal>
            {modalType === "ingredient" && <IngredientDetails item={modalContent}/>}
            {modalType === "constructor" && <OrderDetails item={modalContent}/>}
            </Modal>
          </div>
        </div>
      </main>
      </DndProvider>
      
    );
  }
}

export default App;
