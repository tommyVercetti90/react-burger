import { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructor from './burger-constructor.module.css'
import { useDispatch,useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { REMOVE_INGREDIENT } from '../../services/actions/constructor';

const BurgerConstructorIngredient = ({ ingredient, index, moveIngredient }) => {
    const dispatch = useDispatch();
    const onRemoveItem = (ingredientUuid) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            payload: ingredientUuid
        })
    }
    const constructorIngredients = useSelector(store => store.constructorReducer.constructorIngredients);

    const id = ingredient.ingredientUuid

    const ref = useRef(null)

    const [{ handlerId}, drop] = useDrop({
        accept: "sort",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveIngredient(dragIndex, hoverIndex, constructorIngredients);

            item.index = hoverIndex
        }
    })

    const [ {isDragging}, drag] = useDrag({
        type: "sort",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.2 : 1

    drag(drop(ref))

    return (
        <li
            className={burgerConstructor.listItem}
            ref={ref} style={{opacity}} 
            data-handler-id={handlerId}>
            <div className={burgerConstructor.listIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                handleClose={()=>onRemoveItem(ingredient.ingredientUuid)}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
            />
        </li>
    );
};

export default BurgerConstructorIngredient;