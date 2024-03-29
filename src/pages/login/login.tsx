import { useState,ChangeEvent,FormEvent } from "react"
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import loginStyle from './login.module.css'
import { useSelector, useDispatch } from '../../hooks/hooks';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { login } from "../../services/actions/user"
import { TLocationWithFrom } from "../../services/types/types";

const Login = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.userReducer)
    const history = useHistory()
    const location = useLocation<TLocationWithFrom>()
  
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
  
    const { status, loginFailure } = useSelector((store) => store.userReducer)
  
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login(email, password, history))
    }
    return (
        <>
            { user ? <Redirect to={ location.state?.from || '/' } /> : 
                <div className={`${loginStyle.wrapper}`}>
                    <h3 className={`text text_type_main-medium mb-6`}>Вход</h3>
                    <form onSubmit={handleLogin}>
                        <EmailInput
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email}
                            extraClass='mb-6'
                            placeholder='E-mail'/>
                        <PasswordInput
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder={'Пароль'}
                            value={password}
                            extraClass='mb-6'/>
                        { loginFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
                        <Button 
                            htmlType="submit" 
                            type="primary" 
                            size="medium"
                            disabled={ email && password ? false : true }>
                                Войти
                        </Button>
                    </form>
                    <p className='text text_type_main-default text_color_inactive mb-4 mt-4'>Вы — новый пользователь?<Link to='/register' className={`${loginStyle.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link></p>
                    <p className='text text_type_main-default text_color_inactive'>Забыли пароль?<Link to='/forgot-password' className={`${loginStyle.link} text text_type_main-default ml-2`}>Восстановить пароль</Link></p>
                </div>
            }
        </>
    )
}

export default Login