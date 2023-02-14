import {useState,ChangeEvent,FormEvent} from 'react'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import login from './login/login.module.css'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getForgotPassword } from '../services/actions/reset-password'
import { TLocationWithFrom } from "../utils/types";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocationWithFrom>();
    // eslint-disable-next-line no-mixed-operators
    const [email, setEmail] = useState<string>('');

    const { user } = useSelector((store:any) => store.userReducer);
    const { forgotRequest, forgotFailed, status } = useSelector((store:any) => store.resetPasswordReducer);

    const postForgotRequest = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //@ts-ignore
        dispatch(getForgotPassword(email, history))
    }

    return (
        <>
            { user ? <Redirect to={ location.state?.from || '/' } /> : 
                <div className={`${login.wrapper}`}>
                    <h3 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h3>
                    <form onSubmit={postForgotRequest}>
                        <EmailInput
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email}            
                            extraClass='mb-6'
                            placeholder='Укажите e-mail'/>  
                        { forgotFailed && <p className="text text_type_main-default text_color_error mb-6">{status}</p>}
                        { forgotRequest && <p className="text text_type_main-default mb-6">{status}</p>}                                             
                        <Button
                            extraClass='mb-5'
                            htmlType="submit" disabled={ email ? false : true } 
                            type="primary" size="medium">
                                Восстановить
                        </Button>
                    </form>
                    <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль?<Link to='/login' className={`${login.link} text text_type_main-default ml-2`}>Войти</Link></p>
                </div>
            }
        </>
    );
};

export default ForgotPassword;