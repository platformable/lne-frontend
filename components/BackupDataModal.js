import React, {useState, useEffect } from "react";
import Loader from "./Loader"
import axios from "axios";

const BackupDataModal = ({ dataBackup, setDataBackup }) => {
  const [messageBackup, setMessageBackup] = useState("");
  const [backupSuccess, setBackupSuccess] = useState(false)
  const [downloadBackupFileURL, setDownloadBackupFileURL] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");


  const downloadFileFromDropbox = async(filePath, token) => {
  
    const dropbox_file_path = {
        path: filePath,
    }
   
    const response = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Dropbox-API-Arg": JSON.stringify(dropbox_file_path)
      }
    })
    const data = await response.text()
    const blob = new Blob([data], {type: "application/octet-stream"})
    const href = URL.createObjectURL(blob)
    setDownloadBackupFileURL(href)
    
  }
  const doBackUpData = async () => {  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/backup`);
      const data = await response.json();
      
      await downloadFileFromDropbox(data.path_display, data.access_token);

      setDownloadFileName(data.file_name)
      setMessageBackup("Backup saved to Dropbox");
      setBackupSuccess(!backupSuccess)
      
    } catch (error) {
      console.error(error)
      setMessageBackup("Error: Can't perform backup");
    } 
  };

  useEffect(()=> {
    doBackUpData()
  }, [])

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
          <h3 className="font-bold text-xl ml-2 mb-5">{messageBackup || "Backup to dropbox"}</h3>
          {!backupSuccess ?  
         (<>
          <Loader />
          <p className="text-center text-sm mt-5">This action can take approximately 1 minute</p>
         </>) :
          (
          <>
          <a href={downloadBackupFileURL} download={downloadFileName}>
          <button
            className="flex items-center justify-around text-black font-semibold shadow-md btn-darkGreen hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-6 mx-1 my-5"
          
          >
            <img
              src="./supervisor/software/download-icon.svg"
              alt="download backup"
              className="mr-2"
            ></img>
            Download
          </button>
          </a>
          
          <p className="self-center text-center text-md font-semibold ">
            To save a copy in your computer
          </p>
          </>
          ) }
        </div>
      </div>
    </div>
  );
};

export default BackupDataModal;
