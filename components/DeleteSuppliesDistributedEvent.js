import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import {  toast } from "react-toastify";


const DeleteSuppliesDistributedEvent = ({ setShowDeleteEventModal, showDeleteEventModal,selectedEventToDelete, id}) => {
    const router = useRouter()
    const notifyDeleteMessage = () => {
        toast.success("Support group event deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      };
    const handleAuthUserDelete = ({})=>{
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed`,{ data: { id } })
        
        .then(response=>{
            console.log(response)
            if(response.data.status==='OK'){
                notifyDeleteMessage()
                setTimeout(()=>{
                   router.reload()
                },1000)
            }
        })
        .catch(error=>console.log(error))
    };

    return (
        <div className='modal flex items-center '>
            <div className='relative mx-auto bg-yellow-400 py-7 px-10 rounded-md '>
            <button
            className="absolute  top-0 right-0"
            onClick={() => setShowDeleteEventModal((prev) => !prev)}
            >
                <img src="/close-window-icon.svg" alt="close-window" title="close-window_" className="rounded-tr"  width="20" /> 
            </button>
                <div className='flex flex-col justify-between items-start h-full'>
                    <div className='flex items-center mb-5'>
                        {/* <Image src={deleteUserIcon}/> */}
                        <p className='font-bold text-xl '>Delete Event</p>
                    </div>
                    {/* <label id="name" className="block font-semibold mb-20 mt-5 w-100">
                        Discussion topic
                        <input readOnly id="name" value={selectedEventToDelete.supportgrouptopic} className="text-lg rounded-lg bg-yellow-100 w-96 block mt-2 p-2 px-3" />
                    </label> */}
                     <p className='self-center text-center text-lg font-semibold '>Are you sure you want <br/>to delete this supplies distributed event?</p>
                    <div className='w-full flex justify-between self-center'>
                        <button className='text-black font-semibold shadow-md bg-[#23D3AA] hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-10 mx-1 my-5'
                        onClick={()=> handleAuthUserDelete()} >Yes</button>
                        <button className='text-white font-semibold shadow-md bg-black hover:text-white hover:bg-blue-900 cursor-pointer rounded-md p-1 px-10 mx-1 my-5' 
                            onClick={() => setShowDeleteEventModal((prev) => !prev)}>No
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default DeleteSuppliesDistributedEvent;