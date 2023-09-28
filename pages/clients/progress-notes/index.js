import React,{useState,useEffect} from 'react'
import Layout from '../../../components/Layout'
import SubHeader from '../../../components/SubHeader'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import DeleteModal from "./../../../components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllProgressNotes({data}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProgressNoteId, setSelectedProgressNoteId] = useState("");
    const [selectedPage,setSelectedPage]=useState(1)
    const [progressNotes, setProgressNotes]=useState([])
    

    const notifyDeleteMessage = () => {
        toast.success("Deleting", {
          position: toast.POSITION.TOP_CENTER,
        });
      };


      console.log("progressNotes", progressNotes)

      const handlePreviousProgressNotes = ()=> {
        // progressNotes.hasNextPage ? router.push(`m`):null
        setSelectedPage(selectedPage-1)
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes?page=${selectedPage}&limit=100`)
        .then(res=>res.json())
        .then(res=>setProgressNotes(res))
      }

      const handleNextProgressNotes = ()=> {
        // progressNotes.hasNextPage ? router.push(`m`):null
        setSelectedPage(selectedPage+1)
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes?page=${selectedPage}&limit=100`)
        .then(res=>res.json())
        .then(res=>setProgressNotes(res))
      }

  useEffect(()=>{
    const handleProgressNotes = ()=> {
        // progressNotes.hasNextPage ? router.push(`m`):null
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes?page=${selectedPage}&limit=100`)
        .then(res=>res.json())
        .then(res=>setProgressNotes(res))
      }
      handleProgressNotes()

  },[selectedPage])    

  return (
    <Layout>
        <ToastContainer autoClose={700} />
        <SubHeader pageTitle='Clients Progress Notes'/>


        <section id="progressnotes" className="my-10 ">
            <div className="container mx-auto bg-white px-5 pt-5 pb-10  mt-5 rounded-md shadow-md">
              <div className="flex gap-x-3">
                <img src="/client/Client_progress_notes_icon.svg" alt="" />
                <h3 className="font-bold my-5 text-2xl">Client progress notes</h3>
              </div>

              <div className="grid all-client-progress-note-table gap-x-1 rounded-tl-md rounded-tr-md">
                <div>
                  <h3 className="bg-client-profile-pn-heading p-2 text-bold table-headings py-2 px-5  mt-2  font-bold ">
                    Date
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading p-2 text-bold table-headings py-2 px-5  mt-2  font-bold ">
                    ClientId
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 px-5 text-bold table-headings   mt-2  font-bold ">
                    Service
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 text-bold table-headings text-center mt-2  font-bold ">
                    Edit
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 text-bold table-headings text-center  mt-2  font-bold ">
                    Delete
                  </h3>
                </div>
              </div>

              {progressNotes?.data?.length > 0 ? (
                progressNotes.data
                //   .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((pn, index) => {
                    return (
                      <div
                        key={index}
                        className={`grid all-client-progress-note-table py-2  ${
                          index % 2 === 0 ? "bg-light-gray" : "bg-blue-50"
                        }`}
                      >
                        <p className="px-5 text-xl">
                          {new Date(pn.progressnotedate).toLocaleDateString("en-US")}
                        </p>

                        <p className="px-5 text-xl">
                            {pn.clientid}
                        </p>
                        <div className="px-5 ">
                        <p className="text-xl">
                            {pn.developmentactionplan === "1"
                              ? "Development of Action Plan with Client"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.cd4vllabreport === "1"
                              ? "CD4/VL Lab Report Check"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.transportationcoordination === "1"
                              ? "Transportation Coordination"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.translationinterpretation === "1"
                              ? "Translation/Interpretation"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.comprehensivebehavioralriskassessment === "1"
                              ? "Comprehensive Behavioral Risk Assessment"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.ticklerupdate === "1" ? "Tickler Update" : ""}
                          </p>
                          <p className="text-xl">
                            {pn.treatmenteducation === "1"
                              ? "Treatment Education and Adherence Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.preventioncounselling === "1"
                              ? "Prevention Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.supportivecounselling === "1"
                              ? "Supportive Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">{pn.escort === "1" ? "Escort" : ""}</p>
                          <p className="text-xl">
                            {pn.caseclosuredischarge === "1"
                              ? "Case Closure/Discharge"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.linkagetoservices === "1"
                              ? "Linkage to Services"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.supportgroups === "1" ? "Support Groups" : ""}
                          </p>
                          <p className="text-xl">
                            {pn.implementationactionplan === "1"
                              ? "Implementation of Action Plan"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.housingassistance === "1"
                              ? "Assistance with Housing Services"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.benefitsassistance === "1"
                              ? "Assistance with Access to Benefits/Entitlements"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.employmentassistance === "1"
                              ? "Assistance with Employment/Education"
                              : ""}
                          </p>

                          <p className="text-xl">
                            {pn.otherassistance === "1"
                              ? "Other Assistance"
                              : ""}
                          </p>
                          
                        </div>
                        <div className="flex justify-center ">
                          <Link
                            href={`/clients/${pn.clientid}/progress_note/${pn.id}/edit`}
                          >
                            <a
                              href={"/clients/devs"}
                              className="flex justify-center items-center"
                            >
                              <img src="/edit.svg" alt="edit icon" />
                            </a>
                          </Link>
                        </div>
                        <div className="flex justify-center ">
                          <button
                            onClick={() => {
                              setSelectedProgressNoteId(pn.id);
                              setShowDeleteModal(!showDeleteModal);
                            }}
                            className="flex items-center justify-center"
                          >
                            <img src="/delete_client_black_icon.svg" alt="edit icon" />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <center className="mt-5 font-bold">
                  No progress notes yet
                </center>
              )}

               <div className="NextBackBtns grid md:grid-cols-3 grid-cols-1 my-7 items-center">
                <div>
                { progressNotes?.hasPreviousPage && <button className="bg-[#62a6e5] hover:bg-[#249AE3] text-white px-10 py-2 rounded-md shadow hover:bg-blue-800"
               onClick={()=>handlePreviousProgressNotes()}
               >Previous</button>}
               </div>
               <div className="flex justify-center items-center ">
               <div className="bg-blue-50 rounded-md px-5 py-2"> <p className="text-xl">{progressNotes.page + ' / ' + progressNotes.totalPages + ' pages'}</p></div>
               </div>
               <div className="flex justify-end">
              { progressNotes?.hasNextPage && <button className="bg-[#62a6e5] hover:bg-[#249AE3] text-white px-10 py-2 rounded-md shadow hover:bg-blue-800"
               onClick={()=>handleNextProgressNotes()}
               >Next</button>
              }
               </div>
              </div> 
            </div>
          </section>
          {showDeleteModal && (
        <DeleteModal
          //progressNotes={progressNotes}
          id={selectedProgressNoteId}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          notifyDeleteMessage={notifyDeleteMessage}
          whatToDelete={"progress note"}
        />
      )}


    </Layout>
  )
}


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
    //   let { clientid } = ctx.params;
      const [data] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes?page=1&limit=100`
        ).then((r) => r.json()),
      ]);
      return {
        props: {
          data: data,
         
        },
      };
  
      /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
      const data = await res.json();
      return { props: { data } }; */
    },
  });