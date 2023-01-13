import {useEffect} from 'react'
import ingredientStyle from './ingredient-details.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCurrentIngredient } from '../../services/actions/current-ingredient';
import { fetchIngredients } from '../../services/actions/ingredients';

const IngredientDetails = () => {
    const dispatch = useDispatch();

    const { id } = useParams(); 
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);

    useEffect(
      () => {
        dispatch(fetchIngredients())
      }, []
    );
  
    useEffect(
      () => {
        if (ingredients.length) {
          dispatch(setCurrentIngredient(ingredients.find(item => item._id === id)));
        }
  
      }, [dispatch, ingredients]
    );
  
    const { currentIngredient } = useSelector(store => store.currentIngredientReducer)

    return (
        <div className={`${ingredientStyle.wrapper} pb-15`}>
            <img src={currentIngredient.image_large} alt={currentIngredient.name} />
            <p className='text text_type_main-medium mb-8'>{currentIngredient.name}</p>
            <ul className={`${ingredientStyle.list} text_color_inactive`}>
                <li>
                    <div className='text text_type_main-default'>Калории,ккал</div>
                    <div className='text text_type_digits-default mt-2'>{currentIngredient.calories}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Белки, г</div>
                    <div className='text text_type_digits-default mt-2'>{currentIngredient.proteins}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Жиры, г</div>
                    <div className='text text_type_digits-default mt-2'>{currentIngredient.fat}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Углеводы, г</div>
                    <div className='text text_type_digits-default mt-2'>{currentIngredient.calories}</div>
                </li>
            </ul>
        </div>
    );
};

export default IngredientDetails;