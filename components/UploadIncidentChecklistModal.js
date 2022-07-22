import { useState } from "react";
import Loader from "./Loader";


const UploadIncidentChecklistModal = ({setUploadIncidentModal}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState("")
    
    const onSubmitFile = async(e) => {
        e.preventDefault()
    
        setLoading(true)

        const form = new FormData();
        const blob = new Blob([file], {
            type: "text/plain"
        })
        form.append('file', blob);  
        const fileFormat= fileName.split(".")[1];

        const dateNow = JSON.stringify(new Date());
       
        const headerDataForUpload = {
            "autorename": false,
            "mode": "add",
            "mute": false,
            "path": `/uploads/incident_response_checklist_${dateNow}.${fileFormat}`,
            "strict_conflict": false
        };
        
        try {
            const tokenResponse = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/access_token`)
            const token = await tokenResponse.json()
            const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`,
                    "Content-Type":"application/octet-stream",
                    'Dropbox-API-Arg': JSON.stringify(headerDataForUpload),
              },
              body: blob

            })
            setLoading(false)

            if(response.status === 200) {
                const data = await response.json();
                setFile(null);
                setFileName("")
                setUploadSuccess(!uploadSuccess)
            }
        } catch(error) {
            setLoading(false)
            setError(error.message)
            console.error(error)
        };
        
    };
    const onHandleFile = (event) => {
        setUploadSuccess(false)
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    return (
        <>
        <div className="modal flex items-center ">
            <div className="relative max-w-sm mx-auto bg-yellow p-10 rounded-md h-3/6">
            <button
          className="absolute top-0 right-0"
          onClick={(previous) => setUploadIncidentModal(!previous)}
        >
                <img
                    src="/close-window-icon.svg"
                    alt="close-window"
                    title="close-window_"
                    className="rounded-tr"
                    width="20"
                />
            </button>
            <div className="flex flex-col justify-around items-center  h-full">
                <h3 className="font-bold text-xl ml-2 mb-5 text-center">Upload Incident Response Checklist to Dropbox</h3>
                <form className="flex flex-col justify-between items-center" onSubmit={onSubmitFile}>
                   
                    {!loading ? (
                        <>
                        
                    <label className="cursor-pointer font-bold flex flex-col w-full items-center justify-around" >
                    <input
                    type="file"
                    name="file"
                    onChange={(event) => onHandleFile(event)}
                    className="cursor-pointer absolute overflow-hidden opacity-0 w-20 h-1/6"
                    accept=".txt,.pdf,.csv,.xlsx"
                    />
                    <figure className="w-3/5 cursor-pointer mb-2">
                        <img src="supervisor/software/backup-data-icon.svg"
                         alt="upload file to dropbox" className="align-middle w-full cursor-pointer"/>
                         
                    </figure>
                    {error ? 
                    <span className="text-md font-bold text-center">{error}</span> :

                    !uploadSuccess ? 
                    <span className="text-sm font-bold text-center w-36 overflow-hidden">{fileName || "Select File"}</span> : 
                    <span className="text-md font-bold text-center">File uploaded</span>

                    } 
                    </label>

                    <button type="submit" className="mt-7 btn-darkBlue text-white font-bold py-1 px-5 rounded" disabled={!file ? true : false}>Upload</button>
                        </>
                    ): 
                    <>
                    <Loader />
                    <p className="text-sm mt-4">Loading...</p>
                    </>}
                </form>
            </div>
            </div>
        </div>
        </>
    )
};
export default UploadIncidentChecklistModal;