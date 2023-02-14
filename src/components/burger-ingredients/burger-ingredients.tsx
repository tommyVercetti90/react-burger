import {useState,useRef,FC} from 'react'
import burgerIngredients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientItem from './burger-ingredient-item'
import {useSelector} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../utils/types'

const BurgerIngredients: FC = () => {
    const location = useLocation()
    const ingredients = useSelector((store:any) => store.ingredientsReducer.ingredients)
    const [currentTab, setCurrentTab] = useState<string>("bun")
    const containerRef = useRef<HTMLHeadingElement>(null)
    const bunsRef = useRef<HTMLHeadingElement>(null)
    const saucesRef = useRef<HTMLHeadingElement>(null)
    const mainRef = useRef<HTMLHeadingElement>(null)

    const setCurrent = (event: string) : void => {
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
        //@ts-ignore
        tabToScroll.current.scrollIntoView( {behavior: "smooth"} )
        setCurrentTab(event);
    }

    const handleScroll = () => {
        //@ts-ignore
        const containerY = containerRef.current.getBoundingClientRect().y;
        //@ts-ignore
        const bunsOffset = Math.abs(bunsRef.current.getBoundingClientRect().y - containerY)
        //@ts-ignore
        const saucesOffset = Math.abs(saucesRef.current.getBoundingClientRect().y - containerY)
        //@ts-ignore
        const mainOffset = Math.abs(mainRef.current.getBoundingClientRect().y - containerY)
        
        if(bunsOffset < saucesOffset && bunsOffset < mainOffset) setCurrentTab("bun")
        if(saucesOffset < bunsOffset && saucesOffset < mainOffset) setCurrentTab("sauce")
        if(mainOffset < bunsOffset && mainOffset < saucesOffset) setCurrentTab("main")
    }
    
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
                {  ingredients.map((item: TIngredient) => 
                    item.type === 'bun' &&
                        <Link 
                            to={{pathname: `ingredients/${item._id}`, state: {background: location}}} 
                            key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}
                                image_mobile={''}/>
                        </Link>)                       
                }
                </ul>
                <h3 className={`${burgerIngredients.title} text_type_main-medium menu__title mt-10`} ref={saucesRef}>Соусы</h3>
                <ul className={burgerIngredients.menuItems}>
                    { ingredients.map((item: TIngredient) => 
                        item.type === 'sauce' && 
                        <Link 
                            to={{pathname: `ingredients/${item._id}`, state: {background: location}}} 
                            key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}
                                image_mobile={''}/>
                        </Link>)
                    }
                </ul>
                <h3 className={`${burgerIngredients.title} text_type_main-medium menu__title mt-10`} ref={mainRef}>Начинки</h3>
                <ul className={burgerIngredients.menuItems}>
                    { ingredients.map((item: TIngredient) => 
                        item.type === 'main' && 
                        <Link 
                            to={{pathname: `ingredients/${item._id}`, state: {background: location}}} 
                            key={item._id} >
                            <BurgerIngredientItem 
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                type={item.type}
                                image_mobile={''}/>
                        </Link>)
                    }
                </ul>
            </div>
        </section>
        )
};

export default BurgerIngredients;