import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Image from 'next/image';

import deleteUserIcon from '../public/delete-user-icon.svg'

const DeleteUserModal = ({urlEntity,selectedUser, showDeleteUserModal, setShowDeleteUserModal}) => {
    const router = useRouter()
    // console.log("aqui", selectedUser)
    const {id, name, lastname,email} = selectedUser

    // console.log("id",user_id)
    console.log("selected",selectedUser)
    const handleAuthUserDelete = ({})=>{
        urlEntity==="users" ? axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/${urlEntity}/`,{ data: { user_id: selectedUser.user_id } }):
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/${urlEntity}/`,{ data: { email } })
        
        .then(response=>{
            console.log(response)
          router.reload()
        })
        .catch(error=>console.log(error))
    };

    return (
        <div className='modal flex items-center'>
            <div className='relative  mx-auto bg-white p-5 border-yellow rounded-md '>
            <button
            className="absolute  top-0 right-0 m-3" 
            onClick={() => setShowDeleteUserModal(!showDeleteUserModal)}
            >
                <img src="/close_modal_user.svg" alt="close-window" title="close-window_" className="rounded-tr m-2" width={24} /> 
            </button>
                <div className=''>
                    <div className='flex items-center'>
                    <img src="/delete_client_black_icon.svg" alt="" width={14}/>
                        <h3 className='ml-2 text-2xl font-bold'>Delete User</h3>
                    </div>
        
                    <h4 className="mt-5 mb-3 text-xl font-bold">Name</h4>
                    <p className="bg-blue-50 rounded-md py-3 px-3 mb-5 text-lg">{name} {lastname} </p>
                     <p className='self-center text-center text-xl'>Are you sure you want to delete this user?</p>
                    <div className='grid grid-cols-2 gap-x-5 justify-between mt-5'>
                    
                        <button
                        onClick={()=> handleAuthUserDelete()}
                        className="yellow-btn  rounded-md py-1 text-xl">
                            Yes
                        </button>

                        <button 
                        onClick={() => setShowDeleteUserModal(!showDeleteUserModal)}
                        className="bg-black text-white rounded-md py-1 text-xl">
                            No
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default DeleteUserModal;