"use client";

import {injectStyles, jsonToCss} from "react-phone-hooks/styles";
import commonStyles from "react-phone-hooks/stylesheet.json";

export const injectMergedStyles = () => injectStyles(jsonToCss(commonStyles));
