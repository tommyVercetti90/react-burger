
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import app from './app.module.css'
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route/protected-route';
import Profile from '../../pages/profile/profile';
import { getUserInfo } from '../../services/actions/user'
import { resetCurrentIngredient } from '../../services/actions/current-ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFoundPage from '../../pages/not-found-404/not-found-404';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch ();

  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();

  const ingredientModalClose = () => {
    dispatch(resetCurrentIngredient())
    history.goBack();
  }

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <>
      <div className={app.appWrapper}>
            <AppHeader/>
            <main className={`${app.container} pb-10`}>
              <Switch>
                <Route path="/" exact={true}>
                  <MainPage />
                </Route>
                <Route path='/orders' exact={true}>
                  <p>Здесь будет история заказов</p>
                </Route>
                <Route path='/login' exact={true}>
                  <Login />
                </Route>
                <Route path='/register' exact={true}>
                  <Register />
                </Route>
                <Route path='/forgot-password' exact={true}>
                  <ForgotPassword />
                </Route>
                <Route path='/reset-password' exact={true}>
                  <ResetPassword />
                </Route>
                <ProtectedRoute path='/profile/'>
                  <Profile />
                </ProtectedRoute>
                { background && <Route path='/ingredients/:id'>
                <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
                  <IngredientDetails/>
                </Modal>
                </Route>}
                { location && <Route path='/ingredients/:id'>
                  <IngredientDetails/>
                </Route>}
                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </main>
      </div>
    </>
  );
}

export default App;
