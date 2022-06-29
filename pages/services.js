import React, { useEffect, useState } from "react";
import backIcon from "../public/BACKicon.svg";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import ChartGraphic from "../components/ChartGraphic";
import ClientsEncounterCharts from "../components/ClientsEncounterCharts";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ToogleButton from "../components/ToogleButton";

const Services = ({ clients, averageNumbers }) => {
  const [dataGraphicPeriod, setDataGraphicPeriod] = useState("Month");

  const [numberOfActiveClients, setNumberOfActiveClients] = useState({
    total: "",
    color: "",
  });

  const [averageDays, setAverageDays] = useState({ total: "", color: "" });
  const [averageGoals, setAverageGoals] = useState({ total: "", color: "" });

  const [newClientsChart, setNewClientsChart] = useState({
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
  });

  const [numberOfClientsEncounter, setNumberOfClientsEncounter] = useState({
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
  });

  const months = [
    { month: 7, total: 5 },
    { month: 8, total: 10 },
    { month: 9, total: 15 },
    { month: 10, total: 20 },
    { month: 11, total: 25 },
    { month: 12, total: 30 },
    { month: 1, total: 35 },
    { month: 2, total: 40 },
    { month: 3, total: 45 },
    { month: 4, total: 50 },
    { month: 5, may: 55 },
    { month: 6, total: 60 },
  ];
  const date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

  const clientsCount = (clients) => {
    const totalActiveClients = clients?.filter(
      (client) => client.clientactive === "1"
    ).length;
    const found = months.find((element) => element.month === currentMonth);
    const fiftyPercent = found.total / 2;
    const seventifyPercent = (found.total * 75) / 100;
    if (totalActiveClients < fiftyPercent) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-light-red",
      });
    }
    if (
      totalActiveClients > fiftyPercent &&
      totalActiveClients < seventifyPercent
    ) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-orange",
      });
    }

    if (totalActiveClients > seventifyPercent) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-middle-green",
      });
    }
  };

  const calculateAverageDays = (averageNumbers) => {
    let total = 0;
    const totalActiveClients = clients?.filter(
      (client) => client.clientactive === "1"
    ).length;

    /*   const clientsWithSAP=averageNumbers.filter((client,index)=>{
    return client.planstartdate!==null
  }) */

    const x = averageNumbers.forEach((client, index) => {
      const { planstartdate, progressnotedate } = client;

      if (progressnotedate === "" || progressnotedate === null) {
        var date1 = new Date(planstartdate);
        var date2 = new Date();
        var difference = date2.getTime() - date1.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));

        total = total + days;
      } else {
        var date1 = new Date(progressnotedate);
        var date2 = new Date();
        var difference = date2.getTime() - date1.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));

        total = total + days;
      }
    });

    let average = total / totalActiveClients;

    if (average > 30) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-light-red",
      });
    }
    if (average > 15 && average < 30) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-orange",
      });
    }
    if (average < 15) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-middle-green",
      });
    }
  };

  const calculateNumberOfGoals = (averageNumbers) => {
    let total = 0;

    const totalActiveClients = clients?.filter(
      (client) => client.clientactive === "1"
    ).length;

    const checkGoals = averageNumbers.forEach((client, index) => {
      if (
        client.goal1targetdate !== null &&
        client.goal1completiondate === null
      ) {
        total = total + 1;
      }
      if (
        client.goal2targetdate !== null &&
        client.goal2completiondate === null
      ) {
        total = total + 1;
      }
      if (
        client.goal3targetdate !== null &&
        client.goal3completiondate === null
      ) {
        total = total + 1;
      }
    });

    let average = total / totalActiveClients;
    if (average > 2.5) {
      setAverageGoals({
        ...averageGoals,
        total: averagetoFixed(1),
        color: "bg-light-red",
      });
    }
    if (average > 2.5 && average < 1.5) {
      setAverageGoals({
        ...averageGoals,
        total: average.toFixed(1),
        color: "bg-orange",
      });
    }
    if (average < 1.5) {
      setAverageGoals({
        ...averageGoals,
        total: average.toFixed(1),
        color: "bg-middle-green",
      });
    }
  };

  const chart1Data = async (averageNumbers) => {
    const clientsOfTheMonth = await averageNumbers.filter((client, index) => {
      const clientDate = new Date(client.planstartdate);
      if (dataGraphicPeriod === "Year") {
        return clientDate.getFullYear() === currentYear;
      }
      const result = clientDate.getMonth() + 1 === currentMonth;
      return result;
    });
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    let total11 = 0;
    let total12 = 0;

    const numberOfClients = clientsOfTheMonth.forEach((client, index) => {
      const planstartdate = new Date(client.planstartdate).getDate();
      if (planstartdate >= 1 && planstartdate <= 7) {
        total1 = total1 + 1;
      }
      if (planstartdate >= 8 && planstartdate <= 14) {
        total2 = total2 + 1;
      }
      if (planstartdate >= 15 && planstartdate <= 22) {
        total3 = total3 + 1;
      }
      if (planstartdate >= 23 && planstartdate <= 30) {
        total4 = total4 + 1;
      }
      setNewClientsChart({
        ...newClientsChart,
        group1: total1,
        group2: total2,
        group3: total3,
        group4: total4,
      });
    });
    const numberOfClientsPerMonth = clientsOfTheMonth.forEach(
      (client, index) => {
        const planstartdate = new Date(client.planstartdate).getMonth();
        const fn = (number) => {
          const x = {
            1: () => total1 + 1,
            2: () => total2 + 1,
            3: () => total3 + 1,
            4: () => total4 + 1,
            5: () => total5 + 1,
            6: () => total6 + 1,
            7: () => total7 + 1,
            8: () => total8 + 1,
            9: () => total9 + 1,
            10: () => total10 + 1,
            11: () => total11 + 1,
            12: () => total12 + 1,
          };
          return x[number];
        };
        fn(planstartdate);
        setNewClientsChart({
          ...newClientsChart,
          group1: total1,
          group2: total2,
          group3: total3,
          group4: total4,
          group5: total5,
          group6: total6,
          group7: total7,
          group8: total8,
          group9: total9,
          group10: total10,
          group11: total11,
          group12: total12,
        });
      }
    );
    if (dataGraphicPeriod === "Year") return numberOfClientsPerMonth;
    return numberOfClients;
  };

  const clientsWithProgressNotes = averageNumbers?.filter((client, index) => {
    return client.progressnotedate !== null;
  });

  const chart2Data = async (averageNumbers) => {
    const activeProgressNotes = await clientsWithProgressNotes.filter(
      (client, index) => {
        const clientDate = new Date(client.planstartdate);
        if (dataGraphicPeriod === "Year") {
          return clientDate.getFullYear() === currentYear;
        }
        const result = clientDate.getMonth() + 1 === currentMonth;
        return result;
      }
    );
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    let total11 = 0;
    let total12 = 0;
    const numberOfClients = activeProgressNotes.forEach((client, index) => {
      const progressnotedate = new Date(client.progressnotedate).getDate();
      if (progressnotedate >= 1 && progressnotedate <= 7) {
        total1 = total1 + 1;
      }
      if (progressnotedate >= 8 && progressnotedate <= 14) {
        total2 = total2 + 1;
      }
      if (progressnotedate >= 15 && progressnotedate <= 22) {
        total3 = total3 + 1;
      }
      if (progressnotedate >= 23 && progressnotedate <= 30) {
        total4 = total4 + 1;
      }
      console.log(total1, total2, total3, total4);
      setNumberOfClientsEncounter({
        ...numberOfClientsEncounter,
        group1: total1,
        group2: total2,
        group3: total3,
        group4: total4,
      });
    });
    const numberOfClientsEnconuntersPerMonth = activeProgressNotes.forEach(
      (client, index) => {
        const planstartdate = new Date(client.planstartdate).getMonth();
        const fn = (number) => {
          const x = {
            1: () => total1 + 1,
            2: () => total2 + 1,
            3: () => total3 + 1,
            4: () => total4 + 1,
            5: () => total5 + 1,
            6: () => total6 + 1,
            7: () => total7 + 1,
            8: () => total8 + 1,
            9: () => total9 + 1,
            10: () => total10 + 1,
            11: () => total11 + 1,
            12: () => total12 + 1,
          };
          return x[number];
        };
        fn(planstartdate);
        setNumberOfClientsEncounter({
          ...numberOfClientsEncounter,
          group1: total1,
          group2: total2,
          group3: total3,
          group4: total4,
          group5: total5,
          group6: total6,
          group7: total7,
          group8: total8,
          group9: total9,
          group10: total10,
          group11: total11,
          group12: total12,
        });
      }
    );
    if (dataGraphicPeriod === "Year") return numberOfClientsEnconuntersPerMonth;
    return numberOfClients;
  };

  useEffect(() => {
    clientsCount(clients);
    calculateAverageDays(averageNumbers);
    calculateNumberOfGoals(averageNumbers);
    chart1Data(averageNumbers);
    chart2Data(averageNumbers);
  }, [dataGraphicPeriod]);
  return (
    <Layout>
      <div className="bg-light-blue">
        <section className="container mx-auto grid-cols-1 gap-5">
          <div className="grid grid-cols-2 py-5">
            <h1 className="font-bold px-2">Manage Services</h1>

            <Link href="/dashboard">
              <a
                className="px-5 py-2 flex  items-center font-bold justify-self-end"
                id="myBtn"
              >
                <Image src={backIcon} alt="back arrow to homepage" />
                <p className="ml-2">back to homepage</p>
              </a>
            </Link>
          </div>

          {/* KEY METRICS */}

          <div className="key-metrics grid grid-cols-1 gap-1 bg-light-blue shadow mx-3 md:mx-0">
            <div className="grid grid-cols-2 gap-9 bg-white py-2 px-5">
              <div className="flex">
                <img src="/supervisor/key-metrics.svg" />
                <h2 className="font-bold ml-3">Key Metrics</h2>
              </div>
              <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-2 md:w-5/6 md:justify-self-end">
                <p className="font-bold px-3 text-center py-2 bg-middle-green">
                  on track
                </p>
                <p className="font-bold px-3 text-center py-2 bg-orange">
                  warning
                </p>
                <p className="font-bold px-3 text-center py-2 bg-light-red">
                  alert
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-1 md:px-1 md:pb-1 .bg-middle-white shadow-md">
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  Number of active clients
                </p>
                <p
                  className={`${
                    numberOfActiveClients
                      ? numberOfActiveClients.color
                      : "bg-white"
                  } flex items-center justify-center text-2xl font-bold`}
                >
                  {numberOfActiveClients ? numberOfActiveClients.total : "0"}
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  Average # of days between client visits
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  {averageDays ? averageDays.total : "0"}
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  Average number of client goals outstanding
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  {averageGoals ? averageGoals.total : "0"}
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  % of clients who say they have reduced unsafe sexual behavior
                  after 3 months
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  72%
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  % of clients who say they are undetectable after 3 months
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  63%
                </p>
              </div>
            </div>
          </div>

          {/* KEY METRICS */}

          <div className="graphic-metrics grid grid-cols-1 bg-light-blue shadow gap-1 my-3 mx-3 md:mx-0">
            <div className="grid grid-cols-2 gap-9 bg-white py-2 px-5">
              <div className="flex">
                <img src="/supervisor/meeting-funding.svg" />
                <h2 className="font-bold ml-3">
                  Are We Meeting Funding Requirements?
                </h2>
              </div>
              <ToogleButton
                dataGraphicPeriod={dataGraphicPeriod}
                setDataGraphicPeriod={setDataGraphicPeriod}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-1">
              <div className=" bg-white px-5 py-2">
                <ChartGraphic
                  chartData={newClientsChart}
                  dataGraphicPeriod={dataGraphicPeriod}
                />
              </div>
              <div className=" bg-white px-5 py-2">
                <ClientsEncounterCharts
                  numberOfClientsEncounter={numberOfClientsEncounter}
                  dataGraphicPeriod={dataGraphicPeriod}
                />
              </div>
            </div>
          </div>

          <h1 className="font-bold px-2 md:px-0 py-5">
            What do you want <span className="bg-yellow px-2">to do</span>{" "}
            today?
          </h1>
          <div className="grid md:grid-cols-7 grid-cols-1 gap-5 px-5 md:px-0 pb-5">
            <div className="p-3 rounded-md bg-white shadow-md cursor-pointer">
              <Link href={"/monitorFunding"}>
              <figure className="flex flex-col items-center">
                <img  
                  src="/supervisor/monitor-staff-progres.svg"
                  className="mb-5"
                  alt="monitor STAFF PROGRESS"></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR FUNDING REQUIREMENTS
                </figcaption>
              </figure>
              </Link>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-staff-progres.svg"
                  className="mb-5"
                  alt="monitor STAFF PROGRESS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR STAFF PROGRESS
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-impacts-icon.svg"
                  className="mb-1"
                  alt="monitor IMPACTS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR IMPACTS
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-quality-icon.svg"
                  className="mb-5"
                  alt="monitor QUALITY"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR QUALITY
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/plan-for-community-needs-icon.svg"
                  className="mb-5"
                  alt="monitor COMMUNITY NEEDS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  PLAN FOR COMMUNITY NEEDS
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [clients, averageNumbers] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/manage_services/manage_services_metric`
      ).then((r) => r.json()),
    ]);
    return { props: { clients: clients, averageNumbers: averageNumbers } };
  },
});
