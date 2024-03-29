import { useRef, useCallback, FC } from "react";
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TIngredient,
  useAppDispatch,
  useAppSelector,
} from "../../../services/types";
import {
  moveIngredient,
  removeIngredient,
} from "../../../services/reducers/constructorReducer";
import styles from "./Ingredient.module.css";

interface IIngredientProps {
  position: TIngredient;
  index: number;
  id?: string;
}

interface TItem {
  index: number;
  type: string;
  id: string;
}

export const Ingredient: FC<IIngredientProps> = ({ position, index, id }) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useAppDispatch();
  const burgerConstructor = useAppSelector((store) => store.burgerConstructor);

  const handleDeleteIngredient = (ingredient: TIngredient) => {
    const index = Array.from(burgerConstructor.ingredients).indexOf(ingredient);
    dispatch(removeIngredient(index));
  };

  const changeTargetPlace = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const [, drop] = useDrop<
    TItem,
    unknown,
    { item: TItem; handlerId: string | symbol | null }
  >({
    accept: "ingredientConstructor",
    collect(monitor) {
      return {
        item: monitor.getItem(),
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect() || {
        bottom: 0,
        top: 0,
      };
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      changeTargetPlace(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "ingredientConstructor",
    item: () => {
      return { id, index, position };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={styles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={position?.name}
        price={position?.price}
        thumbnail={position?.image}
        handleClose={() => handleDeleteIngredient(position)}
      />
    </li>
  );
};
