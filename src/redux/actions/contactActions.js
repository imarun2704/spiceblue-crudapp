import { addDataActionType } from './../actionTypes/contactTypes';

export const setAddData = (payload) => ({
 
    type: addDataActionType.ADD_DATA,
    payload: payload

});
export const updateData = (payload) => ({
 
    type: addDataActionType.UPDATE_DATA,
    payload: payload

});
export const deleteData = (payload) => ({
 
    type: addDataActionType.DELETE_DATA,
    payload: payload

});