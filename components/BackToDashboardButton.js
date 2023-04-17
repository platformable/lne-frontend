import React from "react";
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function BackToDashboardButton() {
  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];
  const router = useRouter();
  return (
    <button
      onClick={() =>
        loggedUserRole === "Supervisor"
          ? router.push("/supervisorDashboard")
          : router.push("/dashboard")
      }
      className="bg-yellow py-2 w-60 rounded px-5 items-center grid grid-cols-3 shadow-lg"
    >
      <img src="/dashboard_icon.svg" alt="" width={20} />
      <div className="">
        <p className="text-lg"> Dashboard</p>
      </div>
      <div></div>
    </button>
  );
}
