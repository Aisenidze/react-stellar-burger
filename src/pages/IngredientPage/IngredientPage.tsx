import styles from './IngredientPage.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useNavigate, useParams } from 'react-router';
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../hooks/typeHook';

export const IngredientPage: FC = () => {
    const navigate = useNavigate();
    const {buns} = useAppSelector(state => state.buns);
    const { idIngr } = useParams();
    const bun = buns?.data.find((item) => item._id === idIngr);

    useEffect(() => {
        if (!bun) navigate('/');
    }, [bun, navigate])

    return (
        <>
            {bun && <div className={styles.main}>
                <IngredientDetails item={bun}/>
            </div>}
        </>
    )
};
