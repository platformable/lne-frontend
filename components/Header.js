import React from "react";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="border-b bg-white">
      <Head>
        <title>LNE APP </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto items-center grid space-between md:grid-cols-2 px-5 md:px-0 grid-cols-1  ">
        <div className="">
          <Link href="/dashboard">
            <img
              src="../../../../logo.png"
              alt=""
              width={125}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div id="head-user" className="grid grid-cols-2 ">
          <div className="flex gap-x-5  items-center  justify-end"></div>
          <div className="flex gap-x-10 items-center  justify-end ">
            <div className="flex items-center items-end mr-5">
              
              <a
                href="https://drive.google.com/drive/folders/1AMJ88PX0xYBTh8Xieiav_tx46ZTVmOpD?usp=sharing"
                className={`flex gap-x-1 items-center`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/guide_icon.svg" className="mr-3" alt="" width={33}/>
                Guide
              </a>
            </div>

            <div className="flex items-center items-end">
             
              <a
                href="https://airtable.com/shrux8Xrf9Ln5kRL4"
                className={`flex gap-x-1 items-center`}
                target="_blank"
                rel="noreferrer"
              >
                 <img src="/help_icon.svg" className="mr-3" alt="" width={30}/>
                Help
              </a>
            </div>

            <div className="border-l-2 px-5 py-1 ml-3">
              <div className="">
                <div className="flex gap-x-2">
                  <img src="/user_top_menu.svg" alt="" width={40}/>
                  <div>
                  <h3 className="">
                    {user && user["https://lanuevatest.herokuapp.com/name"]}
                  </h3>
                  <h6 className="">
                    {user && user["https://lanuevatest.herokuapp.com/roles"]}
                  </h6>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/api/auth/logout">
              <a
                className={`${styles.btnIndexPage} inline-block btn-yellow text-black px-10 py-1 rounded-md shadow-lg`}
              >
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
