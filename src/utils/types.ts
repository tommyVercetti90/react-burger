export type TIngredient = {
    _id: string
    name: string
    type: string
    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
    price: number
    image: string
    image_mobile: string
    image_large?: string
    __v?: number
    ingredientUuid?: string
}

export type TParams = {
  id: string
}

export type TModalProps = {
  title?: string
  onClose?: () => void
  children?: React.ReactNode
}

export type TLocationWithFrom = Location & {
  from: string;
};

export type TUser = {
  createdAt?: string;
  email?: string;
  name?: string;
  updatedAt?: string;
  password?: string;
}

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TUser;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};