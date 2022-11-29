import appHeader from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
        <header className={`${appHeader.header} pt-4 pb-4`}>
            <nav className={appHeader.container}>
                <a href='#a' className={appHeader.link}>
                    <BurgerIcon type='secondary' />
                    <span className='text text_type_main-default text_color_inactive ml-2'>Конструктор</span>
                </a>
                <a href='#a' className={`${appHeader.link} mr-25 ml-2`}>
                    <ListIcon type="secondary" />
                    <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
                </a>
                <Logo />
                <a href='#a' className={`${appHeader.link} ${appHeader.login}`}>
                    <ProfileIcon type="secondary" />
                    <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
                </a>
            </nav>
        </header>
    );
};

export default AppHeader;