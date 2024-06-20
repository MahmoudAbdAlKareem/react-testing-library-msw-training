import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextDecoder, TextEncoder } from "util";
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
