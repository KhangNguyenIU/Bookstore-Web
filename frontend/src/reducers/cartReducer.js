export const initialCart={
    items:[],
    total:0
};
export const reducerCart=(state,action)=>{
    if(action.type=="ADD")
    {
        for(var x=0;x<state.items.length;x++)
        {
           if(state.items[x].book_id===action.payload.book_id)
           {
               var past=parseInt(state.items[x].amount);
              // var result=past+parseInt(action.payload.amount);
               state.items[x].amount=parseInt(action.payload.amount);
               return { 
                total:parseFloat(state.total)-(past*(parseFloat(action.priceitem)/parseInt(action.payload.amount)))+parseFloat(action.priceitem),
                items: state.items
            }
              
           }
        }
        return { 
            total:parseFloat(state.total)+parseFloat(action.priceitem),
            items: state.items.concat(action.payload)
        }

    }
    else if(action.type=="CANCEL")
    {
     
        return {
            total:0,
            items:[]
        };
    }
    else if(action.type=="DROP")
    {
        return {items:state.items.filter(item => item.book_id !== action.payload),total:parseFloat(state.total)-parseFloat(action.priceitem)}
    }
    else{
        return state;
    }

}