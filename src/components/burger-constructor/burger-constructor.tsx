import burgerConstructor from './burger-constructor.module.css'
import { CurrencyIcon,  ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data.js'

const BurgerConstructor = () => {
    let burgerTop = data[0]
    let burgerbottom = data[data.length - 1]

    return (
        <section className='pl-4 pr-4 pt-25'>
            <div className='pl-8 pr-4'>
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={burgerTop.name}
                    price={burgerTop.price}
                    thumbnail={burgerTop.image_mobile}
                    />            
            </div>
            <ul className={`${burgerConstructor.list} ${burgerConstructor.menu}`}>
                {data.map((item,index) => 
                    index !== 0 && index !== data.length-1 &&
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
                    text={burgerbottom.name}
                    price={burgerbottom.price}
                    thumbnail={burgerbottom.image_mobile}
                    />             
            </div>
            <div className={`${burgerConstructor.totalBox} mt-10`}>
                <p className='mr-10'>
                    <span className='text text_type_digits-medium mr-2'>610</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="medium" htmlType={'button'}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;