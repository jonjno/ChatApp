// import React from 'react'

import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessages.js";
import MessageSkeleton from "../skeletons/Messageskeletons";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessages();

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading &&
        messages.length > 0 &&
        messages.map((mes) => {
          // Ensure mes is not undefined and has _id
          if (mes && mes._id) {
            return <Message key={mes._id} message={mes} />;
          } else {
            console.warn("Invalid message item:", mes);
            return null;
          }
        })}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
