import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { useDispatch } from "../../hooks/hooks";
import profileStyle from './profile.module.css'
import ProfileForm from './profile-form'
import { ProtectedRoute } from "../../components/protected-route/protected-route";
import ProfileOrders from './profile-orders';

const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    return (
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
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfileForm />
                    </ProtectedRoute>    
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <ProfileOrders />
                    </ProtectedRoute>
            </div>
    );
};
export default Profile;