import { addDataActionType } from './../actionTypes/contactTypes';

const INITIAL_STATE = {
           listData:[],
}

const contactReducer = (state = INITIAL_STATE, action) =>{
   
    switch(action.type) {
       case addDataActionType.ADD_DATA:
           { 
             return {
                 ...state,
                 listData: action.payload,
             }
          }
          case addDataActionType.CREATE_DATA:
            { 
              return {
                  ...state,
                  listData: [...state.listData,action.payload]
              }
           }
          case addDataActionType.UPDATE_DATA:
            { 
                const index = state.listData.findIndex(el => el.id === action.payload.id );
              return {
                  ...state,
                  listData:state.listData.map((content, i) => 
                   i === index ? { ...content, ...action.payload } : content
                  )
              }
           }

           case addDataActionType.DELETE_DATA:
               {
                const newstate = state.listData.filter(
                    el => el.id !== action.payload
                  );
                   return {
                       ...state,
                      listData:newstate
                   }
               }
       default:   
             return state;
    }
} 

export default contactReducer;