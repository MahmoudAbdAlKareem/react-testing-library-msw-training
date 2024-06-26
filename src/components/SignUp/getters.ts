import { screen } from "@testing-library/react";

export const getters = {
  getUsernameInput: () => screen.getByRole("textbox", { name: /user name/i }),
  getEmailInput: () => screen.getByRole("textbox", { name: /email address/i }),
  getPasswordInput: () => screen.getByLabelText(/password/i),
  getPromotionCheckbox: () =>
    screen.getByRole("checkbox", {
      name: /yes, i want to receive inspiration, marketing promotions and updates via email\./i,
    }),
  getSignUpButton: () => screen.getByRole("button", { name: /sign up/i }),
};
