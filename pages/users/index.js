import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import UserListRow from "../../components/UserListRow";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import DeleteUserModal from '../../components/DeleteUserModal';
import Layout from '../../components/Layout';
import Image from 'next/image';

import backIcon from '../../public/BACKicon.svg'
import authUserICon from '../../public/authorized-users-icon.svg'

export default function UsersIndex({data}) {
    const { user, error, isLoading } = useUser();
    const [showModal,setShowModal] = useState(false)

    const [showEditUserModal,setShowEditUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    const [selectedUser,setSelectedUser] = useState({});
    const [selectedEntity,setSelectedEntity]=useState("")
    const [activeUsers,setActiveUsers]=useState([])
console.log(data)
    const getActiveUsers=(array)=>{

      const result = array.filter((user,index)=>{
        return user.useractivestatus==='Active'
      })

      setActiveUsers(result)

    }



    useEffect(()=>{
      getActiveUsers(data)

    },[])

  return (
    <>
    <Layout>
    
    
          <section>
           <div className=""> 

           <div className="container mx-auto flex flex-wrap mt-5">
              <h1 className='block font-bold'>Manage Users</h1>
            <div className="flex  items-center justify-between container my-5 mx-auto">
              <Link href="/authorizedusers">
                <a className="rounded bg-yellow px-5 py-2 flex items-center  font-semibold shadow-xl" id="myBtn">
                <Image src={authUserICon} width={40} height={40}/>
                  <p className='ml-2 text-sm'>View authorized users</p>
                </a>
              </Link>
              <Link href="/dashboard">
                <a className="px-5 py-2 flex  items-center font-bold" id="myBtn">
                <Image src={backIcon} />
                  <p className='ml-2'>back to homepage</p>
                </a>
              </Link>
            </div>
              
              {/* <button className="rounded btn-lightBlue px-5 py-2 flex shadow-xl inline-block" id="myBtn" onClick={()=>setShowModal(!showModal)}>
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H20M23 10H20M20 10V7M20 10V13"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                Go to users
              </button> */}
            </div>

                {/* TABLE */}
          <div id='dashboard-client-list-container' className="bg-light-blue pb-7 h-screen">
          <div className="dashboard-client-list container mx-auto">
            <h2 className="font-black text-center py-5">Active Users</h2>
              <div className={`${styles.dashboardActiveUsersListHeadRow}  pt-3 px-5`}>
                 
                <div className="head-row font-black">
                  <p className="text-base text-left">Name</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-left">Lastname</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-left"> User Role</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-left">Email</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-center">Activated in</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-center">Last login</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-center">Edit</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-base text-center">Delete</p>
                </div>
              </div>
            </div>
            <div className="dashboard-client-list mt-2 container mx-auto">

                {data?activeUsers.map((authuser,index)=>{
                   return <UserListRow 
                   authorizeduser={authuser} 
                   index={index} 
                   key={index}
                   setShowEditUserModal={setShowEditUserModal} 
                   showEditUserModal={showEditUserModal}
                   showDeleteUserModal={showDeleteUserModal}
                   setShowDeleteUserModal={setShowDeleteUserModal}
                   setSelectedUser={setSelectedUser}
                   setSelectedEntity={setSelectedEntity}
                   />
                }):"No Data"}
              
            </div>
          </div>
          </div>
         
          </section>
      
      {showModal &&<AddUserModal setShowModal={setShowModal} showModal={showModal}/>}
      {showEditUserModal &&<EditUserModal setShowEditUserModal={setShowEditUserModal} showEditUserModal={showEditUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
      {showDeleteUserModal && <DeleteUserModal urlEntity={'users'}setShowDeleteUserModal={setShowDeleteUserModal} showDeleteUserModal={showDeleteUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}

      </Layout>
    </>
  )
}


// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
  }