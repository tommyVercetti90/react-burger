/* eslint-disable no-lone-blocks */
import burgerConstructor from './burger-constructor.module.css'
import { useState, useMemo } from 'react'
import { CurrencyIcon,  ConstructorElement, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import BurgerConstructorIngredient from './burger-constructor-ingredient'
import OrderDetails from '../order-details/order-details'
import { addIngredientToConstructor, addBunToConstructor, sortIngredients,clearIngredients } from '../../services/actions/constructor'
import { clearOrderNum, getOrderDetails } from '../../services/actions/order'
import {useSelector, useDispatch} from 'react-redux'
import { useDrop } from "react-dnd"
 
const BurgerConstructor = () => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients)
    const constructorIngredients = useSelector(store => store.constructorReducer.constructorIngredients)
    const bun = useSelector(store => store.constructorReducer.constructorBun)

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            const item = ingredients.find(item => item._id === itemId._id)
            item.type === "bun" ? dispatch(addBunToConstructor(item)) : dispatch(addIngredientToConstructor(item))
        }
    })
    
    const getIdIngredients = () => {
      const ingredientsId = [];
      constructorIngredients.map(component => ingredientsId.push(component._id))
      if(bun) {
        ingredientsId.unshift(bun._id)
        ingredientsId.push(bun._id)
      }   
      return ingredientsId
    }

    const totalPrice = useMemo(
      () => 
        constructorIngredients?.reduce((acc, item) => acc + item.price, bun?.price * 2), 
        [constructorIngredients, bun])

    const openModal = () => {
        dispatch(getOrderDetails(getIdIngredients()))
        setVisible(true)
    }
            
    const closeModal = () => {
        dispatch(clearOrderNum())
        dispatch(clearIngredients())
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
                    <span className='text text_type_digits-medium mr-2'>{totalPrice || 0}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button 
                    disabled={!constructorIngredients.length>0 && bun === null}
                    type="primary" 
                    size="medium" 
                    htmlType={'button'} 
                    onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && (<Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>)}
        </section>
    );
};

export default BurgerConstructor;