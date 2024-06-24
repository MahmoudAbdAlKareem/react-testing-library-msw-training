import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Setting up the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());