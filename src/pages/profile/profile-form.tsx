import { Input,PasswordInput,Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect,ChangeEvent,FormEvent } from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../../services/actions/user'
import profileStyle from './profile.module.css'
import { useDispatch, useSelector } from "../../hooks/hooks";
import { USER_ORDERS_URL } from "../../utils/burger-ws";
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";
import { getCookie } from "../../utils/cookie";
import { TUser } from "../../services/types/types";  

const ProfileForm = () => {
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(connectToOrders(`${USER_ORDERS_URL}?token=${getCookie('accessToken')?.replace('Bearer ','')}`))
      return () => {
        dispatch(disconnectFromOrders());
      }
    }, [])

    const location = useLocation<{background: Location}>();

    const { user } = useSelector((store) => store.userReducer);
    const { editUserSuccess } = useSelector((store) => store.userReducer);

    const [state, setState] = useState<TUser> ({
      name: '',
      email: '',
      password: ''
    });

    useEffect(() => {
      dispatch(getUserInfo());

      if (user?.name && user?.email) {
        setState({...state, name: user.name, email: user.email})
      }
    }, [dispatch, user?.name, user?.email]);

    const hadleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const target = evt.target;
      const value = target.value;
      const name = target.name;

      setState({
        ...state,
        [name]: value
      })
    };

    const postForm = (e: FormEvent) => {
      e.preventDefault();
      dispatch(updateUserInfo(state));
    };

    const cancelEdit: () => void = () => {
      setState({...state, name: user?.name, email: user?.email, password: ''});
    };

    return (
        <form onSubmit={postForm}>
            <Input
                type={'text'}
                onChange={hadleInputChange}
                value={state.name || ''}
                extraClass='mb-6'
                icon={'EditIcon'}
                name='name'
                placeholder='Имя'/>
            <Input
                type={'text'}
                icon={'EditIcon'}
                onChange={hadleInputChange}
                value={state.email || ''}
                extraClass='mb-6'
                name='email'
                placeholder='E-mail'/>
            <PasswordInput
                icon={'EditIcon'}
                onChange={hadleInputChange}
                name='password'
                value={state.password || ''}
                extraClass='mb-6'/>
            {state.name !== user?.name || state.email !== user?.email ? (
                <>
                    <Button extraClass='mr-6' htmlType="button" type="primary" size="medium" onClick={cancelEdit} >Отмена</Button>
                    <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </>
            ) : null}
            <p className={editUserSuccess ? profileStyle.visible : profileStyle.hidden}>Данные успешно обновленны</p>                      
        </form>
    )
}

export default ProfileForm