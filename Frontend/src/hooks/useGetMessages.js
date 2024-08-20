import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessages, selectedconversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setloading(true);
      try {
        const res = await fetch(`/api/messages/${selectedconversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        toast.error(error.messages);
      } finally {
        setloading(false);
      }
    };
    if (selectedconversation?._id) getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedconversation?._id]);

  return { messages, loading };
};

export default useGetMessages;
