import React from "react";

const BackupDataModal = ({ dataBackup, setDataBackup }) => {
  return (
    <div className="modal flex items-center ">
      <div className="relative max-w-sm mx-auto bg-middle-green p-10 rounded-md h-4/6">
        <button
          className="absolute  top-0 right-0"
          onClick={() => setDataBackup(!dataBackup)}
        >
          <img
            src="/close-window-icon.svg"
            alt="close-window"
            title="close-window_"
            className="rounded-tr"
            width="20"
          />
        </button>
        <div className="flex flex-col justify-between items-start  h-full">
          <div className="flex items-center">
            {/* <Image src={deleteUserIcon}/> */}
            <p className="font-bold text-xl ml-2">
              Would you like to Backup Data?
            </p>
          </div>

          <p className="self-center text-center text-lg font-semibold ">
            Are you sure you want <br />
            to Backup Data?
          </p>
          <div className="w-full flex justify-between self-center">
            <button
              className="text-black font-semibold shadow-md bg-[#23D3AA] hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-10 mx-1 my-5"
              // onClick={()=> handleAuthUserDelete()}
            >
              Yes
            </button>
            <button
              className="text-white font-semibold shadow-md bg-black hover:text-white hover:bg-blue-900 cursor-pointer rounded-md p-1 px-10 mx-1 my-5"
              onClick={() => setDataBackup(!dataBackup)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupDataModal;
