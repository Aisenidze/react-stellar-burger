import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import { deleteIngredientThunk, moveIngredientThunk } from "../../../services/ConstructorSlice/ConstructorSlice";
import { FC, useRef } from "react";
import { useAppDispatch } from "../../../hooks/typeHook";
import { BunsData } from "../../../services/AppSlice/AppSlice";

interface BurgerIngredientProps {
  ingredients: BunsData,
  indexof: "top" | "bottom" | '',
  elementIndex?: number
}

const BurgerMain: FC<BurgerIngredientProps> = (props) => {
  const { ingredients, indexof, elementIndex } = props;
  const name = indexof === 'top' ? ' (вверх)': indexof === 'bottom' ? ' (низ)' : indexof

  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const moveCard = (start: number, end: number) => {
    dispatch(moveIngredientThunk({ start, end }))
  }

  const [, drop] = useDrop({
    accept: 'item',

    hover(item: { elementIndex: number, id: string }, monitor: any) {
      if(!ref?.current) return;

      const dragIndex = item.elementIndex
      const hoverIndex: number | null = elementIndex || 0

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref?.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      
      moveCard(dragIndex, hoverIndex)

      item.elementIndex = hoverIndex;
    },
  })

  const [, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id: ingredients.id, elementIndex }
    },
  })
  drag(drop(ref))

  return (
    <>
      {(!!indexof) ? 
        <div>
        <ConstructorElement
          type={indexof}
          isLocked={!!indexof}
          text={ingredients.name + name}
          price={ingredients.price}
          thumbnail={ingredients.image}
          handleClose={() => dispatch(deleteIngredientThunk({elementIndex}))}
        />
      </div>
      :
      <div ref={ref}>
        <DragIcon type='primary' />
        <ConstructorElement
          type={indexof ? indexof : undefined}
          isLocked={!!indexof}
          text={ingredients.name + name}
          price={ingredients.price}
          thumbnail={ingredients.image}
          handleClose={() => dispatch(deleteIngredientThunk({elementIndex}))}
        />
      </div>
      }
    </>
  )
}

export default BurgerMain;
