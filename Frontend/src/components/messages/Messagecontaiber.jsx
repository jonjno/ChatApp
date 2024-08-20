// import React from 'react'

import { useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInout from "./MessageInout";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext";

const Messagecontaiber = () => {
  const { selectedconversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedconversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span>{" "}
            <span className='text-gray-900 font-bold'>
              {selectedconversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInout />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};

export default Messagecontaiber;
