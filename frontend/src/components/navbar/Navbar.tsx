const Navbar = () => {
  return (
    <>
      <header className="sticky   mx-auto top-0 z-50  border-border/40  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" px-4 flex h-20 gap-4 items-center">
          <button className="group transition duration-200 ease-in-out  rounded-[8px] bg-[#ede7f6;] hover:bg-[#5e35b1;] hover:g flex justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu w-[20px ] transition duration-200 ease-in-out text-[#5e35b1;] group-hover:text-[#ede7f6;]"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <h2 className="">Header</h2>
        </div>
      </header>
    </>
  );
};

export default Navbar;
