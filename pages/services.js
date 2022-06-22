import React from "react";
import backIcon from "../public/BACKicon.svg";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import ChartGraphic from "../components/ChartGraphic";

const Services = () => {
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

          <div className="graphic-metrics grid grid-cols-1 bg-light-blue shadow gap-1 my-3 mx-3 md:mx-0">
            <div className="grid grid-cols-2 gap-9 bg-white py-2 px-5">
              <h2 className="font-bold">
                Are We Meeting Funding Requirements?
              </h2>
              <div className="">
                Data for the:
                <div className="text-xs flex justify-between">
                  <span className="mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0">
                    <input
                      className="mr-1 md:mr-2"
                      type="radio"
                      name="month"
                      value={true}
                    />
                    <label>Month</label>
                  </span>
                  <span className="mx-7 md:mx-3 lg:mr-4 xl:mx-6">
                    <input
                      className="mx-1 md:mr-2"
                      type="radio"
                      name="year"
                      value={false}
                    />
                    <label>Year</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-1">
              <div className=" bg-white px-5 py-2">
                <ChartGraphic />
              </div>
              <div className=" bg-white px-5 py-2">
                <ChartGraphic />
              </div>
            </div>
          </div>

          <div className="key-metrics grid grid-cols-1 gap-1 bg-light-blue shadow mx-3 md:mx-0">
            <div className="grid grid-cols-2 gap-9 bg-white py-2 px-5">
              <h2 className="font-bold">Key Metrics</h2>
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
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  45
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  Average # of days between client visits
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  18
                </p>
              </div>
              <div className="grid grid-rows-2">
                <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
                  Average number of client goals outstanding
                </p>
                <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
                  1.3
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

          <h1 className="font-bold px-2 md:px-0 py-5">
            What do you want <span className="bg-yellow px-2">to do</span>{" "}
            today?
          </h1>
          <div className="grid md:grid-cols-6 grid-cols-1 gap-5 px-5 md:px-0 pb-5">
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure>
                <img src=""></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR FUNDING REQUIREMENTS
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure>
                <img src=""></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR STAFF PROGRESS
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure>
                <img src=""></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR IMPACTS
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure>
                <img src=""></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR QUALITY
                </figcaption>
              </figure>
            </div>
            <div className="p-3 rounded-md bg-white shadow-md">
              <figure>
                <img src=""></img>
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
