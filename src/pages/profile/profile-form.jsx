import { EmailInput, Input,PasswordInput,Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { getUserInfo, updateUserInfo } from '../../services/actions/user'
import profileStyle from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'

const ProfileForm = () => {
    const dispatch = useDispatch();

    const { name, email } = useSelector(store => store.userReducer.user);
    const { editUserSuccess } = useSelector(store => store.userReducer);
    
    const [state, setState] = useState({
      name: '',
      email: '',
      password: ''
    });

    useEffect(() => {
      dispatch(getUserInfo());

      if (name && email) {
        setState({...state, name: name, email: email})
      }
    }, [dispatch, name, email]);

    const hadleInputChange = (evt) => {
      const target = evt.target;
      const value = target.value;
      const name = target.name;

      setState({
        ...state,
        [name]: value
      })
    };

    const postForm = (e) => {
      e.preventDefault();

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
            <EmailInput
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