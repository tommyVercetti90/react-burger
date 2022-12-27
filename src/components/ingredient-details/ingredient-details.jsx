import ingredientStyle from './ingredient-details.module.css'
import {useSelector, useDispatch} from 'react-redux'

const IngredientDetails = () => {
    const ingredientDetails = useSelector(store => store.ingredientsReducer.ingredient)

    return (
        <div className={`${ingredientStyle.wrapper} pb-15`}>
            <img src={ingredientDetails.image_large} alt={ingredientDetails.name} />
            <p className='text text_type_main-medium mb-8'>{ingredientDetails.name}</p>
            <ul className={`${ingredientStyle.list} text_color_inactive`}>
                <li>
                    <div className='text text_type_main-default'>Калории,ккал</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.calories}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Белки, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.proteins}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Жиры, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.fat}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Углеводы, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.calories}</div>
                </li>
            </ul>
        </div>
    );
};

export default IngredientDetails;