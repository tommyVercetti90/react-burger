import ingredientStyle from './ingredient-details.module.css'
import PropTypes from 'prop-types';

const IngredientDetails = (ingredientDetails) => {

    return (
        <div className={`${ingredientStyle.wrapper} pb-15`}>
            <img src={ingredientDetails.ingredientDetails.image_large} alt={ingredientDetails.ingredientDetails.name} />
            <p className='text text_type_main-medium mb-8'>{ingredientDetails.ingredientDetails.name}</p>
            <ul className={`${ingredientStyle.list} text_color_inactive`}>
                <li>
                    <div className='text text_type_main-default'>Калории,ккал</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.ingredientDetails.calories}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Белки, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.ingredientDetails.proteins}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Жиры, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.ingredientDetails.fat}</div>
                </li>
                <li>
                    <div className='text text_type_main-default'>Углеводы, г</div>
                    <div className='text text_type_digits-default mt-2'>{ingredientDetails.ingredientDetails.calories}</div>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredientDetails: PropTypes.object.isRequired
  }; 

export default IngredientDetails;