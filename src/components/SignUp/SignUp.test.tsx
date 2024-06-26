import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { debug } from "jest-preview";
import React, { act } from "react";
import SignUp from "./";
import { getters } from "./getters";
import { existingUser, testUser } from "./constants";
import { UserForRegistration } from "./types";

const fillForm = (user?: UserForRegistration) => {
  user = user || testUser;

  const { username, email, password } = user;

  const userNameInput = getters.getUsernameInput();
  const emailInput = getters.getEmailInput();
  const passwordInput = getters.getPasswordInput();

  userEvent.type(userNameInput, username);
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
};

const signUserUp = async (withSuccess: boolean = true) => {
  const signUpButton = getters.getSignUpButton();

  fillForm(withSuccess ? testUser : existingUser);

  userEvent.click(signUpButton);
};
describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async() => {
      render(<SignUp />);
      const emailInput = getters.getEmailInput();

      userEvent.type(emailInput, "invalid email");
      userEvent.click(document.body);

      const errorMessage = await screen.findByText(/enter a valid email/i);

      expect(errorMessage).toBeInTheDocument();

      // use jest preview to debug your test
      // eslint-disable-next-line testing-library/no-debugging-utils
      debug();
    });

    it("should display validation errors for short password", async() => {
      render(<SignUp />);
      const passwordInput = getters.getPasswordInput();

      userEvent.type(passwordInput, "short");
      userEvent.click(document.body);

      const errorMessage = await screen.findByText(
        /password should be of minimum 8 characters length/i
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      render(<SignUp />);

      // await act(async () => {
      signUserUp();
      // });

      const successMessage = await screen.findByText(/sign up successfully/i);
      expect(successMessage).toBeInTheDocument();

      // eslint-disable-next-line testing-library/no-debugging-utils
      debug();
    });

    it("should display error message on sign-up failure", async () => {
      render(<SignUp />);

      signUserUp(false);

      const errorMessage = await screen.findByText(/error signing up/i);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      render(<SignUp />);

      await signUserUp();

      await waitFor(() => {
        expect(getters.getSignUpButton).toBeEnabled();
      });
    });

    // FIXME: Not convened with the waitFor in this code
    it("should disable Sign Up button when form is invalid", async () => {
      render(<SignUp />);

      fillForm({
        ...testUser,
        password: "short",
      });

      const signUpButton = getters.getSignUpButton();

      await waitFor(() => {
        expect(signUpButton).toBeDisabled();
      });

      // debug();
    });

    it("should update form fields on user input", async () => {
      render(<SignUp />);

      const { username, email, password } = testUser;

      fillForm();

      expect(getters.getUsernameInput).toHaveValue(username);
      expect(getters.getEmailInput).toHaveValue(email);
      expect(getters.getPasswordInput).toHaveValue(password);
    });

    it("should redirect user to home page after successful sign up", async () => {
      render(<SignUp />);

      signUserUp();

      await waitForElementToBeRemoved(getters.getUsernameInput);

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: /our latest products/i })
        ).toBeInTheDocument();
      });
    });
  });
});
