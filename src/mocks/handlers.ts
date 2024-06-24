import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/hack your URL", () => {
    return HttpResponse.json({});
  }),
];
