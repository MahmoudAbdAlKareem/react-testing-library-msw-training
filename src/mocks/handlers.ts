import { http, HttpResponse } from "msw";
import { existingUser } from "../components/SignUp/constants";
import { mockedUserResponse } from "./data";
import { SignUpResponse } from "./types";

export const handlers = [
  http.post("*/users", async ({ request }) => {
    const requestBody = (await request.json()) as SignUpResponse;

    const { username } = requestBody;

    if (username === existingUser.username) {
      return HttpResponse.json(
        { errors: "failed to create user" },
        { status: 400 }
      );
    }
    return HttpResponse.json(mockedUserResponse, { status: 200 });
  }),
];
