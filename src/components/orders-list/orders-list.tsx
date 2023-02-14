import styles from "./orders-list.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/';
import { FC, useMemo } from 'react';
import { useSelector } from "../../hooks/hooks";
import { TIngredient } from "../../services/types/types";
import { getOrderStatus } from "../../utils/utils";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import moment from "moment";

const VISIBLE_INGREDIENTS_SLICE = 6;
moment.locale()

type TOrderCard = {
  order: { 
    ingredients: (TIngredient | undefined)[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string};
  isShow: boolean;
};

const OrderCard: FC<TOrderCard> = ({order, isShow}) => {

  const location = useLocation();
  const { path } = useRouteMatch();

  const totalPrice = useMemo(() => {
    return order.ingredients.reduce((acc, cur) => cur ? acc + cur.price: 0, 0) 

  }, [order])

  return (
    <Link to={{ pathname: `${path}/${order._id}`, state: { background: location }}} className={styles.card}>
      <div className={styles.card_head}>
        <p className="text text_type_digits-default"># {order.number}</p>
        <p className="text text_type_text-default text_color_inactive">{moment(order.createdAt).calendar()}</p>
      </div>
      <p className="mt-6 mb-2 text text_type_main-medium">{order.name}</p>
      {isShow ? <p style={{ color: getOrderStatus(order.status).color }} className="text text_type_main-default">{getOrderStatus(order.status).text}</p> : null}
      <div className={`mt-6 ${styles.card_summary}`}>
        <div className={styles.card_imgbox} >

          {order && order.ingredients.slice(0, VISIBLE_INGREDIENTS_SLICE).map((item, index) => (
            <div key={index} className={styles.img_border} >
              <div className={styles.img_border_back} style={{ opacity: order.ingredients.length >= VISIBLE_INGREDIENTS_SLICE && (index === VISIBLE_INGREDIENTS_SLICE - 1) ? 0.6 : 1 }}>
                <img className={styles.card_img} src={item?.image_mobile} alt={item?.name} />
              </div>
              {order.ingredients.length >= VISIBLE_INGREDIENTS_SLICE && (index === VISIBLE_INGREDIENTS_SLICE - 1) &&
                <div className={styles.image_text}>+{order.ingredients.length - VISIBLE_INGREDIENTS_SLICE +1}</div>
              }
            </div>
          ))}

        </div>
        <div className={styles.card_total_sum} >
          <p className="mr-2 text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}


const OrdersList = ({isShow}: {isShow: boolean}) => {

  const { orders } = useSelector(store => store.WsOrdersReducer)
  const { ingredients } = useSelector((store) => store.ingredientsReducer);

  const data = useMemo(() => {
      return orders?.orders.map(item => ({ ...item, ingredients: item.ingredients.filter(x => x !== null).map(item => ingredients.find((i: { _id: string; }) => i._id === item)).filter(x => x !== undefined) }));
  }, [orders, ingredients])

  return (
    <div className={styles.orders_list} >
      {data && data.sort((a, b) => b.number - a.number).map((order) => <OrderCard key={order._id} isShow={isShow} order={order} />)}
    </div>
  )
}

export default OrdersList;