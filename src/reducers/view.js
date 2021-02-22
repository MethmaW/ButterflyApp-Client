const viewReducer = (state = "", action) => {
  switch (action.type) {
    case "VIEW":
      return (state = action.payload);
    default:
      return state;
  }
};

export default viewReducer;
