import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';


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
import { AutorizationPage } from '../../pages/Autorization/Autorization';
import { ForgotPasswordPage } from '../../pages/ForgotPassword/ForgotPassword';
import { IngredientPage } from '../../pages/IngredientPage/IngredientPage';
import { NotFound404 } from '../../pages/NotFoundPage/NotFoundPage';
import { ProfilePage } from '../../pages/Profile/Profile';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { ResetPasswordPage } from '../../pages/ResetPassword/ResetPassword';

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
        <Routes>
          <Route path='/' element={
          <div className={styles.wrapper}>
            <BurgerIngredients/>
            <BurgerConstructor/>
            <Modal>
            {modalType === "ingredient" && <IngredientDetails item={modalContent}/>}
            {modalType === "constructor" && <OrderDetails item={modalContent}/>}
            </Modal>
          </div>
          }/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<AutorizationPage/>}/>
          <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path='/ingredients/:id' element={<IngredientPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/reset-password' element={<ResetPasswordPage/>}/>
          <Route path='/404' element={<NotFound404/>}/>
        </Routes>
      </main>
      </DndProvider>
    );
  }
}

export default App;
