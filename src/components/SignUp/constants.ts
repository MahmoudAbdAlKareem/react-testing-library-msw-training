import * as yup from "yup";
import { UserForRegistration } from "./types";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const randomUserId = Math.random() * 100000;

export const testUser: UserForRegistration = {
  username: `test user ${randomUserId}`,
  email: `testUser${randomUserId}@email.com`,
  password: "user@123",
};

export const existingUser: UserForRegistration = {
  username: "test",
  email: "test@test.com",
  password: "user@123",
};
