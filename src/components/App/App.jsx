import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { bunsThunk } from '../../services/AppSlice/AppSlice';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();
  const {buns, error, isLoading} = useSelector(state => state.buns);

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
        <main className='main'>
        <div className='template'>
          <div className='wrapper'>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </div>
        </div>
      </main>
      </DndProvider>
      
    );
  }
}

export default App;
