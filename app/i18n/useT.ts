'use client';

import { useStore } from "../store/useStore";
import { getDict } from "./index";

export const useT = () => getDict(useStore((s) => s.lang));
