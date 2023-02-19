import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';
import { useEffect } from 'react';
import { ALL_ORDERS_URL } from "../../utils/burger-ws";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";

const VISIBLE_ORDERS_SLICE = 10;

export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectToOrders(ALL_ORDERS_URL))

    return () => {
      dispatch(disconnectFromOrders());
    }
  }, [])

  const { orders } = useSelector(store => store.WsOrdersReducer)

  return (
    <>
      <h1 className="mt-10 mb-6 text text_type_main-large">Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.orders_list}>
          <OrdersList isShow={false}/>
        </div>
        <div className={`ml-15 ${styles.orders_summary}`}>
          <div className={styles.orders_status}>
            <div className={styles.orders}>
              <p className="mb-6 text text_type_main-medium">Готовы:</p>
              <ul className={styles.list} >
                {orders && orders.orders.slice(0, VISIBLE_ORDERS_SLICE).map((order, index) => {
                  if (order.status === 'done') {
                    return <li key={index}><p className={`mb-2 text text_type_digits-default ${styles.done_number}`}>{order.number}</p></li>
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={styles.orders}>
              <p className="mb-6 text text_type_main-medium">В работе:</p>
              <ul className={styles.list} >
                {orders && orders.orders.map((order, index) => {
                  if (order.status === 'pending' || order.status === 'created') {
                    return <li key={index}><p className="text text_type_digits-default">{order.number}</p></li>
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
          <p className="mt-8 text text_type_main-medium">Выполнено за все время:</p>
          <p className={`mb-15 text text_type_digits-large ${styles.digit}`} >{orders?.total}</p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`mb-15 text text_type_digits-large ${styles.digit}`}>{orders?.totalToday}</p>
        </div>
      </div>
    </>
  )
}
