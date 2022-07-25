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
        onSubmitFile(event)
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
            <div className={`flex flex-col ${!loading? "justify-around" : "justify-center"} items-center w-56 h-full`}>
               
                   
                    {!uploadSuccess ? (!loading ? (
                        <>
                         <figure className="mb-2">
                            <img src="supervisor/software/incident_response_checklist_popup_icon.svg"
                            alt="select file to upload" className="align-middle w-full cursor-pointer"/>
                            
                        </figure>
                        {error ? 
                            <span className="text-md font-bold text-center">{error}</span> :
                            <h3 className="font-bold text-center w-48">{fileName || "Incident Response Checklist"}</h3> 
                        } 
                       
                        <label className="cursor-pointer font-bold flex flex-col w-full items-center justify-around" >
                           
                            <button  className="mt-7 btn-darkGreen shadow cursor-pointer flex items-center font-bold py-1 px-5 rounded" >
                                <img src="supervisor/software/backup-data-icon.svg"
                                alt="upload file to dropbox" 
                                width="25px" className="mr-1"
                            />
                            Upload to Dropbox
                            <input
                            type="file"
                            name="file"
                            onChange={(event) => onHandleFile(event)}
                            className="cursor-pointer absolute overflow-hidden opacity-0 w-8/12"
                            accept=".txt,.pdf,.csv,.xlsx"
                            />
                            </button>
                         </label>

                        </>
                    ): 
                    <>
                    <Loader />
                    <p className="mt-4">Loading...</p>
                    </>):
                    (<>
                        <img src="supervisor/software/incident_response_Uploaded_popup_icon.svg" />
                        <h3 className="font-bold text-xl ml-2 mb-5 text-center">File uploaded successfully</h3>
                        <a className="mt-7 btn-darkGreen font-bold py-1 px-5 rounded shadow"
                        href="https://www.dropbox.com/sh/vjgzdma9pq19wz3/AADj8-d8q8PTu0UhYdAe_nDua?dl=0" target="_blank" rel='noreferrer'>Check Dropbox Folder</a>
                    </>)
                    }
            </div>
            </div>
        </div>
        </>
    )
};
export default UploadIncidentChecklistModal;