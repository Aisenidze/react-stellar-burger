import { useEffect, useRef, useState } from 'react';
import styles from './ResetPassword.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RequestResetPassword } from '../../services/ResetPassword/ResetPassword';
import cn from 'classnames';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState("");
  const [value, setValue] = useState('');
  const forgotPage = useSelector(state => state.forgotpassword);
  const { error, success } = useSelector(state => state.resetpassword);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      RequestResetPassword({
        token: e.target.token.value,
        password: e.target.password.value,
      })
    );
  };

  useEffect(() => {
    if (!forgotPage?.success) {
      navigate('/forgot-password');
    }
  }, [forgotPage?.success, navigate]);

  useEffect(() => {
    if (success) navigate('/')
  }, [success, navigate]);

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <div className='mt-6'>
          <PasswordInput
            onChange={(e) => setPasswordValue(e.target.value)}
            type='password'
            placeholder={'Введите новый пароль'}
            icon={'ShowIcon'}
            value={passwordValue}
            name={'password'}
            />
        </div>
        {error && <h4 className={cn({
          [styles.errorVisible]: error,
        })}>{error}</h4>}
        <div className='mt-6 mb-6'>
          <Input type='text' placeholder={'Введите код из письма'}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={'token'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
          />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Сохранить</Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
          Вспомнили пароль?
          <Link to='/login' className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
      </form>
    </main >
  )
};
