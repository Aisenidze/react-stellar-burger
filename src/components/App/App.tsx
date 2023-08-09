import { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { IUseLocation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { checkAuth, getAllIngredients } from '../../services/actions/actions';
import AppHeader from '../AppHeader/AppHeader';
import { Constructor } from '../../pages/Constructor/Constructor';
import './App.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import OrderDetails from '../OrderDetails/OrderDetails';
import OrderBrief from '../OrderBreef/OrderBreef';
import Loading from '../../pages/Loading/Loading';
import { Feed } from '../../pages/Feed/Feed';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Login } from '../../pages/Login/Login';
import { Profile } from '../../pages/Profile/Profile';
import { Register } from '../../pages/Register/Register';
import { Reset } from '../../pages/Reset/Reset';
import { ResetConfirm } from '../../pages/ResetConfirm/RresetConfirm';

const App: FC = () => {
  const location = useLocation<IUseLocation>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((store) => store.user);
  const data = useAppSelector((store) => store.data);
  const burgerConstructor = useAppSelector((store) => store.burgerConstructor);
  const background = location.state?.background;
  
  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  const handleCloseModals = () => {
    history.goBack()
  }
  
  return (
    <div className={`body`} >
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact>
          <Constructor />
        </Route>
        <ProtectedRoute path='/profile/orders/:id' children={<OrderDetails />} />
        <ProtectedRoute path='/profile' children={<Profile />} />
        <Route path='/login' exact>
          {!user.userData.name
            && user.isAuthChecked
            && user.userRequest
              ? <Loading />
              : <Login />}
        </Route>
        <Route path='/register' exact>
          {!user.userData.name
            && user.isAuthChecked
            && user.userRequest
              ? <Loading />
              : <Register />}
        </Route>
        <Route path='/forgot-password' exact>
          {!user.userData.name
            && user.isAuthChecked
            && user.userRequest
              ? <Loading />
              : <Reset />}
        </Route>
        <Route path='/reset-password' exact>
          {(!user.userData.name
            && user.isAuthChecked
            && user.userRequest)
              ? <Loading />
              : user.resetRequestConfirmed
                ? <ResetConfirm />
                : <Redirect to={{ pathname: '/forgot-password' }} />}
        </Route>
        <Route path='/ingredients/:id' >
          {data.ingredients?.length && <IngredientDetails />}
        </Route>
        <Route path='/feed/:id' >
          <OrderDetails />
        </Route>
        <Route path='/feed' >
          <Feed />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {background && (
        <>
          <Route path='/ingredients/:id' >
            <Modal onClose={handleCloseModals} >
              {data.ingredients?.length && <IngredientDetails />}
            </Modal>
          </Route >
          <Route path='/feed/:id' >
            <Modal onClose={handleCloseModals} >
              <OrderDetails />
            </Modal>
          </Route >
          <ProtectedRoute path='/order'>
            {burgerConstructor.orderNumber &&  (
              <Modal onClose={handleCloseModals} >
                <OrderBrief />
              </Modal>)
            }
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id'>
            <Modal onClose={handleCloseModals} >
              <OrderDetails />
            </Modal>
          </ProtectedRoute>
        </>)
      }
    </div >
  );
}

export default App;
