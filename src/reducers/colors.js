const colorsReducer = (state = 0, action) => {
  switch (action.type) {
    case "COLORS":
      return (state = action.payload);
    default:
      return state;
  }
};

export default colorsReducer;
