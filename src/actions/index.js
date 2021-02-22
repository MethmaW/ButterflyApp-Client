export const changeView = (view) => {
  return {
    type: "VIEW",
    payload: view,
  };
};

export const changeResults = (result) => {
  return {
    type: "RESULTS",
    payload: result,
  };
};

export const changeColors = (color) => {
  return {
    type: "COLORS",
    payload: color,
  };
};

export const changeSizes = (size) => {
  return {
    type: "SIZES",
    payload: size,
  };
};
