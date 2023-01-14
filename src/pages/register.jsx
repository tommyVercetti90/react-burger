import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import login from './login/login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../services/actions/user';
import { Redirect, Link, useLocation } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    const { user, status, registerFailure, registerSuccess, registerRequest } = useSelector(store => store.userReducer);
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
  
    const postRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password));
    };

    return (
        <>
            { user ? <Redirect to={ location.state?.from || '/' } /> : 
                <div className={`${login.wrapper}`}>
                    <h3 className={'text text_type_main-medium mb-6'}>Регистрация</h3>
                    <form onSubmit={postRegister}>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            extraClass='mb-6'
                            placeholder='Имя'/>
                        <EmailInput
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            extraClass='mb-6'
                            placeholder='E-mail'/>
                        <PasswordInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            extraClass='mb-6'/>
                        { registerFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
                        { registerRequest && <p className="text text_type_main-default">{status}</p>}
                        { registerSuccess && <p className="text text_type_main-default">{status}</p>}
                        <Button 
                            htmlType="submit" 
                            disabled={ name && email && password ? false : true} 
                            type="primary" 
                            size="medium">
                                Зарегистрироваться
                        </Button>
                    </form>
                    <p className='text text_type_main-default text_color_inactive mb-4 mt-6'>Уже зарегистрированы?<Link to='/login' className={`${login.link} text text_type_main-default ml-2`}>Войти</Link></p>
                </div>
            }
        </>
    );
};

export default Register;