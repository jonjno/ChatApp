import Conversations from "./Conversations";
import LogOut from "./LogOut";
import SearchInput from "./SearchInput";

const SideBar = () => {
  return (
    <div className='border-r border-l-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      <LogOut />
    </div>
  );
};

export default SideBar;
