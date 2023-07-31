import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useEffect, FC } from 'react';
import { setResetUserError } from '../../services/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { IUseLocation } from '../../types';
import Loading from '../Loading/Loading';
import styles from './Login.module.css';

export const Login: FC = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const isAuthChecked = useAppSelector(store => store.user.isAuthChecked);
    const loginRequest = useAppSelector(store => store.user.loginRequest)
    const user = useAppSelector(store => store.user.userData.name);
    const userError = useAppSelector(store => store.user.userError);
    const { state } = useLocation<IUseLocation>();
    const location = useLocation<IUseLocation>();

    const userErrorCode = userError?.message?.slice(userError?.message.length - 3, userError?.message?.length)

    const userData = {
        name: '',
        email: '',
        password: '',
        token: ''
    }

    useEffect(() => {
        return history.listen((location) => {
            dispatch(setResetUserError)
        })
    }, [history, dispatch])

    const { values, handleChange, handleLogin } = useForm(userData);

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (loginRequest) {
        return (
            <Loading />
        );
    }

    return (
        <div className={styles.login}>
            <form
                name='login'
                action='#'
                onSubmit={handleLogin}
                className={styles.form}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Вход</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                />

                {userError && (<p className={`mb-4 text text_type_main-default ${styles.textError}`}>{userErrorCode === '403' ? 'Сессия истекла' : 'Неправильный логин или пароль'} </p>)
                }

                {!user && location.state?.from.pathname.startsWith('/profile/orders') && (<p className={`mb-4 text text_type_main-default ${styles.textError}`}>Войдите чтобы посмотреть заказы пользователя</p>)
                }

                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Войти
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Вы — новый пользователь? &nbsp;
                    <span>
                        <Link to='/register' className={`text text_type_main-default ${styles.link}`}>
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
                <p className={`text text_color_inactive text_type_main-default ${styles.text}`}>Забыли пароль? &nbsp;
                    <span>
                        <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>
                            Восстановить пароль
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}