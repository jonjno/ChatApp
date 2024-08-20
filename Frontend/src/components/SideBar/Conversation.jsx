import useConversation from "../../../zustand/useConversation";

const Conversation = ({ con }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // const { onLineUsers } = useSocketContext();
  // const isOnline = onLineUsers.includes(con._id);

  const isSelected = selectedConversation?._id === con._id;
  console.log(con);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(con)}
      >
        <div className={`avatar online`}>
          <div className='w-12 rounded-full'>
            <img src={con.profilePic} alt='user avatar' />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{con.fullName}</p>
            <span className='text-xl'>😊</span>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0h-1'></div>
    </>
  );
};

export default Conversation;
