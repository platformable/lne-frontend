import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Image from 'next/image';

import deleteUserIcon from '../public/delete-user-icon.svg'

const DeleteModal = ({id, showDeleteModal, setShowDeleteModal,notifyDeleteMessage, whatToDelete}) => {
   

    console.log("id",id)

    const router = useRouter()


    // console.log("id",user_id)

    const handleDelete = ()=>{

        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/delete/`,{ data: { id } })
        
        .then(response=>{
            console.log(response)
            if(response.statusText==='OK'){
                notifyDeleteMessage()
                setTimeout(()=>{
                   router.reload()
                },500)
            }
        })
        .catch(error=>console.log(error))
    };

    return (
        <div className='modal flex items-center '>
            <div className='relative max-w-sm mx-auto bg-yellow-400 p-5 rounded-md '>
            <button
            className="absolute  top-0 right-0"
            onClick={() => setShowDeleteModal(!showDeleteModal)}
            >
                <img src="/close-window-icon.svg" alt="close-window" title="close-window_" className="rounded-tr"  width="20" /> 
            </button>
                <div className='flex flex-col justify-between items-start  h-full'>
                   {/*  <div className='flex items-center'>
                        <p className='font-bold text-xl ml-2'>Delete </p>
                    </div>
                    <label id="name" className="block font-semibold my-5">{whatToDelete}
                        <input id="name" value="" className="text-lg rounded-lg bg-yellow-100 block mt-2 p-2 px-3"></input>
                    </label> */}
                     <p className='self-center text-center text-lg font-semibold '>Are you sure you want <br/>to delete this {whatToDelete}?</p>
                    <div className='w-full flex justify-between self-center'>
                        <button className='text-black font-semibold shadow-md bg-[#23D3AA] hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-10 mx-1 my-5'
                        onClick={()=> handleDelete()} >Yes</button>
                        <button className='text-white font-semibold shadow-md bg-black hover:text-white hover:bg-blue-900 cursor-pointer rounded-md p-1 px-10 mx-1 my-5' 
                            onClick={() => setShowDeleteModal(!showDeleteModal)}>No
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default DeleteModal;