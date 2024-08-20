// import React from 'react'
import { extractTime } from "../../../../Backend/utils/extractfile";
import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const { selectedconversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedconversation?.profilePic;
  const bubblebgColor = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='animal'></img>
        </div>
      </div>
      <div>
        <div
          className={`chat-bubble text-white bg-blue-500  ${bubblebgColor}pb-2`}
        >
          {message.message}
        </div>
        <div className='chat-footer opacity-50 text-xs  text-white flex gap-1 items-center'>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
