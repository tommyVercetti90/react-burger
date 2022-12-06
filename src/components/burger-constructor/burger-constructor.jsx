import burgerConstructor from './burger-constructor.module.css'
import {useState} from 'react'
import { CurrencyIcon,  ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';

const BurgerConstructor = (data) => {
    let burgerBun = data.data[0]
    const [visible, setVisible] = useState(false)
    const openModal = () => {
        setVisible(true)
    }
  
    const closeModal = () => {
        setVisible(false)
    }
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
                {data.data.map((item,index) => 
                    index !== 0 && index !== data.data.length-1 &&
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
                    <span className='text text_type_digits-medium mr-2'>610</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="medium" htmlType={'button'} onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && (<Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>)}
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
  }; 

export default BurgerConstructor;