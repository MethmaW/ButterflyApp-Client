const viewReducer = (state = "LOGIN", action) => {
  switch (action.type) {
    case "VIEW":
      return (state = action.payload);
    default:
      return state;
  }
};

export default viewReducer;
