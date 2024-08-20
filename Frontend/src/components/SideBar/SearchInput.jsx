import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../../zustand/useConversation.js";
import toast from "react-hot-toast";
import useGetConversation from "../../hooks/useGetConversations.js";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = (e) => {
    console.log("yyyy");
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const convo = conversation.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (convo) {
      setSelectedConversation(convo);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search '
        className='input input-borded rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <FaSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
