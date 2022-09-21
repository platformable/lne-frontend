import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Image from 'next/image';

import deleteUserIcon from '../public/delete-user-icon.svg'

const DeleteClientModal = ({data, showDeleteClientModal, setShowDeleteClientModal,notifyDeleteMessage}) => {
    let {id,clientid,clientfirstname,clientlastname} = data[0]

    console.log("id",id)

 console.log("client",data)
    const router = useRouter()


    // console.log("id",user_id)

    const handleAuthUserDelete = ({})=>{
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/delete/`,{ data: { id } })
        
        .then(response=>{
            console.log(response)
            if(response.statusText==='OK'){
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
            <div className='relative max-w-sm mx-auto bg-yellow-400 p-5 rounded-md '>
            <button
            className="absolute  top-0 right-0"
            onClick={() => setShowDeleteClientModal(!showDeleteClientModal)}
            >
                <img src="/close-window-icon.svg" alt="close-window" title="close-window_" className="rounded-tr"  width="20" /> 
            </button>
                <div className='flex flex-col justify-between items-start  h-full'>
                    <div className='flex items-center'>
                        <Image src={deleteUserIcon}/>
                        <p className='font-bold text-xl ml-2'>Delete User</p>
                    </div>
                    <label id="name" className="block font-semibold my-5">Name
                        <input id="name" value={clientfirstname +' '+ clientlastname} className="text-lg rounded-lg bg-yellow-100 block mt-2 p-2 px-3"></input>
                    </label>
                     <p className='self-center text-center text-lg font-semibold '>Are you sure you want <br/>to delete this client?</p>
                    <div className='w-full flex justify-between self-center'>
                        <button className='text-black font-semibold shadow-md bg-[#23D3AA] hover:text-white hover:bg-green-500 cursor-pointer rounded-md p-1 px-10 mx-1 my-5'
                        onClick={()=> handleAuthUserDelete()} >Yes</button>
                        <button className='text-white font-semibold shadow-md bg-black hover:text-white hover:bg-blue-900 cursor-pointer rounded-md p-1 px-10 mx-1 my-5' 
                            onClick={() => setShowDeleteClientModal(!showDeleteClientModal)}>No
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default DeleteClientModal;