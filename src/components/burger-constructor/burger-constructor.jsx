import burgerConstructor from './burger-constructor.module.css'
import { useState, useContext, useMemo } from 'react'
import { CurrencyIcon,  ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructor-context';
import {BASE_URL} from '../../constants/constants'
import {request} from '../../utils/check-response'

const BurgerConstructor = () => {
    const _API_ORDERS = BASE_URL+'orders'
    const [visible, setVisible] = useState(false)
    const [orderDetails, setOrderDetails] = useState()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const data = useContext(ConstructorContext)
    let burgerBun = data[0]
    let total = 0
    let ingredientsId = []
    let orderNum = orderDetails?.order?.number

    // в задании сказано что 'В теле запроса нужно передать _id всех ингредиентов, которые находятся в компоненте BurgerConstructor.'
    // Видимо пока drag не реализовали то данные можно брать из data, а потом уже из массива элементов которые драгом перетащили в заказ.
    // p.s ревью у тебя четкие, кармическое спасибо тебе за терпение при ревею :)

    const getIdOrders = useMemo(
        () =>
        data.filter(element => ingredientsId.push(element._id)),
        [data]
      );
    
    const openModal = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"ingredients": ingredientsId})
        }

        request(_API_ORDERS,requestOptions)
            .then((result) => {
                setOrderDetails(result)
              })
              .catch((error) => {
                  setError(error);
                })
                .finally(() => setIsLoaded(true))

        setVisible(true)
    }
            
    const closeModal = () => {
        setVisible(false)
    }
    const getTotalprice = () => {
        data.map(item => total += item.price)
    }

    getTotalprice()
    
    return (
        <section className='pl-4 pt-25'>
            <div className='pl-8 pr-4'>
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${burgerBun?.name} (верх)`}
                    price={burgerBun?.price}
                    thumbnail={burgerBun?.image_mobile}
                    />            
            </div>
            <ul className={`${burgerConstructor.list} ${burgerConstructor.menu}`}>
                {data.map((item,index) => 
                    index !== 0 && index !== data.length-1 && item.type !== 'bun' &&
                    (<li className={burgerConstructor.listItem} key={item._id}>
                        <div className={burgerConstructor.listIcon}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}
                            />
                    </li>)
                )}
            </ul>
            <div className='pl-8 pr-4'>
                <ConstructorElement
                    extraClass={burgerConstructor.listItem}
                    type='bottom'
                    isLocked={true}
                    text={`${burgerBun?.name} (низ)`}
                    price={burgerBun?.price}
                    thumbnail={burgerBun?.image_mobile}
                    />             
            </div>
            <div className={`${burgerConstructor.totalBox} mt-10`}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>{total}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="medium" htmlType={'button'} onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && (<Modal onClose={closeModal}>
                <OrderDetails orderNum={orderNum}/>
            </Modal>)}
        </section>
    );
};

export default BurgerConstructor;