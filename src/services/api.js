import { BASE_URL } from "../constants/constants";
import { request } from "../utils/check-response";

const _API_INGREDIENTS = BASE_URL+'ingredients'

export const getIngredients = () => {
    request(_API_INGREDIENTS)
}
