import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true)
        setItems(result.data)
      }, 
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  },[])
console.log(items);
  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className='main'>
        <AppHeader/>
        <div className='template'>
          <div className='wrapper'>
            <BurgerIngredients items={items}/>
            <BurgerConstructor items={items}/>
          </div>
        </div>
        {/* <button onClick={() => setOpen(true)}>Открыть/Закрыть</button> */}
      </div>
    );
  }
}
export default App;