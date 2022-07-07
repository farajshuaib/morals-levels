import { createStore } from "easy-peasy";
import MoralsModel from "./moralsModal";

export const store = createStore({ morals: MoralsModel, users: {} });
