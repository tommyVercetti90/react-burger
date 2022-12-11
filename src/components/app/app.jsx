
import app from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ConstructorContext } from '../../services/constructor-context';
import {useState, useEffect} from 'react'
import {BASE_URL} from '../../constants/constants'
import {request} from '../../utils/check-response'


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const _API_INGREDIENTS = BASE_URL+'ingredients'

  useEffect(() => {
    request(_API_INGREDIENTS)
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
        <ConstructorContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </main>
    </div>
  );
}

export default App;
