import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProfilePageBaselineData = ({
  impactBaseline,
  loggedUserRole,
  impactTracker,
  notifyMessage,
  clientUniqueId,
  clientId
}) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [baselineEdit, setBaselineEdit] = useState(false);
  const initialState = {
    id: "",
    clientuniqueid: clientUniqueId,
    barrierhivprimarycare: "",
    cd4count: "",
    viralloadcount: "",
    unsafesexualbehavior: "",
    substanceabuse: "",
    unstablehousing: "",
    legalissues: "",
    // unstableemployment: "",
  };
  const [form, setForm] = useState({
    clientuniqueid: clientUniqueId,
  });
  const [baselineForm, setBaselineForm] = useState({
    clientuniqueid: clientUniqueId,
  });
  const router = useRouter();
  useEffect(() => {
    // console.log("index selected is", baselineEdit);
    //fill form with actual tracker selected by index
    selectedTrackIndex >= 0 
      ? setForm(impactTracker[selectedTrackIndex])
      : setForm(initialState);

    baselineEdit ? setBaselineForm(impactBaseline[0]) : setBaselineForm(initialState);
  }, [selectedTrackIndex, baselineEdit]);


  const tableLeftHeaders = [
    {
      text_field: "Barriers to accessing HIV primary care",
      ddbb_label: "barrierhivprimarycare",
      baseline_options: ["Yes", "No", "N/A"],
      options: ["Improved", "Unchanged", "Worsened", "N/A", "-"],
    },
    {
      text_field: "CD4 Count",
      ddbb_label: "cd4count",
      baseline_options: ["Low", "High", "N/A"],
      options: ["<100", "100-500", "500+", "N/A", "-"],
    },
    {
      text_field: "Viral Load Count",
      ddbb_label: "viralloadcount",
      baseline_options: ["Low", "High", "N/A"],
      options: ["<50", "51-200","200+", "N/A", "-"],
    },
    {
      text_field: "Engaging in unsafe sexual behavior",
      ddbb_label: "unsafesexualbehavior",
      baseline_options: ["Yes", "No"],
      options: ["Yes", "No", "N/A", "-"],
    },
    {
      text_field: "Problems with substance use",
      ddbb_label: "substanceabuse",
      baseline_options: ["Yes", "No"],
      options: ["Improved", "Unchanged", "Worsened", "N/A", "-"],
    },
    {
      text_field: "An unstable housing situation",
      ddbb_label: "unstablehousing",
      baseline_options: ["Yes", "No"],
      options: ["Improved", "Unchanged", "Worsened", "N/A", "-"],
    },
    {
      text_field: "Legal and identity documentation issues",
      ddbb_label: "legalissues",
      baseline_options: ["Yes", "No"],
      options: ["Improved", "Unchanged", "Worsened", "N/A", "-"],
    },
    // {
    //   text_field: "Unstable employment situation",
    //   ddbb_label: "unstableemployment",
    //   baseline_options: ["Yes", "No"],
    //   options: ["Improved", "Unchanged", "Worsened", "N/A"],
    // },
  ];
  const showBaselineResult = (value) => {
    switch (value) {
      case false:
        return "No";
        break;
      case true:
        return "Yes";
        break;
      case "N/A":
        return "N/A";
        break;
      case null:
        return "-";
        break;
      case "":
        return "-";
        break;
      default:
        return value;
        break;
    }
    
  };
  const updateTracker = () => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker/tracker/update/${clientUniqueId}`,
          form
        )
        .then((res) => {
          notifyMessage();
          setForm(initialState); // restart form to avoid misc values from different trackers
          setSelectedTrackIndex(null);
          setTimeout(() => router.reload(), 1500);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const updateBaseline = () => {
    // console.log(form);
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_baseline/tracker/${clientUniqueId}`,
          baselineForm
        )
        .then((res) => {
          console.log(res);
          notifyMessage();
          setBaselineForm(initialState); // restart form to avoid misc values from different trackers
          setBaselineEdit(false);
          setTimeout(() => router.reload(), 1500);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="overflow-x-auto mx-auto container shadow-md sm:rounded-lg">
        <table className="w-full text-base">
          <thead className="">
            <tr>
              <th scope="col" className=" py-3 px-6 bg-client-profile-pn-heading text-bold table-headings text-black">
                Key outcomes
              </th>
              <th scope="col" className="py-3 px-6 bg-client-profile-pn-heading text-bold table-headings text-black">
                Baseline scores
              </th>


              {
                impactTracker &&
                  impactTracker.map((track, index) => (
                    <>
                      <th scope="col" className="text-center py-3 px-6 bg-client-profile-pn-heading text-bold table-headings text-black">
                        Date:{" "}
                        {new Date(track.impactformstartdate).toLocaleDateString(
                          "en",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )}
                      </th>
                    </>
                  ))
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
              Object.values(tableLeftHeaders).map((header,index) => (
                //ROW LEFT HEADERS
                <>
                  <tr className="">
                    <td
                      scope="row"
                      className={`py-4 px-6  text-bold text-xl text-black font-medium  whitespace-nowrap ${(index%2)===0 ? 'bg-light-gray':'bg-blue-50'}`}
                    >
                      {header.text_field}
                    </td>

                    {/* BASELINE COLUMN */}
                    {impactBaseline.length === 1 ? (
                      impactBaseline.map((e, i, array) => (
                        // <td className={`text-center text-base `} key={i}>
                        // {e[header.ddbb_label] === true
                        //   ? "Yes"
                        //   : e[header.ddbb_label] === false
                        //   ? "No"
                        //   : e[header.ddbb_label] === null
                        //   ? "-" : e[header.ddbb_label]}
                        // </td>
                        <>
                          {loggedUserRole === "Supervisor" ? (
                            <>
                              <td className={`text-center text-base `}>
                                <select
                                  name={header.ddbb_label}
                                  onChange={(e) =>
                                    setBaselineForm((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }))
                                  }
                                  disabled={!baselineEdit}
                                  className="text-center py-2 rounded w-4/5 "
                                >
                                  {header.baseline_options.map((option,index) => (
                                    <>
                                      <option
                                        value={option}
                                        selected={
                                          option === showBaselineResult(e[header.ddbb_label])
                                        }
                                      >
                                          {option}
                                      </option>
                                    </>
                                  ))}
                                </select>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`text-center text-base `}>
                                {showBaselineResult(e[header.ddbb_label])}
                              </td>
                            </>
                          )}
                        </>
                      ))
                    ) : (
                      <>
                        <td className={`text-center text-base `}>-</td>
                      </>
                    )}
                    {/* TRACKER COLUMNS */}
                    {impactTracker &&
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
                                  className={`text-center py-2 rounded w-4/5 ${(i%2)===0 ? 'bg-light-gray':'bg-blue-50'}` }
                                >
                                  {header.options.map((option) => {
                                    return (
                                      <>
                                        <option
                                          value={option}
                                          selected={
                                            showBaselineResult(e[header.ddbb_label]) === option
                                          }
                                        >
                                          {option}
                                        </option>
                                      </>
                                    )
                                  })}
                                </select>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`text-center text-base `}>
                                {showBaselineResult(e[header.ddbb_label])}
                              </td>
                            </>
                          )}
                        </>
                      ))}
                  </tr>
                </>
              ))}

            {/* //EDIT BUTTONS */}
            {loggedUserRole === "Supervisor" && (
              <>
                <tr>
                  <td
                    scope="row"
                    className="py-4 px-6  text-bold text-xl text-black font-medium  whitespace-nowrap "
                  ></td>
                  <td
                    scope="row"
                    className="py-4 px-6  text-bold text-xl text-black font-medium text-center  whitespace-nowrap"
                  >
                    {impactBaseline.length < 1 ? "" : baselineEdit  ? (
                      <button
                        onClick={updateBaseline}
                        className="text-white bg-black px-5 py-1 rounded shadow"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={(e) => setBaselineEdit(true)}
                        className="text-white bg-black px-5 py-1 rounded shadow"
                      >
                        Edit
                      </button>
                    )}
                  </td>

                  {impactTracker &&
                    impactTracker.map((e, index) => (
                      <>
                        <td
                          scope="row"
                          className="py-4 px-6  text-bold text-xl text-black font-medium text-center  whitespace-nowrap "
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
