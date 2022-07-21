import React from "react";

const BackupDataModal = ({ dataBackup, setDataBackup, messageBackup }) => {
  return (
    <div className="modal flex items-center ">
      <div className="relative max-w-sm mx-auto bg-yellow p-10 rounded-md h-3/6">
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
        <div className="flex flex-col justify-center items-center  h-full">
          <h3 className="font-bold text-xl ml-2 mb-5">{messageBackup}</h3>

          <button
            className="flex items-center justify-around text-black font-semibold shadow-md btn-darkGreen hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-6 mx-1 my-5"
            // onClick={()=> handleAuthUserDelete()}
          >
            <img
              src="./supervisor/key-metrics.svg"
              alt="download backup"
              className="mr-2"
            ></img>
            Download
          </button>
          <p className="self-center text-center text-md font-semibold ">
            To save a copy in your computer
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackupDataModal;
