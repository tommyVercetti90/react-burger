import orderDetails  from './order-details.module.css'
import checkImage from '../../images/check.svg'
import {useSelector} from 'react-redux'

const OrderDetails = () => {
    const order = useSelector(store => store.orderReducer.orderDetails)    
    
    return (
        <div className={`${orderDetails.wrapper} pt-10 pr-25 pb-30 pl-25`}>
            <p className={`${orderDetails.code} text text_type_digits-large mb-8`}>{order}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>  
            <img className='mt-2 mb-15' src={checkImage} alt="checkImage" />
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails ;