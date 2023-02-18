import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/';
import { useParams } from 'react-router-dom';
import { TParams } from '../../services/types/types';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getOrderStatus } from '../../utils/utils';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';
import moment from 'moment';
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";
import { getCookie } from "../../utils/cookie";
import { USER_ORDERS_URL, ALL_ORDERS_URL } from "../../utils/burger-ws";

export const OrderInfo = () => {

  const { id } = useParams<TParams>(); 
  const location = useLocation<{background: Location}>();
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.WsOrdersReducer);

  useEffect(() => {
    if (!orders && location.pathname === `/feed/${id}`) {
      dispatch(connectToOrders(ALL_ORDERS_URL))
    } 
    if (!orders && location.pathname === `/profile/orders/${id}`) {
      dispatch(connectToOrders(`${USER_ORDERS_URL}?token=${getCookie('accessToken')?.replace('Bearer ','')}`))
    }
    return () => {
      dispatch(disconnectFromOrders());
    }
  }, [])
  
  const order = useMemo(() => {
    return orders?.orders.find(order => order._id === id)
  }, [orders, id]);
  console.log('orders', orders)
  
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const orderIngredients = order?.ingredients.map(oi => ingredients.find((i: { _id: string; }) => i._id === oi)).filter(x => x !== undefined);

  const groupByCount = (orderIngredients: (TIngredient | undefined)[] | undefined) => {
    return orderIngredients?.reduce<{ key: string, ingredients: TIngredient[] }[]>(
        (rv, x) => {
            if (x) {
                const g = rv.find(k => k.key === x._id);
                if (g) {
                    g.ingredients.push(x);
                }
                else {
                    rv.push({ key: x._id, ingredients: [x] })
                }
            }
            return rv;
        }, []
    )
}

  return (
    <div className={styles.container} >
      <p className={`mb-10 text text_type_digits-default ${styles.number}`}># {order?.number}</p>
      <p className="mb-3 text text_type_main-medium">{order?.name}</p>
      <p style={{ color: `${getOrderStatus(order?.status).color}` }}  className="mb-15 text text_type_main-small">{getOrderStatus(order?.status).text}</p>
      <p className="mb-6 text text_type_main-medium">Состав:</p>

      <div className={`mb-10 ${styles.ingredients_box}`}>

      { orderIngredients && groupByCount(orderIngredients)?.map(order => (
              <div key={order.key} className={styles.ingrediens_item} >
              <div className={styles.img_border} >
                <div className={styles.img_border_back}>
                  <img className={styles.card_img} src={order?.ingredients[0].image_mobile} alt={order?.ingredients[0].name} />
                </div>
              </div>
              <p className={`text text_type_main-default ${styles.name}`}>{order?.ingredients[0].name}</p>
              <div className={styles.count}>
                <p className="text text_type_digits-default">{order?.ingredients.length} х {order?.ingredients[0].price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
      ))}

      </div>

      <div className={styles.summary} >
        <p className="text text_type_text-default text_color_inactive">{moment(order?.createdAt).calendar()}</p>
        <div className={styles.count}>
            <p className="text text_type_digits-default">{ orderIngredients?.reduce((acc, item) => acc + (item ? item.price : 0), 0) }</p>
            <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
};