import { setLocalStorage } from "../actions/auth";

export const initialCart = {
    items: [],
    total: 0
};
export const reducerCart = (state, action) => {
    if (action.type == "ADD") {
        if(Array.isArray(action.payload))
        {
            for (var x = 0; x < action.payload.length; x++)
            {
                state.items=state.items.concat(action.payload[x]);
                state.total=parseFloat(state.total.toFixed(2))+parseFloat((action.payload[x].amount*action.payload[x].realprice).toFixed(2))
            }
            return {
                ...state,
                total:state.total ,
                items: state.items
            }
        }
        for (var x = 0; x < state.items.length; x++) {
            if (state.items[x].book_id === action.payload.book_id) {
                var past = parseInt(state.items[x].amount);
                // var result=past+parseInt(action.payload.amount);
                state.items[x].amount = parseInt(action.payload.amount);
                return {
                    total: parseFloat(state.total) - (past * (parseFloat(action.priceitem) / parseInt(action.payload.amount))) + parseFloat(action.priceitem),
                    items: state.items
                }
            }
        }
        return {
            ...state,
            total: parseFloat(state.total) + parseFloat(action.priceitem),
            items: state.items.concat(action.payload)
        }


    } else if (action.type == "UPDATE") {
        let temp=0;
        state.items.map((book, i) => {
            if (book.book_id == action.payload._id) {
                book.amount = parseInt(action.payload.amount)
            }
            temp += book.amount*book.realprice
        })
     
      return{
          ...state,
          total:temp
      }
    }
    else if (action.type == "CANCEL") {

        return {
            total: 0,
            items: []
        };
    }
    else if (action.type == "DROP") {
        if(state.items.length==1)
        localStorage.setItem("cart",[]);
       return { 
           ...state,
           items: state.items.filter(item => item.book_id !== action.payload), 
           total: parseFloat(state.total) - parseFloat(action.priceitem) }
    }
    else {
        return state;
    }

}