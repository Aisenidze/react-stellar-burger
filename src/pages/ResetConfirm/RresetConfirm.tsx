import { FC } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAppSelector } from '../../services/types';
import { IUseLocation } from '../../types';
import Loading from '../Loading/Loading';
import styles from './ResetConfirm.module.css';

export const ResetConfirm: FC = () => {
    const isAuthChecked = useAppSelector(store => store.user.isAuthChecked);
    const user = useAppSelector(store => store.user.userData.name);
    const changePasswordRequest = useAppSelector(store => store.user.changePasswordRequest)
    const { state } = useLocation<IUseLocation>()
    const store = useAppSelector(store => store);

    const userData = {
        name: '',
        email: '',
        password: '',
        token: ''
    }

    const { values, handleChange, handleResetPassword } = useForm(userData);

    if (store.user.changePasswordConfirmed) {
        return <Redirect to={{ pathname: '/profile' }} />
    }

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (changePasswordRequest) {
        return (
            <Loading />
        );
    }

    return (
        <div className={`${styles.resetConfirm} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleResetPassword}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Сохранить
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${styles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}