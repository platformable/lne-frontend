import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import AuthUserListRow from "../../components/AuthUserListRow";
import UserListRow from "../../components/UserListRow";
import UsersListRow from "../../components/UsersListRow";
import AddUserModal from "../../components/AddUserModal";
import EditAuthUserModal from "../../components/EditAuthUserModal";
import EditInactiveUserModal from '../../components/EditInactiveUserModal';
import DeleteUserModal from '../../components/DeleteUserModal';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import authUserICon from '../../public/authorized-users-icon.svg'
import backIcon from '../../public/BACKicon.svg'
import addUserICon from '../../public/add-new-user-icon.svg' 
import BackToDashboardButton from '../../components/BackToDashboardButton';

export default function AuthorizedUsersIndex({data, users}) {
  const router = useRouter()
    const { user, error, isLoading } = useUser();
    const [showModal,setShowModal] = useState(false)

    const [notificationMessage,setNotificationMessage]=useState(false)
    const [listOfNonRegistered,setListOfNonRegistered]=useState([])
    const [listOfNoActive, setListOfNoActive] = useState([])
    const [selectedEntity,setSelectedEntity]=useState("")

    const [showEditAuthUserModal,setShowEditAuthUserModal] = useState(false)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showEditInactiveUserModal, setShowEditInactiveUserModal] = useState(false)

    const [selectedUser,setSelectedUser]=useState({})

console.log("data",data)
console.log("users",users)


    useEffect(()=> {
      getNotRegisteredUser(data, users)
      getNoActiveUser(users)
      // getNoActiveUserFromNotRegisteredUsers()
    }, [data]) 
    
 const notifyMessage= ()=>{
  toast.success("A new user has been saved!", {
    position: toast.POSITION.TOP_CENTER,
    
  });
 }
 const getNotRegisteredUser =  (array1,array2)=>{
    const noRegisteredUsers=[]
    const noRegisteredAndInactive=array1.filter((data,index)=>{
      const filtered = array2.findIndex(user=> user.useremail===data.email)

      if(filtered===-1 && (data.isactive === "Active" || data.isactive === "true")){
        noRegisteredUsers.push(data)
      }
      return data.isactive === "No Active" 
    })
    setListOfNonRegistered(noRegisteredUsers)
    setListOfNoActive(noRegisteredAndInactive)
  }
  const getNoActiveUser = (array1) => {
    const noActive = array1.filter(user => user.useractivestatus === 'No Active' || user.useractivestatus === 'false')
    // console.log('lista noactive',noActive)
    setListOfNoActive((previous) => [...previous, ...noActive])
  }

  

  return (
    <>
    <Layout>
      <main>
      <ToastContainer autoClose={2000}/>
          <section>
           <div className="container mx-auto mt-5"> 
           <h1 className='block font-bold'>Manage Users</h1>
           
            <div className='button-container flex gap-x-2 items-center mt-3 mb-5'>

                <button className="rounded bg-yellow px-5 py-2 flex items-center  font-semibold shadow-xl " id="myBtn" onClick={() => setShowModal(!showModal)}>
                <Image src={addUserICon} width={20} height={20}/>
                <p className='ml-2 text-sm'>Add a new user</p>
                
                 </button>
                <Link href="/users">
                <a className="rounded bg-yellow px-5 py-2 flex items-center  font-semibold shadow-xl" id="myBtn">
                <Image src={authUserICon} width={20} height={20}/>
                  <p className='ml-2 text-sm'>View active users</p>
                </a>
                </Link>
          
              
              <div className="flex justify-center items-center">
            <BackToDashboardButton/>
              </div>
              
            </div>
            {/* Authorized Users   */}
          
          </div>
              {/* TABLE */}
          <div id="dashboard-client-list" className="bg-light-blue pb-7 h-screen">

            <div className="dashboard-client-list container mx-auto">
              <h2 className="font-black text-center pt-6 pb-3">Authorized Users</h2>
              <div className={`${styles.dashboardClientListHeadRow} items-end py-3 px-5 pt-5 pb-1`}>

                  <div className="head-row font-black">
                    <p className="text-base text-left">Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">Last Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">User Role</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">Email</p>
                  </div>

                  <div className="head-row font-black">
                    <p className="text-base text-left">Date User added by the supervisor</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-center">Edit</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-center"> Delete</p>
                  </div>
              </div>
              <div className="dashboard-client-list mt-2 container mx-auto">

     
            {data? listOfNonRegistered?.map((authuser,index)=>{
                   return <AuthUserListRow
                   authorizeduser={authuser}
                   index={index}
                   key={index}
                   setShowEditAuthUserModal={setShowEditAuthUserModal}
                   showEditAuthUserModal={showEditAuthUserModal}
                   setSelectedUser={setSelectedUser}
                   showDeleteUserModal={showDeleteUserModal}
                   setShowDeleteUserModal={setShowDeleteUserModal}
                   selectedEntity={selectedEntity}
                   setSelectedEntity={setSelectedEntity}
                   />
                }): "No data"}
              
              </div>
            </div>
                {/* INACTIVE USERS */}

            <div className="dashboard-client-list container mx-auto mt-10">
            <h2 className="font-black text-center py-3 ">Inactive Users</h2>
             {listOfNoActive.length === 0 ? <center><p>No Inactive Users</p></center> :(
              <>
                  <div className={`${styles.dashboardClientListHeadRow} items-end py-3 px-5 pt-5 pb-1`}>

                  <div className="head-row font-black">
                    <p className="text-base text-left">Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">Last Name</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">User Role</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-left">Email</p>
                  </div>

                  <div className="head-row font-black">
                    <p className="text-base text-left">Date User added by the supervisor</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-center">Edit</p>
                  </div>
                  <div className="head-row font-black">
                    <p className="text-base text-center"> Delete</p>
                  </div>
              </div>
              <div className="dashboard-client-list mt-2 container mx-auto">
              {users? listOfNoActive?.map((authuser,index)=>{
                   return <UsersListRow
                   authorizeduser={authuser}
                   index={index}
                   key={index}
                    setShowEditAuthUserModal={setShowEditAuthUserModal}
                  showEditAuthUserModal={showEditAuthUserModal}
                   showEditInactiveUserModal={showEditInactiveUserModal}
                   setShowEditInactiveUserModal={setShowEditInactiveUserModal}
                   setSelectedUser={setSelectedUser}
                   showDeleteUserModal={showDeleteUserModal}
                   setShowDeleteUserModal={setShowDeleteUserModal}
                   selectedEntity={selectedEntity}
                   setSelectedEntity={setSelectedEntity}
                   />
                }): "No data"}
              
              </div>
              </>      
            )} 

            
              
            </div>     
          </div>
          </section>
      </main>
      {showModal &&<AddUserModal 
      setShowModal={setShowModal} 
      showModal={showModal}
      notifyMessage={notifyMessage}
      />}
      {!showEditAuthUserModal &&<EditAuthUserModal setShowEditAuthUserModal={setShowEditAuthUserModal}  showEditAuthUserModal={showEditAuthUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
      {showEditInactiveUserModal &&<EditInactiveUserModal setShowEditInactiveUserModal={setShowEditInactiveUserModal}  showEditInactiveUserModal={showEditInactiveUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
      {showDeleteUserModal && <DeleteUserModal urlEntity={selectedEntity} setShowDeleteUserModal={setShowDeleteUserModal} showDeleteUserModal={showDeleteUserModal} selectedUser={selectedUser}/>}
      </Layout>
    </>
  )
}


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [data, users] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
        r.json()
      ),
    ]);
    return { props: { data: data, users: users } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
