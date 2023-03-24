import React from 'react'
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import axios from 'axios'

import deleteIcon from '../public/delete-icon.svg'
import editIcon from '../public/edit.svg'
import Image from 'next/image';


export default function UserListRow({setSelectedEntity,authorizeduser,setSelectedUser,setShowEditUserModal,showEditUserModal,index,showDeleteUsermodal, setShowDeleteUserModal}) {
  const {useremail,name,lastname,userrole,isactive,dateaccountactivated,datelastlogin,user_id,key} = authorizeduser

  const router = useRouter()

  const handleSelectedUser =(selectedUser, action)=>{
    setSelectedEntity("users")
    setSelectedUser(authorizeduser)
    action === 'EDIT'?
    setShowEditUserModal(!showEditUserModal):
    setShowDeleteUserModal(!showDeleteUsermodal)
  }

  return (
    <> 

    <div
                className={`${styles.dashboardActiveUsersListHeadRow} ${(index%2)===0 ? 'bg-light-gray':'bg-blue-50'}  py-3 bg-white`}
              >
                <div className="head-row flex px-2 justify-start items-center ">
                  <p className="text-left text-lg">{name}</p>
                </div>
                <div className="head-row flex px-2 justify-start items-center ">
                  <p className="text-left text-lg">{lastname}</p>
                </div>
                 <div className="head-row flex px-2 justify-start items-center">
                  <p className="text-left text-lg">{userrole}</p>
                </div>  
                <div className="head-row flex px-2 justify-start items-center ">
                  <p className="text-left text-lg">{useremail ? useremail : "-"}</p>
                </div>
                <div className="head-row flex px-2 justify-center items-center">
                  <p className="text-left text-lg">{dateaccountactivated?dateaccountactivated.split('T')[0]:"-"}</p>
                </div>
                <div className="head-row flex px-2 justify-center items-center">
                  <p className="text-left text-lg">{datelastlogin?datelastlogin.split('T')[0]:"-"}</p>
                </div>
                <div className="head-row flex px-2 justify-center items-center">
                  <p className="text-left text-lg flex cursor-pointer" 
                   onClick={()=>handleSelectedUser(authorizeduser, 'EDIT')}>
                    <Image src={editIcon} alt="edit-icon"></Image>
                  </p>
                </div>
                <div className="head-row flex px-2 justify-center items-center">
                  <p className="text-left flex cursor-pointer" onClick={()=>handleSelectedUser(authorizeduser, 'DELETE')}>
                  <Image src={deleteIcon} alt="delete-icon"></Image>
                  </p>
                </div>
              </div>
    </>
  )
}
