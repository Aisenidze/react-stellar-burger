/* eslint-disable testing-library/await-async-utils */
/* eslint-disable import/first */
export {};
import { BASE_URL } from "../../src/utils/utils";

describe("service is available", () => {
  beforeEach(() => {
    cy.viewport(1920, 1024);
  });
  it("should be available on localhost:3000", () => {
    cy.visit("/");
  });
  it("should open constructor page by default", () => {
    cy.contains("Соберите бургер");
  });

  it("should open ingredient details", () => {
    cy.visit("/");
    cy.get("[class^=BurgerIngredient_card]").first().click();
  });

  it("should close ingredient details by button", () => {
    cy.get("[class^=Modal_modal__closeButton]").click();
    cy.visit("/");
  });

  it("should scroll", () => {
    cy.get("[class^=BurgerIngredients_ingredients__content]").scrollTo(0, 500);
  });

  it("should dragndrop bun", () => {
    cy.get("[class^=BurgerIngredient_card__IRqlw]")
      .first()
      .drag("[class^=BurgerConstructor_form]");
    cy.get("[class^=BurgerIngredient_card__IRqlw]")
      .eq(2)
      .drag("[class^=BurgerConstructor_form]");
  });

  it("should dragndrop bun third element", () => {
    cy.get("[class^=BurgerIngredient_card__IRqlw]")
      .eq(4)
      .drag("[class^=BurgerConstructor_form]");
  });

  it("should delete constructor-element", () => {
    cy.get("[class^=constructor-element__action]").eq(2).click();
    cy.get("[class^=BurgerConstructor_burgerConstructor__listitem]")
      .eq(2)
      .and("not.exist");
  });
  it("should dragndrop bun third element", () => {
    cy.get("[class^=BurgerIngredient_card__IRqlw]")
      .eq(3)
      .drag("[class^=BurgerConstructor_form]");
  });
  it("should dragndrop constructor-element", () => {
    cy.get("[class^=Ingredient_ingredient__0dokv]")
      .eq(0)
      .drag("[class^=Ingredient_ingredient__0dokv]");
    cy.get("[class^=Ingredient_ingredient__0dokv]")
      .eq(1)
      .drag("[class^=Ingredient_ingredient__0dokv]");
  });
  it("should open auth", () => {
    cy.get("[class^=BurgerConstructor_burgerConstructor__link]")
      .contains("войти")
      .click();
  });

  it("should type email and password", () => {
    cy.get("input").first().type("aisen.ivanov@mail.ru");
    cy.get("input").last().type("testtest1");
  });
  it("should autorization and open order details", () => {
    cy.get("button").contains("Войти").click();
    cy.request({
      method: "POST",
      url: `${BASE_URL}/auth/login`,
      body: {
        email: "aisen.ivanov@mail.ru",
        password: "testtest1",
      },
    })
      .as("loginResponse")
      .then((response) => {
        Cypress.env("token", response.body.accessToken);
        return response;
      })
      .its("status")
      .should("eq", 200);

    cy.get("button").contains("Оформить заказ").click();
  });
  it("should request order details", () => {
    const authorization = `${Cypress.env("token")}`;

    cy.request({
      method: "POST",
      url: `${BASE_URL}/orders`,
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
      body: JSON.stringify({
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0943"],
      }),
    })
      .then((response) => {
        return response;
      })
      .its("status")
      .should("eq", 200);
  });
  it("close order details", () => {
    cy.get("[class^=Modal_modal__closeButton]").click();
  });
});
