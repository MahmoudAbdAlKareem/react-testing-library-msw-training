import userEvent from "@testing-library/user-event";
import { existingUser, testUser } from "./constants";
import { getters } from "./getters";
import { UserForRegistration } from "./types";

export const fillForm = (user?: UserForRegistration) => {
  user = user || testUser;

  const { username, email, password } = user;

  const userNameInput = getters.getUsernameInput();
  const emailInput = getters.getEmailInput();
  const passwordInput = getters.getPasswordInput();

  userEvent.type(userNameInput, username);
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
};

export const signUserUp = async (withSuccess: boolean = true) => {
  const signUpButton = getters.getSignUpButton();

  fillForm(withSuccess ? testUser : existingUser);

  userEvent.click(signUpButton);
};
