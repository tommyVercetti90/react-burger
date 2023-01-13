import {useState,useEffect,useRef} from 'react'
import burgerIngredients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import BurgerIngredientItem from './burger-ingredient-item'
import {useSelector, useDispatch} from 'react-redux'
import { getIngredient } from '../../services/actions/ingredients'
import { fetchIngredients, clearDataModal } from '../../services/actions/ingredients'


const BurgerIngredients = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients)
    const [currentTab, setCurrentTab] = useState("bun")

    const containerRef = useRef()
    const bunsRef = useRef()
    const saucesRef = useRef()
    const mainRef = useRef()

    const setCurrent = (event) => {
        let tabToScroll;
        switch(event) {
            case 'bun':
                tabToScroll = bunsRef;
                break;
            case 'sauce':
                tabToScroll = saucesRef;
                break;
            case 'main':
                tabToScroll = mainRef;
                break;
            default:
                break;
        }
        tabToScroll.current.scrollIntoView( {behavior: "smooth"} )
        setCurrentTab(event);
    }
    const handleScroll = () => {
        const containerY = containerRef.current.getBoundingClientRect().y;
        const bunsOffset = Math.abs(bunsRef.current.getBoundingClientRect().y - containerY)
        const saucesOffset = Math.abs(saucesRef.current.getBoundingClientRect().y - containerY)
        const mainOffset = Math.abs(mainRef.current.getBoundingClientRect().y - containerY)
        
        if(bunsOffset < saucesOffset && bunsOffset < mainOffset) setCurrentTab("bun")
        if(saucesOffset < bunsOffset && saucesOffset < mainOffset) setCurrentTab("sauce")
        if(mainOffset < bunsOffset && mainOffset < saucesOffset) setCurrentTab("main")
    }
        
    const openModal = () => {
        setVisible(true)
    }
    const closeModal = () => {
        dispatch(clearDataModal())
        setVisible(false)
    }
    const getDetails = (item) => {
        dispatch(getIngredient(item))
    }
    useEffect(() => {
        dispatch(fetchIngredients())
      }, [dispatch])

    
    return (
        <section>
            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
            <div className={burgerIngredients.tabs}>
                <Tab 
                    value="bun" 
                    active={currentTab === 'bun'} 
                    onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab 
                    value="sauce" 
                    active={currentTab === 'sauce'} 
                    onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab 
                    value="main" 
                    active={currentTab === 'main'} 
                    onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredients.menu} mt-10`} ref={containerRef} onScroll={handleScroll}>
                <h3 className={`${burgerIngredients.title} text_type_main-medium menu__title mt-10`} ref={bunsRef}>Булки</h3>
                <ul className={burgerIngredients.menuItems}>
                {  ingredients.map(item => 
                    item.type === 'bun' && 
                        <div onClick={()=> {openModal();getDetails(item)}} key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}/>
                        </div>)                       
                }
                </ul>
                <h3 className={`${burgerIngredients.title} text_type_main-medium menu__title mt-10`} ref={saucesRef}>Соусы</h3>
                <ul className={burgerIngredients.menuItems}>
                    { ingredients.map(item => 
                        item.type === 'sauce' && 
                        <div onClick={()=> {openModal();getDetails(item)}} key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}/>
                        </div>)
                    }
                </ul>
                <h3 className={`${burgerIngredients.title} text_type_main-medium menu__title mt-10`} ref={mainRef}>Начинки</h3>
                <ul className={burgerIngredients.menuItems}>
                    { ingredients.map(item => 
                        item.type === 'main' && 
                        <div onClick={()=> {openModal();getDetails(item)}} key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}/>
                        </div>)
                    }
                </ul>
            </div>
            {visible && (<Modal onClose={closeModal} title={'Детали ингредиента'}>
                <IngredientDetails />
            </Modal>)}
        </section>
        )
};

export default BurgerIngredients;