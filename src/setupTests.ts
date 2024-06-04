import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
