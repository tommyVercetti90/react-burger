
import app from './App.module.css'
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader></AppHeader>
      <main className={`${app.container} pb-10`}>
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor></BurgerConstructor>
      </main>
    </>
  );
}

export default App;
