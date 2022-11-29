
import app from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <>
      <AppHeader/>
      <main className={`${app.container} pb-10`}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </>
  );
}

export default App;
