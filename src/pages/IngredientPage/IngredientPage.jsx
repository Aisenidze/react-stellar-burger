import styles from './IngredientPage.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

export function IngredientPage() {
    const navigate = useNavigate();
    const {buns} = useSelector(state => state.buns);
    const { id } = useParams();
     (id)
     (buns)
    const bun = buns.data.find((item) => item._id === id);
    if (!bun) {
        return navigate('/')
    }
    return (
        <div className={styles.main}>
        <IngredientDetails 
        item={bun}
        />
        </div>
    )
}