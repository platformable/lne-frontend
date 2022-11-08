import React, { useState, useRef } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
// import EventsCardItems from "../../components/events/EventsCardItems";
import Search from "../../../components/SearchEvents";
// import DeleteEventModal from "../../components/events/DeleteEventModal";
// import { searchEventByName } from "../../slices/eventsSearchWordSlice";

// import {
//   updateStartDate,
//   updateEndDate,
// } from "../../slices/eventsCalendarDatesSlice";
import { useEffect } from "react";

const SupportGroups = ({ events }) => {
  console.log("events", events)
//   const eventSearchWord = useSelector(
//     (state) => state.eventsSearchWord.value.word
//   );
//   const [searchWord, setSearchWord] = useState(eventSearchWord || "");
//   const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  const [selectedEventToDelete, setSelectedEventToDelete] = useState("");

  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);

  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  /*   const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); */

  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  
  const handleDeleteEvent=(id,eventName)=>{
    console.log(id)
    setSelectedEventToDelete({id:id,eventname:eventName})
    setShowDeleteEventModal(!showDeleteEventModal)
  }
  const searchFunction = (word) => {
    setSearchWord(word);
    // dispatch(searchEventByName({ word }));
  };
  const ref = useRef();

  
  // console.log("events",events)

//   const startDate = useSelector(
//     (state) => state.eventCalendarDates.value.startDate
//   );
//   const endDate = useSelector(
//     (state) => state.eventCalendarDates.value.endDate
//   );
//   console.log("startDate desde toolkit", startDate);
//   console.log("endDate desde toolkit", endDate);

//   const state = useSelector((state) => console.log(state));

//   console.log("state", state);

  const sortedEventsByDate = events.sort(
    (a, b) => new Date(b.eventdate) - new Date(a.eventdate)
  );

  console.log(sortedEventsByDate);
  return (
    <Layout showStatusHeader={true}>
      {/* <PageTopHeading
        pageTitle={"Manage existing events"}
        dashboardBtn={true}
        backBtn={true}
      /> */}

      <div className="container mx-auto grid  items-center grid-cols-1 container mx-auto md:px-0 px-5 md:mb-5 md:gap-5">
        <Search searchFunction={searchFunction} />

        <div className="block md:flex xl:justify-end md:px-0 lg:col-start-4 py-5 md:py-0  mr-0">
          <h3 className="">Filter by date</h3>
        </div>

        <div className="block md:flex flex-col gap-y-5 lg:flex-row gap-x-5 lg:col-end-6 items-center md:my-0">
          <label className="w-full">
            <input
              type="date"
              ref={ref}
              id="start"
              placeholder="start date"
              onChange={(e) => {
                setDateFilter({ ...dateFilter, startDate: e.target.value });
                dispatch(
                  updateStartDate({ ...dateFilter, startDate: e.target.value })
                );
              }}
              defaultValue={startDate}
              className="border-black rounded-md text-sm w-full"
            />
          </label>
          <h3 className="text-left md:text-center md:py-5 md:py-0 py-5">and</h3>
          <label className="flex justify-end w-full">
            <input
              type="date"
              placeholder="end date"
              onChange={(e) => {
                setDateFilter({ ...dateFilter, endDate: e.target.value });
                dispatch(
                  updateStartDate({ ...dateFilter, endDate: e.target.value })
                );
              }}
              defaultValue={endDate}
              className="border-black rounded-md  text-sm w-full"
            />
          </label>
        </div>
      </div>

      <div className="events-cards-container grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 container mx-auto md:px-0 px-5 mb-5 gap-5 md:mt-0 mt-5"></div>
      {/*  HEAD TABLE  */}
      <div className={`hidden md:grid ${loggedUserRole === "Supervisor" ? "supervisor-existing-events-head-table" : `existing-events-head-table`} container mx-auto  rounded-t-lg py-3 px-7 bg-black text-white`}>
        {/* <p className="lg:text-xl font-bold flex items-center ">Program</p> */}
        <p className="lg:text-xl font-bold flex items-center ">Event name</p>
        <p className="lg:text-xl font-bold flex items-center ">Event date</p>
      </div>

      <div className="container  mx-auto md:px-0 px-7 mb-10 pb-10 rounded-lg ">
        <div className="events-index-btn-container grid grid-cols-1 gap-3 p-0">
          {sortedEventsByDate &&
            sortedEventsByDate
              ?.filter((event, index) => {
                if (
                  searchWord === "" &&
                  dateFilter.startDate === null &&
                  dateFilter.endDate === null
                ) {
                  return event;
                }
                if (
                  event.programname
                    .toLowerCase()
                    .includes(searchWord.toLowerCase()) ||
                  event.eventname
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
                ) {
                  return event;
                }
              })
              .filter((event, index) => {
                var startDate = new Date(new Date(dateFilter?.startDate).setHours(0))
                var endDate = new Date(new Date(dateFilter?.endDate).setHours(23))
                if (startDate !== null && endDate !== null) {
                  let filterPass = true;
                  const date = new Date(event.eventdate);
                  if (dateFilter.startDate) {
                    filterPass = filterPass && startDate <= date;
                  }
                  if (dateFilter.endDate) {
                    filterPass =
                      filterPass && endDate >= date;
                  }
                  return filterPass;
                }
              })
              .map((event, index) => {
                return (
                  <>
                    {/* <div className="sm:hidden w-full">
                      <EventsCardItems
                        key={index}
                        id={event.id}
                        programName={event.programname}
                        eventdate={event.eventdate}
                        eventName={event.eventname}
                        urlEdit={`events/${event.id}/nys_cmp/edit`}
                        urlParticipantSurvey={`/events/${event.id}/participant-survey`}
                        urlUpload={`events/${event.id}/upload-event`}
                        urlPostEventSurvey={`events/${event.id}/post-event-survey`}
                        urlEditPostEventSurvey={`events/${event.id}/edit-post-event-survey`}
                        userRole={loggedUserRole}
                        setShowDeleteEventModal={setShowDeleteEventModal}
                        showDeleteEventModal={showDeleteEventModal}
                        setSelectedEventToDelete={setSelectedEventToDelete}
                        selectedEventToDelete={selectedEventToDelete}
                        postEventReportId={event.posteventreportid}
                        makeIcsFile={makeIcsFile}
                        event={event}
                      />
                    </div> */}
                    <div className="hidden sm:block">
                      <section
                        key={index}
                        className={`grid ${loggedUserRole === "Supervisor" ? "supervisor-existing-events-head-table" : "existing-events-head-table"} px-7 py-7  rounded shadow-md`}
                      >
                        {/* <div className="flex items-center lg:text-xl font-bold ">{event.programname}</div> */}
                        <div className="flex items-center lg:text-xl font-bold ">
                          {event.eventname}
                        </div>
                        <div className="flex items-center lg:text-xl font-bold mr-2">
                          {
                            event.eventdate &&
                              new Date(event?.eventdate).toLocaleDateString(
                                "en-US"
                              )
                            /* crearFecha2(event) */
                          }
                        </div>
                        <Link href={`events/${event.id}/nys_cmp/edit`}>
                          <div className="cursor-pointer flex items-center border-black shadow-md rounded-lg text-center lg:text-xl p-2 font-bold justify-center">
                            <p className="leading-5">Edit event</p>
                          </div>
                        </Link>
                       
                        {loggedUserRole === "Supervisor" && (
                          <div className="flex justify-center">
                            <button
                              className="bg-black lg:text-lg py-2 px-5 rounded-lg text-white"
                              onClick={() => handleDeleteEvent(event?.id, event?.eventname)}
                            >
                              Delete event
                            </button>
                          </div>
                        )}
                      </section>
                    </div>
                  </>
                );
              })}
          
        </div>
        {/* {showDeleteEventModal && (
          <DeleteEventModal
            setShowDeleteEventModal={setShowDeleteEventModal}
            showDeleteEventModal={showDeleteEventModal}
            selectedEventToDelete={selectedEventToDelete}
            id={selectedEventToDelete.id}
          />
        )} */}
      </div>
    </Layout>
  );
};

export default SupportGroups;

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const response = await fetch(
//     //   `${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups`
//     );
//     const events = await response.json();

//     return { props: { events } };
//   },
// });
