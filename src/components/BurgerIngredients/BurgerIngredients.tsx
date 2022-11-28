import React from 'react'
import PropTypes from 'prop-types'
import burgerIngredients from './burgerIngredients.module.css'
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data.js'


const BurgerIngredients = () => {
    console.log(data)
    const [current, setCurrent] = React.useState('one')
    return (
        <div>
            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
            <div className={`${burgerIngredients.tabs} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredients.menu}>
                <h3 className={`${burgerIngredients.title}text_type_main-medium menu__title`}>Булки</h3>
                <div className={burgerIngredients.menuItems}>
                {  data.map(item => 
                    item.type === 'bun' &&
                    <div className={burgerIngredients.menuItem}>
                        <img src={item.image} alt="" />
                        <p className={`${burgerIngredients.menuItemCurrency} text text_type_digits-default`}>
                            <CurrencyIcon type="primary" />
                            <span className='ml-1'>{item.price}</span>
                        </p>
                        <p className={`${burgerIngredients.menuItemName} text text_type_main-default`}>{item.name}</p>
                        <Counter count={1} size="default" />
                    </div>)
                }
                </div>
                <h3 className={`${burgerIngredients.title}text_type_main-medium menu__title mt-10`}>Соусы</h3>
                <div className={burgerIngredients.menuItems}>
                    { data.map(item => 
                        item.type === 'sauce' && 
                        <div className={burgerIngredients.menuItem}>
                            <img src={item.image}alt="" />
                            <p className={`${burgerIngredients.menuItemCurrency} text text_type_digits-default`}>
                                <CurrencyIcon type="primary" />
                                <span className='ml-1'>{item.price}</span>
                            </p>
                            <p className={`${burgerIngredients.menuItemName} text text_type_main-default`}>{item.name}</p>
                            <Counter count={1} size="default" />
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    type: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number
}; 

export default BurgerIngredients;