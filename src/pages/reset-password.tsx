import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import login from './login/login.module.css'
import {useState,ChangeEvent,FormEvent} from 'react'
import { useSelector, useDispatch } from '../hooks/hooks';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom'
import { postResetPassword } from "../services/actions/reset-password" 
import { TLocationWithFrom } from "../services/types/types";

const ResetPassword = () => {
    const history = useHistory()
    const location = useLocation<TLocationWithFrom>()
  
    const dispatch = useDispatch()
  
    const { resetFailure, resetSuccess, fargotSuccess, resetRequest, status } = useSelector((store) => store.resetPasswordReducer)
  
    const [password, setPassword] = useState<string>('')
    const [emailCode, setEmailCode] = useState<string>('')
  
    const postNewPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(postResetPassword(password, emailCode, history))
    }

    return (
        <>
            { !fargotSuccess ? <Redirect to={ location.state?.from || '/' } /> :
                <div className={`${login.wrapper}`}>
                    <h3 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h3>
                    <form onSubmit={postNewPassword}>
                        <PasswordInput
                            value={password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder='Введите новый пароль'
                            extraClass='mb-6'/>
                        <Input
                            value={emailCode}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmailCode(e.target.value)}
                            extraClass='mb-6'
                            placeholder='Введите код из письма'/>
                        { resetFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
                        { resetRequest && <p className="text text_type_main-default">{status}</p>}
                        { resetSuccess && <p className="text text_type_main-default">{status}</p>}
                        <Button 
                            htmlType="submit" 
                            type="primary" 
                            size="medium">
                                Сохранить
                        </Button>
                    </form>
                    <p className='text text_type_main-default text_color_inactive mb-4 mt-4'>Вспомнили пароль?<Link to='/login' className={`${login.link} text text_type_main-default ml-2`}>Войти</Link></p>
                </div>
            }
        </>
    )
}

export default ResetPassword