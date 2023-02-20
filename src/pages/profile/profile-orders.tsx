import { useEffect } from 'react';
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";
import { getCookie } from "../../utils/cookie";
import { useSelector, useDispatch } from "../../hooks/hooks";
import { USER_ORDERS_URL } from "../../utils/burger-ws";
import OrdersList from "../../components/orders-list/orders-list";
import profileStyle from "./profile.module.css";

const ProfileOrders = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(store => store.userReducer)
  
    useEffect(() => {
        dispatch(connectToOrders(`${USER_ORDERS_URL}?token=${getCookie('accessToken')?.replace('Bearer ','')}`))
        return () => {
          dispatch(disconnectFromOrders());
        }
      }, [])
    return (
        <div className={profileStyle.orders_history} >
            <OrdersList isShow={false}/>
        </div>
    );
};

export default ProfileOrders;