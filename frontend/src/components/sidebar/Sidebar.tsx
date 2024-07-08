import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <>
      <aside
        className="fixed  top-[80px]
       z-30  hidden h-[calc(100vh-80px)] px-0 pb-12  w-[200px] shrink-0 md:sticky  md:block p-4 "
      >
        <div className="overflow-y-auto h-full p-4">
          <h2 className="text-[30px] mb-4">Tables</h2>
          <SidebarContent />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
