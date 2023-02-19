import burgerConstructor from './burger-constructor.module.css'
import { useState, useMemo } from 'react'
import { CurrencyIcon,  ConstructorElement, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import BurgerConstructorIngredient from './burger-constructor-ingredient'
import OrderDetails from '../order-details/order-details'
import { addIngredientToConstructor, addBunToConstructor, sortIngredients,clearIngredients } from '../../services/actions/constructor'
import { clearOrderNum, getOrderDetails } from '../../services/actions/order'
import { useDispatch, useSelector } from '../../hooks/hooks'; 
import { useDrop } from "react-dnd"
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';
import { getCookie } from '../../utils/cookie'

const BurgerConstructor = () => {
    const history = useHistory();
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()
    const ingredients = useSelector((store) => store.ingredientsReducer.ingredients)
    const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients)
    const bun = useSelector((store) => store.constructorReducer.constructorBun)
    const { user } = useSelector((store) => store.userReducer);

    const { fetchRequestOrder, fetchErrorOrder } = useSelector((store) => store.orderReducer)

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId: { _id: string }) {
            const item = ingredients.find((item: { _id: string }) => item._id === itemId._id)
            if(item)
            item.type === "bun" ? dispatch(addBunToConstructor(item)) : dispatch(addIngredientToConstructor(item))
        }
    })
    
    const getIdIngredients = () => {
      const ingredientsId = [];
      constructorIngredients.map((component:{_id: string}) => ingredientsId.push(component._id))
      if(bun) {
        ingredientsId.unshift(bun._id)
        ingredientsId.push(bun._id)
      }   
      return ingredientsId
    }

    const bunPrice = bun ? bun.price : 0

    const totalPrice = useMemo(
      () =>
        constructorIngredients?.reduce((acc: number, item: { price: number }) => acc + item.price, bunPrice * 2), 
        [constructorIngredients, bunPrice])
    
    const accessToken =  getCookie('accessToken')
    
    const openModal: () => void = () => {
        if (user) {
            
            dispatch(getOrderDetails(getIdIngredients(),accessToken))
            setVisible(true)
        } else { 
            history.push({pathname: '/login'});
        }
    }
            
    const closeModal: () => void = () => {
        dispatch(clearOrderNum())
        dispatch(clearIngredients())
        setVisible(false)
    }
    

    const moveIngredient = (dragIndex:number, hoverIndex:number, constructorIngredients: TIngredient[]) => {
        dispatch(sortIngredients(dragIndex, hoverIndex, constructorIngredients))
    }

    return (
        <section className='pl-4 pt-25'>
            <div
                data-testid="drag-destination"
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
                    {constructorIngredients.map((item, index: number) => 
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
                    disabled={!(constructorIngredients.length > 0) && bun === null}
                    type="primary" 
                    size="medium" 
                    htmlType={'button'} 
                    onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {fetchRequestOrder && <Modal title={'Оформляем ваш заказ...'} />}
            {visible &&  !fetchRequestOrder && !fetchErrorOrder &&(<Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>)}
            {fetchErrorOrder &&
                <Modal title={'Что-то пошло не так :( Попробуйте еще раз'} /> 
            }
        </section>
    );
};

export default BurgerConstructor;