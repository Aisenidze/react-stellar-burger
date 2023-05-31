import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { bunsThunk } from '../../AppSlice/AppSlice';
import './App.css';
import { constructorThunk } from '../BurgerConstructor/ConstructorSlice';
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
    dispatch(constructorThunk(buns));

    return (
      <DndProvider backend={HTML5Backend}>
      <div className='main'>
        <AppHeader/>
        <div className='template'>
          <div className='wrapper'>
            <BurgerIngredients items={buns.data}/>
            <BurgerConstructor items={buns.data}/>
          </div>
        </div>
      </div>
      </DndProvider>
      
    );
  }
}

export default App;
