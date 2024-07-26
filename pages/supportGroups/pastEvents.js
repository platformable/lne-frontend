import React, { useState, useRef } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import BackButton from "../../components/BackButton";
import BackToDashboardButton from "../../components/BackToDashboardButton";
import DeleteSupportGroupEvent from "../../components/DeleteSupportGroupEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubHeader from "../../components/SubHeader";

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

  const sortedEventsByDate = events.sort(
    (a, b) => new Date(b.supportmeetingdate) - new Date(a.supportmeetingdate)
  );

  return (
    <Layout showStatusHeader={true}>
      <ToastContainer autoClose={3000} />
      <SubHeader pageTitle={'Support Group Past Events'}/>

      <div className="py-10  shadow-inner">
        <div className="bg-white rounded-md shadow-md container mx-auto"> 
        <div className="container mx-auto bg-white rounded-tl-md rounded-tr-md px-7 shadow-md">
          <div className="grid lg:grid-cols-2 pb-5 justify-between ">
            <div className="flex items-center gap-x-3 py-10 pr-5 pb-10 self-start ">
              <img
                src="/support_groups/Past_group_events.png"
                alt="part group event icons"
                className="grid items-center self-start"
              />
              <h1 className="font-bold text-2xl">Past Group Events</h1>
            </div>


         

            <div className="container mx-auto grid  items-center grid-cols-1 md:px-0 px-5 md:gap-5">
              <div className="block md:flex xl:justify-end md:px-0 lg:col-start-4 py-5 md:py-0  mr-0">
                <h3 className="text-xl">Filter by date</h3>
              </div>

              <div className="block md:flex flex gap-y-5 md:flex-row gap-x-5 lg:col-end-6 items-center md:my-0">
                <label className="w-full">
                  <input
                    type="date"
                    ref={ref}
                    id="start"
                    placeholder="start date"
                    onChange={(e) => {
                      setDateFilter({
                        ...dateFilter,
                        startDate: e.target.value,
                      });
                      // dispatch(
                      //   updateStartDate({ ...dateFilter, startDate: e.target.value })
                      // );
                    }}
                    // defaultValue={startDate}
                    className="border-black rounded-md py-1 px-2  w-full"
                  />
                </label>
                <h3 className="text-left md:text-center text-xl md:py-0">
                  and
                </h3>
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
          </div>
        </div>

        <div className="container  mx-auto md:px-0 px-7 mb-10 pb-7 ">
          <div className="px-7 bg-white">
            <div
              className={`hidden md:grid ${
                loggedUserRole === "Supervisor"
                  ? "grid-cols-[1.3fr_2fr_4.5fr_1.3fr_1.3fr]"
                  : `grid-cols-[1.3fr_2fr_4.5fr_1.3fr]`
              } container mx-auto gap-x-1 `}
            >
              {/* <p className="lg:text-xl font-bold flex items-center ">Program</p> */}
              <p className="font-bold  flex items-center text-xl  bg-support-groups-table-heading py-2  px-3">
                Event date
              </p>
              <p className="font-bold  flex items-center text-xl   bg-support-groups-table-heading py-2 px-3">
                Name of Group
              </p>
              <p className="font-bold  flex items-center text-xl  bg-support-groups-table-heading py-2 px-3">
                Discussion topic
              </p>
              <p className="font-bold  flex items-center text-xl justify-center bg-support-groups-table-heading py-2 px-3">
                View/edit event
              </p>
              {
                loggedUserRole === 'Supervisor' ? (
              <p className="font-bold  flex items-center text-xl justify-center bg-support-groups-table-heading py-2 px-3">
                Delete event
              </p>

                ):''
              }
            </div>
          </div>
          <div className="">
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

                    if (dateFilter.startDate) {
                      filterPass = filterPass && startDate <= date;
                    }
                    if (dateFilter.endDate) {
                      filterPass = filterPass && endDate >= date;
                    }
                    return filterPass;
                  }
                })
                .map((event, index) => {
                  return (
                    <section className="hidden sm:block container mx-auto" key={index}>
                      <div className="px-7 bg-white">
                        <div
                          className={`hidden md:grid ${
                            loggedUserRole === "Supervisor"
                            ? "grid-cols-[1.3fr_2fr_4.5fr_1.3fr_1.3fr]"
                            : `grid-cols-[1.3fr_2fr_4.5fr_1.3fr]`
                          } container mx-auto bg-white  ${
                            index % 2 === 0 ? "bg-light-gray" : "bg-blue-50"
                          }`}
                        >
                          {/* <p className="lg:text-xl font-bold flex items-center ">Program</p> */}
                          <p className="flex items-center p-3 text-lg">
                            {event.supportmeetingdate &&
                              new Date(
                                event?.supportmeetingdate
                              ).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                          </p>
                          <p className="flex items-center p-3 text-lg">
                            {event.supportgroupname}
                          </p>
                          <p className="flex items-center p-3 text-base">
                            {event.supportgrouptopic}
                          </p>
                          <p className="flex items-center justify-center p-1">
                            <Link href={`/supportGroups/${event.id}/edit`}>
                              <a className="flex items-center justify-center">
                                <img
                                  src="/edit.svg"
                                  alt="edit event icon"
                                  title="Edit event"
                                />
                              </a>
                            </Link>
                          </p>
                         
                          {
                loggedUserRole === 'Supervisor' ? (
                  <p className="flex items-center justify-center p-1">
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
                      src="/delete_client_black_icon.svg"
                      alt="delete icon"
                      width="25px"
                    />
                  </button>
                </p>

                ):''
              }
                        </div>
                      </div>
                    </section>
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
        {/* container */}
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
