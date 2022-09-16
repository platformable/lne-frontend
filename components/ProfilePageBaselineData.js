import React from "react";

const ProfilePageBaselineData = ({ impactBaseline }) => {
  const tableLeftHeaders = {
    barrierHIVPrimaryCare: "Barriers to accessing HIV primary care",
    viralLoadCount: "Viral Load Count",
    CD4Count: "CD4 Count",
    unsafeSexualBehavior: "Engaging in unsafe sexual behavior",
    substanceAbuse: "Problems with substance use",
    legalIssues: "Legal and identity documentation issues",
    unstableEmployment: "Unstable employment situation",
    unstableHousing: "An unstable housing situation",
  };
  // const impactBaseline = [
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },
  //   {
  //     barrierhivprimarycare: "N/A",
  //     cd4viralload: "N/A",
  //     impactformstartdate: "2022-08-24T00:00:00.000Z",
  //     legalissues: "0",
  //     mentalhealthissues: null,
  //     substanceabuse: "0",
  //     unsafesexualbehavior: "0",
  //     unstableemployment: "0",
  //     unstablehousing: "0",
  //   },

  // ];
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
              <th scope="col" className="text-center py-3 px-6">
                Date: 1 September
              </th>
              {impactBaseline &&
                impactBaseline.map((track, index) => (
                  <>
                    <th scope="col" className="text-center py-3 px-6">
                      Date:{" "}
                      {new Date(track.impactformstartdate).toLocaleDateString(
                        "en",
                        { year: "numeric", month: "numeric", day: "numeric" }
                      )}
                    </th>
                  </>
                ))}
            </tr>
          </thead>
          <tbody >
            
            <tr className=" border-b">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Barriers to accessing HIV primary care
              </td>
              <td className="text-center  text-base ">0</td>
              <td className="text-center  text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center  text-base ">
                      {e.barrieraccessingmedications}
                    </td>
                  </>
                ))}
            </tr>

            <tr className="border-b bg-light-blue">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Viral Load Count
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">{e.cd4viralload}</td>
                  </>
                ))}
            </tr>
            <tr className=" border-b  ">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Engaging in unsafe sexual behavior
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">
                      {e.unsafesexualbehavior === "0" ? "Yes" : "No"}
                    </td>
                  </>
                ))}
            </tr>
            <tr className=" border-b  ">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Problems with substance use
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">
                      {e.substanceabuse === "0" ? "Yes" : "No"}
                    </td>
                  </>
                ))}
            </tr>
            <tr className=" border-b  ">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium whitespace-nowrap"
              >
                An unstable housing situation
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">
                      {e.unstablehousing === "0" ? "Yes" : "No"}
                    </td>
                  </>
                ))}
            </tr>
            <tr className=" border-b  ">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Legal and identity documentation issues
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">
                      {e.legalissues === "0" ? "Yes" : "No"}
                    </td>
                  </>
                ))}
            </tr>
            <tr className=" border-b  ">
              <td
                scope="row"
                className="py-4 px-6  text-black font-medium  whitespace-nowrap "
              >
                Unstable employment situation
              </td>
              <td className="text-center text-base ">0</td>
              <td className="text-center text-base ">-</td>
              {impactBaseline &&
                impactBaseline.map((e) => (
                  <>
                    <td className="text-center text-base ">
                      {e.unstableemployment === "0" ? "Yes" : "No"}
                    </td>
                  </>
                ))}
            </tr>
            
          </tbody>
        </table>

      </div>

    </>
  );
};

export default ProfilePageBaselineData;
