import { useDispatch, useSelector } from 'react-redux';
import styles from './Autorization.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SendAutorizationData } from '../../services/AutorizationSlice/AutorizationSlice';
import { useEffect, useRef, useState } from 'react';


export function AutorizationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { success } = useSelector((state) => state.autorization)
  const inputRef = useRef(null);
  const login = JSON.parse(sessionStorage.getItem('login'));
  const fromPage = location.state?.from?.pathname !== '/login' ? location.state?.from?.pathname : '/'

  const handleSubmit = (e) => {
    e.preventDefault();
    const{email, password} = e.target;
    dispatch(SendAutorizationData({
      email: email.value,
      password: password.value
    }));
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  useEffect(() => {
    if (login && success) navigate(fromPage);
  }, [login, navigate, fromPage, success]);

  return(
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
        <div className='mt-6'>
          <Input
            type='email'
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'} />
          </div>
          <div className='mt-6 mb-6'>
            <PasswordInput
              onChange={e => setPassword(e.target.value)}
              type='password'
              placeholder={'Пароль'}
              value={password}
              name={'password'}
            />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Войти</Button>
      </form>
      <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
        Вы - новый пользователь?
        <Link to='/register' className={`${styles.link} ml-2`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.text} text text_type_main-default`}>
        Забыли пароль?
        <Link to='/forgot-password' className={`${styles.link} ml-2`}>
          Восстановить пароль
        </Link>
      </p>
    </main >
)
}