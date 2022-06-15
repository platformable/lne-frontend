import React from 'react'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {

  const { user, error, isLoading } = useUser();
  
  return (
     <header className="border-b">
        <div className="container mx-auto py-5  grid space-between grid-cols-2 px-5 md:px-0">
          <Link href="/dashboard"><img src="../../../../logo.png" alt="" width={125} className="cursor-pointer" /></Link>
          <div id="head-user" className="grid place-items-end">
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
      </header>
  )
}
