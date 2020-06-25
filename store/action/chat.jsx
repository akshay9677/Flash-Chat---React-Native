import axios from 'axios';
import Chat from '../../models/Chats';

export const FETCH_CHAT = 'FETCH_CHAT';
export const SEND_CHAT = 'SEND_CHAT'

export function fetchChat(){
    return async dispatch=>{
        const response = await axios.get('https://shops-b668b.firebaseio.com/chat.json')
    
        const resData = await response;
        const loadedChat = [];

        for(const key in resData.data){
            loadedChat.push(new Chat(key,
                resData.data[key].sender,
                resData.data[key].text
                ))
         }
        

        dispatch({type:FETCH_CHAT,chat: loadedChat});
    }
}

export function sendChat(sender,text){
    return async (dispatch,getState)=>{

        console.log(getState());
        const token = getState().auth.userId;
        const response = await axios.post(`https://shops-b668b.firebaseio.com/chat.json?auth=${token}`,JSON.stringify({
            sender,
            text
        }))
    
        const resData = await response;
    
        dispatch({
          type: SEND_CHAT,
          chatData: {
              id:resData.data.id,
              mailId:resData.data.sender,
              content:resData.data.text
          }
        });


    }
   
}