import {useEffect,useState} from 'react'
import burgerIngredients from './burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd"
import { useSelector } from 'react-redux'

const BurgerIngredientItem = ({ _id, name,price,image,type }) => {
    const {constructorIngredients, bun} = useSelector(store => 
        ({
            constructorIngredients: store.constructorReducer.constructorIngredients,
            bun: store.constructorReducer.constructorBun
        }))

    const[count, setCount] = useState(0)  
    
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {_id}
    })

    useEffect(() => {
        switch (type) {
            case 'bun': 
                setCount(bun?._id === _id ? 2 : 0)
                break
            default:
                setCount(constructorIngredients.filter((draggedItem) => draggedItem._id === _id).length)
                break
        }
    },[constructorIngredients, bun, type, _id]) 
    
    return (
        <li 
            ref={dragRef}
            className={burgerIngredients.menuItem}>
            <img src={image} alt={image} />
            <p className={`${burgerIngredients.menuItemCurrency}`}>
                <span className='mr-2'>{price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={`${burgerIngredients.menuItemName}`}>{name}</p>
            {count > 0 && <Counter count={count} size="default" />}
        </li>
    )
}

export default BurgerIngredientItem