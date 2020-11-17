
export const initialUser =localStorage.getItem("user")||null

export const reducerUser = (state, action) => {
    if (action.type == "LOGIN") {
        return action.payload;
    }
     if (action.type == "UPDATE"){
        return{
            ...state,
            likes: action.payload.likes
        };
    }
    if(action.type== "LOGOUT"){
       return {};
    }
    return state;
}