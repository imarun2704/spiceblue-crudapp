import { addDataActionType } from './../actionTypes/contactTypes';

const INITIAL_STATE = {
           contactListData:[],
}

const contactReducer = (state = INITIAL_STATE, action) =>{
    console.log(action.payload,'1111111red')
    switch(action.type) {
       case addDataActionType.ADD_DATA:
           { 
             return {
                 ...state,
                 contactListData: [...state.contactListData,action.payload]
             }
          }
          case addDataActionType.UPDATE_DATA:
            { 
                const index = state.contactListData.findIndex(el => el.id === action.payload.id );
              return {
                  ...state,
                  contactListData:state.contactListData.map((content, i) => 
                   i === index ? { ...content, ...action.payload } : content
                  )
              }
           }

           case addDataActionType.DELETE_DATA:
               {console.log('delete reducers ', action.payload)
                const newstate = state.contactListData.filter(
                    el => el.id !== action.payload
                  );
                   return {
                       ...state,
                        contactListData:newstate
                   }
               }
       default:   
             return state;
    }
} 

export default contactReducer;