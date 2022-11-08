import React from 'react'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Head from 'next/head'

export default function Header() {

  const { user, error, isLoading } = useUser();
  
  return (
     <header className="border-b bg-white">
      <Head>
        <title>LNE APP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div className="container mx-auto py-5  grid space-between md:grid-cols-2 px-5 md:px-0 grid-cols-1">
          <Link href="/dashboard"><img src="../../../../logo.png" alt="" width={125} className="cursor-pointer" /></Link>
          <div id="head-user" className="flex gap-x-5 justify-end">
            <div className="flex gap-x-5  self-end">
            <a href="https://drive.google.com/drive/folders/1AMJ88PX0xYBTh8Xieiav_tx46ZTVmOpD?usp=sharing"
                className={`bg-yellow hover:bg-blue-300 px-10 py-2 rounded text-black inline-block  flex items-center`}
                target="_blank"
              >
                Guide
              </a>
              <a href="https://airtable.com/shrux8Xrf9Ln5kRL4"
                className={`${styles.btnIndexPage} bg-yellow hover:bg-blue-300 px-10 py-2 rounded text-black inline-block  flex items-center`}
                target="_blank"
              >
                Support
              </a>
            </div>
            <div className="grid justify-end">
              <h3 className="font-black">
              {user && user["https://lanuevatest.herokuapp.com/name"]}
            </h3>
            <h6 className="">
              {user && user["https://lanuevatest.herokuapp.com/roles"]}
            </h6>
            <Link href="/api/auth/logout">
              <a
                className={`${styles.btnIndexPage} inline-block btn-index-page text-black px-3 py-0 rounded-md`}
              >
                Logout
              </a>
            </Link>
            </div>
          </div>
        </div>
      </header>
  )
}
