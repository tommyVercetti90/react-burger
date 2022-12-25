import burgerConstructor from './burger-constructor.module.css'
import { useState, useMemo } from 'react'
import { CurrencyIcon,  ConstructorElement, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import BurgerConstructorIngredient from './burger-constructor-ingredient'
import OrderDetails from '../order-details/order-details'
import { clearDataOrder, getOrderDetails, addIngredientToConstructor, addBunToConstructor, sortIngredients } from '../../services/actions/actions'
import {useSelector, useDispatch} from 'react-redux'
import { useDrop } from "react-dnd"

const BurgerConstructor = () => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const ingredients = useSelector(store => store.ingredients)
    const constructorIngredients = useSelector(store => store.constructorIngredients)
    const bun = useSelector(store => store.constructorBun)
    let totalIngredientPrice = 0
    let totalBunPrice = 0
    let ingredientsId = []
    
    const order = useSelector(store => store.orderDetails)

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            const item = ingredients.find(item => item._id === itemId._id)
            item.type === "bun" ? dispatch(addBunToConstructor(item)) : dispatch(addIngredientToConstructor(item))
        }
    })

    const getIdIngredients = useMemo(
        () =>
        constructorIngredients.filter(element => ingredientsId.push(element._id)),
        [constructorIngredients,bun]
      )

    const getIdBuns = useMemo(
        () =>
        {if(bun) ingredientsId.push(bun._id)},
        [constructorIngredients, bun]
      )

    const getTotalIngredientPrice = useMemo(
        () =>
        constructorIngredients.map(item => totalIngredientPrice += item.price),
        [constructorIngredients,bun]
      )
      
    const getTotalBunPrice = useMemo(
        () =>
        {if(bun) totalBunPrice += bun.price * 2},
        [bun,constructorIngredients]
      )

    const openModal = () => {
        dispatch(getOrderDetails(ingredientsId))
        setVisible(true)
    }
            
    const closeModal = () => {
        dispatch(clearDataOrder())
        setVisible(false)
    }
    const moveIngredient = (dragIndex, hoverIndex, constructorIngredients) => {
        dispatch(sortIngredients(dragIndex, hoverIndex, constructorIngredients))
    }

    return (
        <section className='pl-4 pt-25'>
            <div
                ref={dropTarget}>
                {bun ? (<div className='pl-8 pr-4'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${bun?.name} (верх)`}
                        price={bun?.price}
                        thumbnail={bun?.image_mobile}
                        />            
                </div>): null}
                <ul className={`${burgerConstructor.list} ${burgerConstructor.menu}`}>
                    {constructorIngredients.map((item,index) => 
                        item.type !== 'bun' &&
                        <BurgerConstructorIngredient
                            index={index}
                            ingredient={item} 
                            key={item.ingredientUuid}
                            moveIngredient={moveIngredient}/>
                    )}
                </ul>
                {bun ? <div className='pl-8 pr-4'>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun?.name} (низ)`}
                        price={bun?.price}
                        thumbnail={bun?.image_mobile}
                        />             
                </div>: <div className='text_type_main-medium menu__title pt-15 pb-15'>Перетащите ингредиенты для сборки бургера</div>}
            </div>
            <div className={`${burgerConstructor.totalBox} mt-10`}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{totalBunPrice+totalIngredientPrice}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="medium" htmlType={'button'} onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && (<Modal onClose={closeModal}>
                <OrderDetails orderNum={order}/>
            </Modal>)}
        </section>
    );
};

export default BurgerConstructor;