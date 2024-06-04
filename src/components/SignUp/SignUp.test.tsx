import React from "react";
import { render } from "@testing-library/react";
import { setupServer } from "msw/node";
import SignUp from "./";
import { handlers } from "./handlers";
import { debug } from "jest-preview";
// Setting up the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      render(<SignUp />);
      // use jest preview to debug your test
      debug();
    });

    it("should display validation errors for short password", async () => {
      render(<SignUp />);
    });

    it("should display success message on successful sign-up", async () => {
      render(<SignUp />);
    });

    it("should display error message on sign-up failure", async () => {
      render(<SignUp />);
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      render(<SignUp />);
    });

    it("should disable Sign Up button when form is invalid", async () => {
      render(<SignUp />);
    });

    it("should update form fields on user input", async () => {
      render(<SignUp />);
    });

    it("should redirect user to home page after successful signup", async () => {
      render(<SignUp />);
    });
  });
});
