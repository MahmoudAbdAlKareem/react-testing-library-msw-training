import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SignUp from "./";
import { testUser } from "./constants";
import { getters } from "./getters";
import { fillForm, signUserUp } from "./utils";

describe("SignUp Component", () => {
  /**
   * @group Smoke Tests
   */
  describe("Smoke Tests", () => {
    it("should render correctly", () => {
      render(<SignUp />);

      const signUpHeading = getters.getSignUpHeading();
      const usernameInput = getters.getUsernameInput();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const promotionCheckbox = getters.getPromotionCheckbox();
      const signUpButton = getters.getSignUpButton();
      const signInLink = getters.getSignInLink();

      expect(signUpHeading).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(promotionCheckbox).toBeInTheDocument();
      expect(signUpButton).toBeInTheDocument();
      expect(signInLink).toBeInTheDocument();
    });

    it("should render with correct initial states", () => {
      render(<SignUp />);

      const usernameInput = getters.getUsernameInput();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const promotionCheckbox = getters.getPromotionCheckbox();
      const signUpButton = getters.getSignUpButton();

      expect(usernameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
      expect(promotionCheckbox).not.toBeChecked();
      expect(signUpButton).toBeDisabled();
    });
  });

  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      render(<SignUp />);
      const emailInput = getters.getEmailInput();

      userEvent.type(emailInput, "invalid email");
      userEvent.click(document.body);

      const errorMessage = await screen.findByText(/enter a valid email/i);

      expect(errorMessage).toBeInTheDocument();

      // debug();
    });

    it("should display validation errors for short password", async () => {
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

      signUserUp();

      const successMessage = await screen.findByText(/sign up successfully/i);
      expect(successMessage).toBeInTheDocument();

      // debug();
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

      fillForm();

      await waitFor(() => {
        expect(getters.getSignUpButton()).toBeEnabled();
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

      const promotionCheckbox = getters.getPromotionCheckbox();
      fillForm();
      userEvent.click(promotionCheckbox);

      const { username, email, password } = testUser;
      expect(getters.getUsernameInput()).toHaveValue(username);
      expect(getters.getEmailInput()).toHaveValue(email);
      expect(getters.getPasswordInput()).toHaveValue(password);
      expect(promotionCheckbox).toBeChecked();
    });

    // FIXME: Fails when run with other tests
    it("should redirect user to home page after successful sign up", async () => {
      render(<SignUp />);

      signUserUp();

      await waitForElementToBeRemoved(() =>
        screen.queryByRole("textbox", { name: /user name/i })
      );

      await waitFor(() => {
        expect(screen.getByText(/our latest/i)).toBeInTheDocument();
      });
    });
  });
});
