import React, { useState } from "react";
import axios from "axios";

const ProfilePageBaselineData = ({ impactBaseline, loggedUserRole, impactTracker }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [form, setForm] = useState({
    impact_trackerID: "",
    barrierhivprimarycare: "",
    CD4Count: "",
    viralLoadCount: "",
    unsafesexualbehavior: "",
    substanceabuse: "",
    unstablehousing: "",
    legalissues: "",
    unstableemployment: "",
  });
  const tableLeftHeaders = [
    {
      text_field: "Barriers to accessing HIV primary care",
      ddbb_label: "barrierhivprimarycare",
    },
    {
      text_field: "CD4 Count",
      ddbb_label: "CD4Count",
    },
    {
      text_field: "Viral Load Count",
      ddbb_label: "viralLoadCount",
    },
    {
      text_field: "Engaging in unsafe sexual behavior",
      ddbb_label: "unsafesexualbehavior",
    },
    {
      text_field: "Problems with substance use",
      ddbb_label: "substanceabuse",
    },
    {
      text_field: "An unstable housing situation",
      ddbb_label: "unstablehousing",
    },
    {
      text_field: "Legal and identity documentation issues",
      ddbb_label: "legalissues",
    },
    {
      text_field: "Unstable employment situation",
      ddbb_label: "unstableemployment",
    },
  ];
  // const impactTrackerArray = [
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: ">50",
  //     CD4Count: "",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "Improved",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "Yes",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Stayed the same",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: ">50",
  //     CD4Count: "100-500",
  //     impactformstartdate: "2022-09-24T00:00:00.000Z",
  //     legalissues: "Improved",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "No",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Stayed the same",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: ">50",
  //     CD4Count: "100-500",
  //     impactformstartdate: "2022-10-24T00:00:00.000Z",
  //     legalissues: "Improved",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "No",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Stayed the same",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: "50+",
  //     CD4Count: "100-500",
  //     impactformstartdate: "2022-11-24T00:00:00.000Z",
  //     legalissues: "Improved",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "No",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Stayed the same",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: "50+",
  //     CD4Count: "100-500",
  //     impactformstartdate: "2022-12-24T00:00:00.000Z",
  //     legalissues: "Stayed the same",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "Yes",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Improved",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     viralLoadCount: "50+",
  //     CD4Count: "100-500",
  //     impactformstartdate: "2023-01-24T00:00:00.000Z",
  //     legalissues: "Worsened",
  //     substanceabuse: "Improved",
  //     unsafesexualbehavior: "No",
  //     unstableemployment: "Improved",
  //     unstablehousing: "Improved",
  //   },
  // ];
  console.log(form);
  const updateTracker = () => {
    try {
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
      .then((res) => {
        console.log(res);
        setSelectedTrackIndex(null);
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
              
              {impactTracker?.length >= 1 ?
                impactTracker.map((track, index) => (
                  <>
                    <th
                      scope="col"
                      className="text-center py-3 px-6 "
                    >
                      Date:{" "}
                      {new Date(track.impactformstartdate).toLocaleDateString(
                        "en",
                        { year: "numeric", month: "numeric", day: "numeric" }
                      )}
                    </th>
                  </>
                ))
               :
               (<>
                     <td scope="col"
                       className="text-center py-3 px-6 bg-black">-</td>
                     <td scope="col"
                       className="text-center py-3 px-6 bg-black">-</td>
                     <td scope="col"
                       className="text-center py-3 px-6 bg-black">-</td>
                     <td scope="col"
                       className="text-center py-3 px-6 bg-black">-</td>
               </>)
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
                    {impactBaseline.length === 1?
                     impactBaseline.map(
                        (e, i, array) => (
                          <div key={i}>
                            <td className={`text-center text-base `} key={i}>
                              <div
                                className="text-center"
                                onKeyUp={(e) =>
                                  setForm({
                                    ...form,
                                    [header.ddbb_label]: e.target.innerText,
                                  })
                                }
                                contentEditable={selectedTrackIndex === i}
                              >
                                {e[header.ddbb_label] 
                                 === true
                                   ? "Yes"
                                   : e[header.ddbb_label] === false ? "No" : 
                                   e[header.ddbb_label]
                                  }
                              </div>
                            </td>
                          </div>
                        )
                      ) :
                      (
                        <>
                        <td className={`text-center text-base `}>
                          <div
                            className="text-center"
                            onKeyUp={(e) =>
                              setForm({
                                ...form,
                                [header.ddbb_label]: e.target.innerText,
                              })
                            }
                            // contentEditable={selectedTrackIndex === i}
                          >
                            
                          </div>
                        </td>
                      </>
                      )}
                    {/* TRACKER COLUMNS */}
                    {impactTracker?.length >= 1 ?
                      impactTracker.map(
                        (e, i, array) => (
                          <>
                            <td className={`text-center text-base `}>
                              <div
                                className="text-center"
                                onKeyUp={(e) =>
                                  setForm({
                                    ...form,
                                    [header.ddbb_label]: e.target.innerText,
                                  })
                                }
                                contentEditable={selectedTrackIndex === i}
                              >
                                {e[header.ddbb_label]}
                              </div>
                            </td>
                          </>
                        )
                      )
                     :
                     (<>
                     <td className="text-center tezt-base">-</td>
                     <td className="text-center tezt-base">-</td>
                     <td className="text-center tezt-base">-</td>
                     <td className="text-center tezt-base">-</td>
                    </>)
                    }
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