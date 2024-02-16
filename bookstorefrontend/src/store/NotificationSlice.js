const { createSlice } = require("@reduxjs/toolkit");


const NotificationSlice = createSlice({
name: 'notification',
initialState: {
    message:'',
    type:'',
    visible:false,

}
,reducers: {

    showNotification:(state,action)=>{

        state.message = action.payload.message;
        state.type = action.payload.type;
        state.visible=true;


  

    }
    ,
    hideNotification:(state,action)=>{

            state.message = '',
            state.type = '',
            state.visible = false;


    },



},




})

export const actions  = NotificationSlice.actions;
export default NotificationSlice.reducer;



