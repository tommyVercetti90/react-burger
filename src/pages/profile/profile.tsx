import { useLocation, NavLink, useHistory, BrowserRouter as Router, Switch } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { useDispatch, useSelector } from "../../hooks/hooks";
import profileStyle from './profile.module.css'
import ProfileForm from './profile-form'
import OrdersList from '../../components/orders-list/orders-list';
import { ProtectedRoute } from "../../components/protected-route/protected-route";
import Modal from '../../components/modal/modal';
import { resetCurrentIngredient } from '../../services/actions/current-ingredient';
import { OrderInfo } from '../../components/order-info/order-info';
const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const location = useLocation<{background: Location}>();
    const background = location.state?.background;

    const ingredientModalClose = () => {
        dispatch(resetCurrentIngredient())
        history.goBack();
      }
    return (
        <Router>
            <div className={`${profileStyle.wrapper} mt-30`}>
                <div className={`${profileStyle.links} mr-15`}>
                    <NavLink 
                        exact={true} 
                        className={profileStyle.link} 
                        to={{ pathname: '/profile' }} 
                        activeClassName={profileStyle.activeLink}>
                            Профиль
                    </NavLink>
                    <NavLink 
                        exact={true} 
                        className={profileStyle.link} 
                        to={{ pathname: '/profile/orders' }} 
                        activeClassName={profileStyle.activeLink}>
                            История заказов
                    </NavLink>
                    <NavLink 
                        exact={true} 
                        className={profileStyle.link} 
                        to={{ pathname: '/login' }}  
                        onClick={() => dispatch(logout(history))} 
                        activeClassName={profileStyle.activeLink}>
                            Выход
                    </NavLink>

                    <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете<br />изменить свои персональные данные</p>
                </div>
                <Switch>
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfileForm />
                    </ProtectedRoute>    
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <div className={profileStyle.orders_history} >
                            <OrdersList isShow={false}/>
                        </div>
                    </ProtectedRoute>    
                </Switch>
                { background && (
                    <ProtectedRoute path='/profile/orders/:id' exact={true}>
                        <Modal onClose={ingredientModalClose}> 
                            <OrderInfo/>
                        </Modal>
                    </ProtectedRoute>
                )}  
            </div>
        </Router>
    );
};
export default Profile;