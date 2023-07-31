import styles from './RegisterPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useEffect, useRef, useState } from 'react';
import { SendRegistrationData } from '../../services/RegistrationSlice/RegistrationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typeHook';

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { success } = useAppSelector(state => state.registration);
    const dispatch = useAppDispatch();

    const handleRegister = (e: any) => {
        e.preventDefault();
        const {name,email,password} = e.target;
        dispatch(SendRegistrationData({
            name: name.value,
            email: email.value,
            password: password.value
        }));
    }

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
        alert('Icon Click Callback')
    }

    useEffect(() => {
        if (success) navigate('/login')
    }, [success, navigate])

    return (
        <main className={styles.main}>
            <form className={styles.main} 
            onSubmit={handleRegister}
            >
                <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
                <div className='mt-6 mb-6'>
                    <Input type='text' placeholder={'Имя'}
                        onChange={e => setValue({ ...value, name: e.target.value })}
                        value={value.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        />
                </div>
                <Input type='email' placeholder={'E-mail'}
                    onChange={e => setValue({ ...value, email: e.target.value })}
                    value={value.email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    />
                <div className='mt-6 mb-6'>
                    <Input
                        onChange={e => setValue({ ...value, password: e.target.value })}
                        value={value.password}
                        name={'password'} type='password' placeholder={'Пароль'} icon={'ShowIcon'} />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'>Зарегистрироваться</Button>
                <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Уже зарегистрированы?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
                {/* {success ? navigate('/login') : navigate('/register')} */}
            </form>
        </main >
    )
}