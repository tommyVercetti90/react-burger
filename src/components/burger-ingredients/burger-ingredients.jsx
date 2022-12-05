import {useState} from 'react'
import burgerIngredients from './burger-ingredients.module.css'
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const BurgerIngredients = (data) => {
    const [current, setCurrent] = useState('one')
    const [visible, setVisible] = useState(false)
    const [ingredientDetails, setIngredientDetails] = useState({})

    const openModal = () => {
        setVisible(true)
    }
    const closeModal = () => {
        setVisible(false)
    }
    const getDetails = (item) => {
        setIngredientDetails(item)
    }
    
    
    return (
        <section>
            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
            <div className={burgerIngredients.tabs}>
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
                {current === 'one' && 
                    <>
                        <h3 className={`${burgerIngredients.title}text_type_main-medium menu__title mt-10`}>Булки</h3>
                        <ul className={burgerIngredients.menuItems}>
                        {  data.data.map(item => 
                            item.type === 'bun' &&
                            <li className={burgerIngredients.menuItem} key={item._id} onClick={()=> {openModal();getDetails(item)}}>
                                <img src={item.image} alt={item.name} />
                                <p className={`${burgerIngredients.menuItemCurrency} text text_type_digits-default`}>
                                    <CurrencyIcon type="primary" />
                                    <span className='ml-1'>{item.price}</span>
                                </p>
                                <p className={`${burgerIngredients.menuItemName} text text_type_main-default`}>{item.name}</p>
                                <Counter count={1} size="default" />
                            </li>)
                        }
                        </ul>
                    </>
                }
                {current === 'two' &&
                    <>
                        <h3 className={`${burgerIngredients.title}text_type_main-medium menu__title mt-10`}>Начинки</h3>
                        <ul className={burgerIngredients.menuItems}>
                            { data.data.map(item => 
                                item.type === 'main' && 
                                <li className={burgerIngredients.menuItem} key={item._id} onClick={()=> {openModal();getDetails(item)}}>
                                    <img src={item.image}alt={item.name} />
                                    <p className={`${burgerIngredients.menuItemCurrency} text text_type_digits-default`}>
                                        <CurrencyIcon type="primary" />
                                        <span className='ml-1'>{item.price}</span>
                                    </p>
                                    <p className={`${burgerIngredients.menuItemName} text text_type_main-default`}>{item.name}</p>
                                    <Counter count={1} size="default" />
                                </li>)
                            }
                        </ul>
                    </>
                }
                {current === 'three' &&
                    <>
                        <h3 className={`${burgerIngredients.title}text_type_main-medium menu__title mt-10`}>Соусы</h3>
                        <ul className={burgerIngredients.menuItems}>
                            { data.data.map(item => 
                                item.type === 'sauce' && 
                                <li className={burgerIngredients.menuItem} key={item._id} onClick={()=> {openModal();getDetails(item)}}>
                                    <img src={item.image}alt={item.name} />
                                    <p className={`${burgerIngredients.menuItemCurrency} text text_type_digits-default`}>
                                        <CurrencyIcon type="primary" />
                                        <span className='ml-1'>{item.price}</span>
                                    </p>
                                    <p className={`${burgerIngredients.menuItemName} text text_type_main-default`}>{item.name}</p>
                                    <Counter count={1} size="default" />
                                </li>)
                            }
                        </ul>
                    </>
                }
            </div>
            {visible && (<Modal onClose={closeModal} title={'Детали ингредиента'}>
                <IngredientDetails ingredientDetails={ingredientDetails}></IngredientDetails>
            </Modal>)}
        </section>
        )
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  }; 

export default BurgerIngredients;