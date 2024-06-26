import { testUser } from "../components/SignUp/constants";
import { SignUpResponse } from "./types";

export const mockedUserResponse : SignUpResponse = {
  id: testUser.username.split(" ")[-1],
  username: testUser.username,
  email: testUser.email,
  bio: null,
  image: "https://via.placeholder.com/150",
  token: "token",
};
