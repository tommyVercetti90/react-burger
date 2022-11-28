import PropTypes from 'prop-types';
import burgerConstructor from './BurgerConstructor.module.css'
import { CurrencyIcon,  ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data.js'

const BurgerConstructor = () => {

    return (
        <div className='pl-4 pr-4 pt-25'>
            <ul className={`${burgerConstructor.list} ${burgerConstructor.menu}`}>
                {data.map((item,index) => 
                    <li className={burgerConstructor.listItem}>
                        <div className={burgerConstructor.listIcon}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            type={index === 0 ? 'top' : index === data.length - 1 ? 'bottom' : undefined}
                            isLocked={true}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}
                            />
                    </li>
                )}
            </ul>
            <div className={`${burgerConstructor.totalBox} mt-10`}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>610</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="medium" htmlType={'button'}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};


BurgerConstructor.propTypes = {
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string
}; 

export default BurgerConstructor;