import styles from './IngredientPage.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

export function IngredientPage() {
    const navigate = useNavigate();
    const {buns} = useSelector(state => state.buns);
    const { idIngr } = useParams();
    const bun = buns.data.find((item) => item._id === idIngr);

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
}