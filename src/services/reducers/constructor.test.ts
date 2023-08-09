import reducer, {
  constructorState,
  addIngredient,
  moveIngredient,
  removeIngredient,
} from "./constructorReducer";
import {
  bun,
  dragIndex,
  hoverIndex,
  item,
  secondItem,
} from "../../utils/test-constants";

describe("constructor reducer test", () => {
  it("should handle addIngredient if bun", () => {
    const action = addIngredient(bun);

    expect(reducer(constructorState, action)).toEqual({
      ...constructorState,
      bun,
    });
  });
  it("should handle addIngredient if another ingredient", () => {
    const action = addIngredient(item);

    expect(reducer(constructorState, action)).toEqual({
      ...constructorState,
      ingredients: [...constructorState.ingredients, item],
    });
  });
  it("should handle moveIngredient", () => {
    const action = moveIngredient({
      dragIndex,
      hoverIndex,
    });

    expect(
      reducer(
        {
          ...constructorState,
          ingredients: [item, secondItem, item],
        },
        action
      )
    ).toEqual({
      ...constructorState,
      ingredients: [item, item, secondItem],
    });
  });
  it("should handle removeIngredient", () => {
    const action = removeIngredient(1);

    expect(
      reducer(
        {
          ...constructorState,
          ingredients: [item, secondItem, item],
        },
        action
      )
    ).toEqual({
      ...constructorState,
      ingredients: [item, item],
    });
  });
});
