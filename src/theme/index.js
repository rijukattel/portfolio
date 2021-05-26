import colors from "./colors.json";

import variables from "./variables.json";

const { theme: themeValues } = colors;
const themeVar = {
  ...themeValues,
  ...variables,
};

console.log(`object`, themeValues["light"].textColor);

export default themeVar;
