const dealsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUOTES':
            return action.payload;
        default:
            return state;
    }
};

export default dealsReducer;