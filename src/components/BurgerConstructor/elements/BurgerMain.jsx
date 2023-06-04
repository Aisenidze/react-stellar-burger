import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteIngredientThunk, moveIngredientThunk } from "../ConstructorSlice";
import { useRef } from "react";

const BurgerMain = (props) => {
  const { ingredients, indexof, index } = props;
  const name = indexof === 'top' ? ' (вверх)': indexof === 'bottom' ? ' (низ)' : indexof

  const ref = useRef(null)
  const dispatch = useDispatch()

  const moveCard = (start, end) => {
    dispatch(moveIngredientThunk({ start, end }))
  }

  const [, drop] = useDrop({
    accept: 'item',

    hover(item, monitor) {
      if(!ref.current) return;

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex;
    },
  })

  const [, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id: ingredients.id, index }
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
          handleClose={() => dispatch(deleteIngredientThunk({index}))}
        />
      </div>
      :
      <div ref={ref}>
        <DragIcon type='primary' />
        <ConstructorElement
          type={indexof}
          isLocked={!!indexof}
          text={ingredients.name + name}
          price={ingredients.price}
          thumbnail={ingredients.image}
          handleClose={() => dispatch(deleteIngredientThunk({index}))}
        />
      </div>
      }
    </>
  )
}

export default BurgerMain;

BurgerMain.propTypes = {
  ingredients: PropTypes.object.isRequired,
  indexof: PropTypes.string.isRequired,
}
