import styles from './Profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getUserInfoThunk, patchUserInfoThunk } from '../../services/UserSlice/UserSlice';
import { LogoutUserThunk } from '../../services/AutorizationSlice/AutorizationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typeHook';

export const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();
    const currentName = useAppSelector(state => state?.autorization?.user?.name) || '';
    const currentEmail = useAppSelector(state => state?.autorization?.user?.email) || '';
    const match = useLocation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState({
        name: currentName,
        email: currentEmail,
        password: '',
    });
    const render = data.name !== currentName || data.email !== currentEmail || data.password.length > 0

    const options = {
        name: 'name',
        error: false,
        ref: inputRef,
        onIconClick: () => onIconClick(),
        errorText: 'Ошибка',
        extraClass: 'ml-1'
    }

    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
    }

    const saveInfo = (e: any) => {
        e.preventDefault();
        const { email, name, password } = data;
        dispatch(patchUserInfoThunk({ email, name, password }));
        setData({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }

    const cancelChanges = () => {
        setData({
            name: '',
            email: '',
            password: ''
        })
    }

    const logoutUser = useCallback(() => {
        dispatch(LogoutUserThunk());
        sessionStorage
            .setItem('login', JSON.stringify(false));
    }, [dispatch])

    
    useEffect(() => {
        setData({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }, [currentEmail, currentName])

    useEffect(() => {
        dispatch(getUserInfoThunk());
    }, [dispatch]);

    return (
        <main className={styles.main}>
        <nav className={`${styles.nav} mr-15`}>
            <NavLink
                to={'/profile'}
                className={match.pathname==='/profile' ? `${styles.active} ${styles.tab}` : styles.tab}
                >
                <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
            </NavLink>
            <NavLink
                to={'/profile/orders'}
                className={match.pathname==='/profile/orders' ? `${styles.active} ${styles.tab}` : styles.tab}
                >
                <h3 className='text text_type_main-medium mb-8'>История заказов</h3>
            </NavLink>
            <NavLink
                to={'/login'}
                className={match.pathname==='/login' ? `${styles.active} ${styles.tab}` : styles.tab}>
                <h3 onClick={logoutUser} className='text text_type_main-medium mb-4'>Выход</h3>
            </NavLink>
            <p className={`${styles.text} mt-20`}>В этом разделе вы можете
                изменять свои персональные данные</p>
        </nav>
        <section className={styles.section}>
            <form className={styles.section} onSubmit={saveInfo}>
                <div className='mt-6'>
                    <Input
                        type='text'
                        placeholder={'Имя'}
                        icon={'EditIcon'}
                        onChange={e => setData({ ...data, name: e.target.value })}
                        value={data.name}
                        {...options}
                    />
                </div>
                <div className='mt-6'>
                    <Input type='email' placeholder={'Логин'} icon={'EditIcon'}
                        onChange={e => setData({ ...data, email: e.target.value })}
                        value={data.email}
                        {...options} />
                </div>
                <div className='mt-6 mb-6'>
                    <Input type='password' placeholder={'Пароль'} icon={'EditIcon'}
                        onChange={e => setData({ ...data, password: e.target.value })}
                        value={data.password}
                        {...options} />
                </div>
                {render ? <div className={styles.box}>
                    <div className={styles.button}><Button
                        onClick={cancelChanges}
                        htmlType='button'
                        type='primary'
                        size='medium'>Отмена
                    </Button></div>
                    <div className={styles.button}><Button
                        htmlType='submit'
                        type='primary'
                        size='medium'>Сохранить
                    </Button></div>
                </div> : null}
            </form>
        </section >
    </main>
    )
}