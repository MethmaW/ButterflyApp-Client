const sizesReducer = (state = [], action) => {
  switch (action.type) {
    case "SIZES":
      return (state = action.payload);
    default:
      return state;
  }
};

export default sizesReducer;
