import appHeader from './app-header.module.css'
import { useSelector } from '../../hooks/hooks'; 
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useRouteMatch } from 'react-router-dom';

const AppHeader = () => {

    const activeConstructor = !!useRouteMatch({path: '/', exact: true})
    const activeOrders = !!useRouteMatch({path: '/orders'})
    const activeProfile = !!useRouteMatch({path: '/profile'})
    const { user } = useSelector(store => store.userReducer);
    
    return (
        <header className={`${appHeader.header} pt-4 pb-4`}>
            <nav className={appHeader.container}>
                <NavLink to='/' className={appHeader.link} activeClassName={appHeader.linkActive} exact>
                    <BurgerIcon type={activeConstructor ? 'primary':'secondary'} />
                    <span className='text text_type_main-default text_color_inactive ml-2'>Конструктор</span>
                </NavLink>
                <NavLink to='/feed' className={`${appHeader.link} mr-25 ml-2`} activeClassName={appHeader.linkActive}>
                    <ListIcon type={activeOrders ? 'primary':'secondary'} />
                    <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
                </NavLink>
                <NavLink to='/'>
                    <Logo />
                </NavLink>
                <NavLink to='/profile' className={`${appHeader.link} ${appHeader.login}`} activeClassName={appHeader.linkActive}>
                    <ProfileIcon type={activeProfile ? 'primary':'secondary'} />
                    <span className='text text_type_main-default text_color_inactive ml-2'>{user ? user.name : 'Личный кабинет'}</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default AppHeader;