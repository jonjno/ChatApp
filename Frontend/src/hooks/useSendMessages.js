import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedconversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedconversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;

// const useSendMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedconversation } = useConversation();

//   const sendMessage = async (messages) => {
//     console.log("mwm", messages);
//     setLoading(true);
//     try {
//       console.log("send");
//       const res = await fetch(
//         `/api/messages/send/${selectedconversation._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ messages }),
//         }
//       );

//       console.log("data", res);
//       const data = res.json();
//       if (data.error) throw new Error(data.error);
//       setMessages([...messages, data]);
//     } catch (error) {
//       toast.error(error.messages);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return { loading, sendMessage };
// };

// export default useSendMessages;
