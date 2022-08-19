const AuthReducer = (state: any, action: any): any => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload,
            }
        }
        case "LOGOUT": {
            return {
                currentUser: null,
            }
        }
        default:
            return state;
    }
};

export default AuthReducer;