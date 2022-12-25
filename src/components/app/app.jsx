
import app from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {useState, useEffect} from 'react'



function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const _API = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    fetch(_API)
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoaded(true))
  }, [])

  return (
    <div className={app.appWrapper}>
      <AppHeader/>
      <main className={`${app.container} pb-10`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
