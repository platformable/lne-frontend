import React, { useState, useRef } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import BackButton from "../../components/BackButton";
import BackToDashboardButton from "../../components/BackToDashboardButton";
import DeleteSupportGroupEvent from "../../components/DeleteSupportGroupEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PastEvents = ({ events }) => {
  console.log("events", events);

  const { user, error, isLoading } = useUser();
  const [selectedEventToDelete, setSelectedEventToDelete] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });

  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const handleDeleteEvent = (id, topic) => {
    console.log(id);
    setSelectedEventToDelete({ id: id, supportgrouptopic: topic });
    setShowDeleteEventModal(!showDeleteEventModal);
  };
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
    (a, b) => new Date(b.supportmeetingdate) - new Date(a.supportmeetingdate)
  );

  return (
    <Layout showStatusHeader={true}>
      <ToastContainer autoClose={3000} />
      <div className="container mx-auto my-10">
        <h1 className="font-black mb-5">Review past group events</h1>
        <div className="flex items-center gap-5">
          <BackButton />
          <BackToDashboardButton />
        </div>
      </div>

      <div className="container mx-auto grid  items-center grid-cols-1 container mx-auto md:px-0 px-5 md:mb-5 md:gap-5">
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
                // dispatch(
                //   updateStartDate({ ...dateFilter, startDate: e.target.value })
                // );
              }}
              // defaultValue={startDate}
              className="border-black rounded-md py-1 px-2  w-full"
            />
          </label>
          <h3 className="text-left md:text-center md:py-5 md:py-0 py-5">and</h3>
          <label className="flex justify-end w-full">
            <input
              type="date"
              placeholder="end date"
              onChange={(e) => {
                setDateFilter({ ...dateFilter, endDate: e.target.value });
                // dispatch(
                //   updateStartDate({ ...dateFilter, endDate: e.target.value })
                // );
              }}
              // defaultValue={endDate}
              className="border-black rounded-md  py-1 px-2 w-full"
            />
          </label>
        </div>
      </div>

      <div className="events-cards-container  bg-light-blue py-7">
        <div
          className={`hidden md:grid ${
            loggedUserRole === "Supervisor"
              ? "supervisor-existing-events-head-table"
              : `existing-events-head-table`
          } container mx-auto gap-5 rounded-t-lg py-3 px-7`}
        >
          {/* <p className="lg:text-xl font-bold flex items-center ">Program</p> */}
          <p className="lg:text-xl font-bold flex items-center ">Event date</p>
          <p className="lg:text-xl font-bold flex items-center ">
            Name of Group
          </p>
          <p className="lg:text-xl font-bold flex items-center justify-center">
            Discussion topic
          </p>
          <p className="lg:text-xl font-bold flex items-center justify-center">
            View/edit event
          </p>
          <p className="lg:text-xl font-bold flex items-center justify-center">
            Delete event
          </p>
        </div>

        <div className="container  mx-auto md:px-0 px-7 mb-10 pb-10 rounded-lg ">
          <div className="events-index-btn-container grid grid-cols-1 gap-3 p-0">
            {sortedEventsByDate &&
              sortedEventsByDate

                .filter((event, index) => {
                  var startDate = new Date(
                    new Date(dateFilter?.startDate).setHours(0)
                  );
                  var endDate = new Date(
                    new Date(dateFilter?.endDate).setHours(23)
                  );
                  if (startDate !== null && endDate !== null) {
                    let filterPass = true;
                    const date = new Date(event.supportmeetingdate);
                    console.log(startDate, date);
                    if (dateFilter.startDate) {
                      filterPass = filterPass && startDate <= date;
                    }
                    if (dateFilter.endDate) {
                      filterPass = filterPass && endDate >= date;
                    }
                    console.log(filterPass);

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
                      <section className="hidden sm:block">
                        <div
                          key={index}
                          className={`grid ${
                            loggedUserRole === "Supervisor"
                              ? "supervisor-existing-events-head-table"
                              : "existing-events-head-table"
                          } bg-white gap-5 px-7 py-4  rounded-md shadow-md`}
                        >
                          {/* <div className="flex items-center lg:text-xl font-bold ">{event.programname}</div> */}
                          <div className="flex items-center lg:text-xl font-bold mr-2">
                            {
                              event.supportmeetingdate &&
                                new Date(
                                  event?.supportmeetingdate
                                ).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                              /* crearFecha2(event) */
                            }
                          </div>
                          <div className="flex items-center lg:text-xl font-bold truncate">
                            {event.supportgroupname}
                          </div>
                          <div className="flex items-center lg:text-xl font-bold justify-center">
                            {event.supportgrouptopic}
                          </div>
                          <Link href={`/supportGroups/${event.id}/edit`}>
                            <a className="flex items-center justify-center">
                              <img
                                src="/edit-icon.svg"
                                alt="edit event icon"
                                title="Edit event"
                              />
                            </a>
                          </Link>

                          {/* {loggedUserRole === "Supervisor" && ( */}
                          <div className="flex justify-center">
                            <button
                              className="py-2"
                              onClick={() =>
                                handleDeleteEvent(
                                  event?.id,
                                  event?.supportgrouptopic
                                )
                              }
                              title="Delete event"
                            >
                              <img
                                src="/delete-icon.svg"
                                alt="delete icon"
                                width="25px"
                              />
                            </button>
                          </div>
                          {/* )} */}
                        </div>
                      </section>
                    </>
                  );
                })}
          </div>
          {showDeleteEventModal && (
            <DeleteSupportGroupEvent
              setShowDeleteEventModal={setShowDeleteEventModal}
              showDeleteEventModal={showDeleteEventModal}
              selectedEventToDelete={selectedEventToDelete}
              id={selectedEventToDelete.id}
            />
          )}
        </div>
      </div>
      {/*  HEAD TABLE  */}
    </Layout>
  );
};

export default PastEvents;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups`
    );
    const events = await response.json();

    return { props: { events } };
  },
});
