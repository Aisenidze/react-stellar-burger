import styles from './ForgotPassword.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { RequestForgotPassword } from '../../services/ForgotPasswordSlice/ForgotPasswordSlice';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typeHook';

export const ForgotPasswordPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const { success } = useAppSelector(state => state.forgotpassword);

    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
        alert('Icon Click Callback')
    }

    const handleClick = useCallback((e) => {
        e.preventDefault();
        dispatch(RequestForgotPassword(e.target.email.value));
    }, [dispatch])

    useEffect(() => {
        if (success) {
            navigate('/reset-password')
        }
    }, [success, navigate])
    
    return (
        <main className={styles.main}>
            <form className={styles.main} 
            onSubmit={handleClick}
            >
                <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
                <div className='mt-6 mb-6'>
                    <Input type='email' placeholder={'Укажите e-mail'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'} 
                        />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                >Восстановить</Button>
                <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
            </form>
        </main >
    )
}