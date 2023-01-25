import { Input,PasswordInput,Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect,ChangeEvent } from 'react'
import { getUserInfo, updateUserInfo } from '../../services/actions/user'
import profileStyle from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
interface IUser {
  name: string;
  email: string;
  password: string;
}

const ProfileForm = () => {
    const dispatch = useDispatch();

    const { name, email } = useSelector((store: any) => store.userReducer.user);
    const { editUserSuccess } = useSelector((store: any) => store.userReducer);
    
    const [state, setState] = useState<IUser> ({
      name: '',
      email: '',
      password: ''
    });

    useEffect(() => {
      //@ts-ignore
      dispatch(getUserInfo());

      if (name && email) {
        setState({...state, name: name, email: email})
      }
    }, [dispatch, name, email]);

    const hadleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const target = evt.target;
      const value = target.value;
      const name = target.name;

      setState({
        ...state,
        [name]: value
      })
    };

    const postForm = (e: React.FormEvent) => {
      e.preventDefault();
      //@ts-ignore
      dispatch(updateUserInfo(state));
    };

    const cancelEdit = () => {
      setState({...state, name: name, email: email, password: ''});
    };

    return (
        <form onSubmit={postForm}>
            <Input
                type={'text'}
                onChange={hadleInputChange}
                value={state.name}
                extraClass='mb-6'
                icon={'EditIcon'}
                name='name'
                placeholder='Имя'/>
            <Input
                type={'text'}
                icon={'EditIcon'}
                onChange={hadleInputChange}
                value={state.email}
                extraClass='mb-6'
                name='email'
                placeholder='E-mail'/>
            <PasswordInput
                icon={'EditIcon'}
                onChange={hadleInputChange}
                name='password'
                value={state.password}
                extraClass='mb-6'/>
            {state.name !== name || state.email !== email ? (
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