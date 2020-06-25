import { FETCH_CHAT, SEND_CHAT } from "../action/chat";
import Chat from "../../models/Chats";

const initialState ={
    chats: []
}

export default function chatReducer(state=initialState,action){
    switch(action.type){
        case FETCH_CHAT:
            return {
                chats: action.chat
            }
        case SEND_CHAT:
            const newChat = new Chat(
                action.id,
                action.mailId,
                action.content
            )
            return{
                ...state,
                chats: state.chats.concat(newChat)
            }
        default:
            return state;
    }
}