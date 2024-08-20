import useGetConversations from "../../hooks/useGetConversations.js";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversations();
  console.log("con", conversation);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversation.map((convo) => (
        <Conversation con={convo} key={convo._id} />
      ))}
      {loading ? (
        <span className='loading loading-spinner mx-auto'></span>
      ) : null}
    </div>
  );
};

export default Conversations;
