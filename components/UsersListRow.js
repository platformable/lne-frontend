import React from 'react'
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import axios from 'axios'

export default function UsersListRow({showDeleteUserModal,setShowDeleteUserModal,authorizeduser,setShowEditAuthUserModal,showEditAuthUserModal,
  index,setSelectedUser, showEditInactiveUserModal, setShowEditInactiveUserModal,selectedEntity,setSelectedEntity}) {
  const {email,name,lastname,role,isactive,datelastlogin,id,dateaccountactivated} = authorizeduser
  const router = useRouter()

  const handleSelectedUser =(selectedUser)=>{
    if(selectedUser.id) {
      setSelectedUser(selectedUser)
      setShowEditAuthUserModal(!showEditAuthUserModal)
    } else {
      setSelectedUser(selectedUser)
      setShowEditInactiveUserModal(!showEditInactiveUserModal)
    }
    
 
  }


  const handleAuthUserDelete = (id)=>{
    setSelectedEntity("users")
    setSelectedUser(authorizeduser)
    setShowDeleteUserModal(!showDeleteUserModal)
   

  } 
  //date to shown in list
const date = dateaccountactivated.split("T")[0].split("-") 
const year= date[0]
const month = date[1]
const day= date[2]

  return (
    <> 

              <div className={`${styles.dashboardClientListHeadRow} bg-white border rounded-md py-3 px-5 my-1 `}>
                {/* <div className="head-row ">
                  <p className="text-center">{id}</p>
                </div> */}
                <div className="head-row flex justify-start items-center">
                  <p className="text-center">{name}</p>
                </div>
                <div className="head-row flex justify-start items-center">
                  <p className="text-center">{lastname}</p>
                </div>
                <div className="head-row flex justify-start items-center">
                  <p className="text-center">{role || authorizeduser.userrole}</p>
                </div>
                <div className="head-row flex justify-start items-center">
                  <p className="text-center">{email || authorizeduser.useremail ? (email || authorizeduser.useremail ) : "-"}</p>
                </div>
              
                <div className="head-row flex justify-start items-center">
                  <p className="text-center">{dateaccountactivated ? `${month}/${day}/${year}` : "-"}</p>
                </div>
                
                <div className="head-row flex justify-center items-center">
                  <p className="text-center flex cursor-pointer" 
                   onClick={()=>handleSelectedUser(authorizeduser)}>
                     <img src='/edit-icon.svg' alt=''/>
                  </p>
                </div>
                <div className="head-row flex justify-center items-center">
                  <p className="text-center flex cursor-pointer" onClick={()=>handleAuthUserDelete(authorizeduser)}>
                  <img src='/delete-icon.svg' alt=''/>
                  </p>
                </div>
                
              </div>
    </>
  )
}