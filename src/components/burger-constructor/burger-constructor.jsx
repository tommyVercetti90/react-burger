import burgerConstructor from './burger-constructor.module.css'
import { useState, useContext, useEffect } from 'react'
import { CurrencyIcon,  ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { constructorContext } from '../../services/constructorContext';

const BurgerConstructor = () => {
    const _API_ORDERS = 'https://norma.nomoreparties.space/api/orders'
    const [visible, setVisible] = useState(false)
    const [orderDetails, setOrderDetails] = useState()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const data = useContext(constructorContext)
    let burgerBun = data[0]
    let total = 0
    let ingredientsId = []
    let orderNum = orderDetails?.order?.number

    const openModal = () => {
        setVisible(true)
    }
    const closeModal = () => {
        setVisible(false)
    }
    const getTotalprice = () => {
        data.map(item => total += item.price)
    }

    getTotalprice()

    const getIdOrders = () => {
        data.forEach(element => {
            ingredientsId.push(element._id)
        });
    }
    
    useEffect(()=> {
        getIdOrders()
    },[data])
    
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"ingredients": ingredientsId})
        };
        fetch(_API_ORDERS, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((result) => {
                setOrderDetails(result)
              })
            .catch((error) => {
                setError(error);
            })
            .finally(() => setIsLoaded(true))
    }, [data]);

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