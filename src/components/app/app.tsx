
import { useDispatch } from '../../hooks/hooks'; 
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
import { fetchIngredients } from '../../services/actions/ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFoundPage from '../../pages/not-found-404/not-found-404';
import { OrderInfo } from '../order-info/order-info';
import { Feed } from '../../pages/feed/feed';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import { Location } from 'history'; 

function App() {
  const dispatch = useDispatch ();

  const location = useLocation<{background: Location}>();
  const background = location.state?.background;
  const history = useHistory();

  const ingredientModalClose = () => {
    dispatch(resetCurrentIngredient())
    history.goBack();
  }

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <>
      <div className={app.appWrapper}>
            <AppHeader/>
            <main className={`${app.container} pb-10`}>
              <Switch location={ background || location }>
                <Route path='/orderinfo' exact={true}>
                  <OrderInfo/>
                </Route>
                <Route path="/" exact={true}>
                  <MainPage />
                </Route>
                <Route path='/feed' exact={true}>
                  <Feed />
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
                <ProtectedRoute path='/profile/' exact={true}>
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact={true}>
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders/:id' exact={true}>
                  <OrderInfo/>
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                  <IngredientDetails/>
                </Route>
                <Route path='/feed/:id' exact={true}>
                  <OrderInfo/>
                </Route>                
                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
              { background && (
                <>
                  <Route path='/ingredients/:id' exact={true}>
                    <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
                      <IngredientDetails/>
                    </Modal>
                  </Route>
                  
                  <Route path='/feed/:id'>
                    <Modal onClose={ingredientModalClose}> 
                        <OrderInfo/>
                    </Modal>
                  </Route>

                  <ProtectedRoute path='/profile/orders/:id' exact={true}>
                    <Modal onClose={ingredientModalClose}> 
                        <OrderInfo/>
                    </Modal>
                  </ProtectedRoute>
                </>)}
            </main>
      </div>
    </>
  );
}

export default App;
