import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const initialState = {
  id: "",
  barrierhivprimarycare: "",
  cd4count: "",
  viralloadcount: "",
  unsafesexualbehavior: "",
  substanceabuse: "",
  unstablehousing: "",
  legalissues: "",
  unstableemployment: "",

};
const ProfilePageBaselineData = ({
  impactBaseline,
  loggedUserRole,
  impactTracker,
  notifyMessage
}) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [form, setForm] = useState({});
  const router = useRouter()
  useEffect(() => {
    console.log("index selected is", selectedTrackIndex);
    //fill form with actual tracker selected by index
    selectedTrackIndex >= 0
      ? setForm(impactTracker[selectedTrackIndex])
      : setForm(initialState);
  }, [selectedTrackIndex]);
  const tableLeftHeaders = [
    {
      text_field: "Barriers to accessing HIV primary care",
      ddbb_label: "barrierhivprimarycare",
      options: ["Improved", "Unchanged", "Worsened", "N/A"],
    },
    {
      text_field: "CD4 Count",
      ddbb_label: "cd4count",
      options: [">100", "100-500", "500+", "N/A"],
    },
    {
      text_field: "Viral Load Count",
      ddbb_label: "viralloadcount",
      options: [">50", "50+", "N/A"],
    },
    {
      text_field: "Engaging in unsafe sexual behavior",
      ddbb_label: "unsafesexualbehavior",
      options: ["Yes", "No", "N/A"],
    },
    {
      text_field: "Problems with substance use",
      ddbb_label: "substanceabuse",
      options: ["Improved", "Unchanged", "Worsened", "N/A"],
    },
    {
      text_field: "An unstable housing situation",
      ddbb_label: "unstablehousing",
      options: ["Improved", "Unchanged", "Worsened", "N/A"],
    },
    {
      text_field: "Legal and identity documentation issues",
      ddbb_label: "legalissues",
      options: ["Improved", "Unchanged", "Worsened", "N/A"],
    },
    {
      text_field: "Unstable employment situation",
      ddbb_label: "unstableemployment",
      options: ["Improved", "Unchanged", "Worsened", "N/A"],
    },
  ];

  const updateTracker = () => {
    try {
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker/tracker/update/${form.clientid}`, form)
      .then((res) => {
        notifyMessage()
        setForm(initialState); // restart form to avoid misc values from different trackers
        setSelectedTrackIndex(null);
        setTimeout(() => router.reload(), 1500)
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="overflow-x-auto mx-auto container shadow-md sm:rounded-lg">
        <table className="w-full text-base">
          <thead className="text-xs text-black uppercase ">
            <tr>
              <th scope="col" className="text-center py-3 px-6 ">
                Key outcomes
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Baseline scores
              </th>

              {impactTracker?.length && (
                impactTracker.map((track, index) => (
                  <>
                    <th scope="col" className="text-center py-3 px-6 ">
                      Date:{" "}
                      {new Date(track.impactformstartdate).toLocaleDateString(
                        "en",
                        { year: "numeric", month: "numeric", day: "numeric" }
                      )}
                    </th>
                  </>
                ))
              ) 
              // : (
              //   <>
              //      <th scope="col" className="text-center py-3 px-6 ">
              //         Date:{" "}
              //         {new Date(impactTracker[0].impactformstartdate).toLocaleDateString(
              //           "en",
              //           { year: "numeric", month: "numeric", day: "numeric" }
              //         )}
              //       </th>
              //       <th scope="col" className="text-center py-3 px-6 ">
              //         Date:{" "}
              //         {new Date(impactTracker[1].impactformstartdate).toLocaleDateString(
              //           "en",
              //           { year: "numeric", month: "numeric", day: "numeric" }
              //         )}
              //       </th>
              //       <th scope="col" className="text-center py-3 px-6 ">
              //         Date:{" "}
              //         {new Date(impactTracker[2].impactformstartdate).toLocaleDateString(
              //           "en",
              //           { year: "numeric", month: "numeric", day: "numeric" }
              //         )}
              //       </th>
              //       <th scope="col" className="text-center py-3 px-6 ">
              //         Date:{" "}
              //         {new Date(impactTracker[3].impactformstartdate).toLocaleDateString(
              //           "en",
              //           { year: "numeric", month: "numeric", day: "numeric" }
              //         )}
              //       </th>
              //   </>)
              }
            </tr>
          </thead>
          <tbody>
            {tableLeftHeaders &&
              Object.values(tableLeftHeaders).map((header) => (
                //ROW LEFT HEADERS
                <>
                  <tr className="">
                    <td
                      scope="row"
                      className="py-4 px-6  text-black font-medium  whitespace-nowrap "
                    >
                      {header.text_field}
                    </td>

                    {/* BASELINE COLUMN */}
                    {impactBaseline.length === 1 ? (
                      impactBaseline.map((e, i, array) => (
                        <td className={`text-center text-base `} key={i}>
                          {e[header.ddbb_label] === true
                            ? "Yes"
                            : e[header.ddbb_label] === false
                            ? "No"
                            : e[header.ddbb_label]}
                        </td>
                      ))
                    ) : (
                      <>
                        <td className={`text-center text-base `}>
                          <div></div>
                        </td>
                      </>
                    )}
                    {/* TRACKER COLUMNS */}
                    {impactTracker?.length  && (
                      impactTracker.map((e, i, array) => (
                        <>
                          {loggedUserRole === "Supervisor" ? (
                            <>
                            <td className={`text-center text-base `}>
                            <select
                              name={header.ddbb_label}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  [e.target.name]: e.target.value,
                                }))
                              }
                              disabled={selectedTrackIndex !== i}
                              className="text-center py-2 rounded w-4/5 "
                            >
                              {header.options.map((option) => (
                                <>
                                  <option
                                    value={option}
                                    selected={e[header.ddbb_label] === option}
                                  >
                                    {option}
                                  </option>
                                </>
                              ))}
                            </select>
                            </td>
                            </>
                          ) : 
                          (
                            <>
                            <td className={`text-center text-base `}>
                              {e[header.ddbb_label]}
                            </td>
                            </>
                          )}
                        </>
                      ))
                    )}
                  </tr>
                </>
              ))}

            {/* //EDIT BUTTONS */}
            {loggedUserRole === "Supervisor" && (
              <>
                <tr>
                  <td
                    scope="row"
                    className="py-4 px-6  text-black font-medium  whitespace-nowrap "
                  ></td>
                  <td
                    scope="row"
                    className="py-4 px-6  text-black font-medium  whitespace-nowrap "
                  ></td>

                  {impactTracker &&
                    impactTracker.map((e, index) => (
                      <>
                        <td
                          scope="row"
                          className="py-4 px-6  text-black font-medium text-center  whitespace-nowrap "
                        >
                          {selectedTrackIndex === index ? (
                            <button
                              onClick={updateTracker}
                              className="text-white bg-black px-5 py-1 rounded shadow"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={(e) => setSelectedTrackIndex(index)}
                              className="text-white bg-black px-5 py-1 rounded shadow"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </>
                    ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfilePageBaselineData;
