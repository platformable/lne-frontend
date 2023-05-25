import React from "react";

export default function ThreeColumnsTable({ data }) {
  const calculate = (data, value) => {
    let total = 0;
    data?.forEach((item) => {
      total += item[value];
      if (value==='transwoman'){
        console.log(value,item[value])
      }
    });
    return total;
  };

  const gender = [
    { id: 1, gender: "Men", calculate: calculate(data, "men") },
    { id: 2, gender: "Women", calculate: calculate(data, "women") },
    { id: 3, gender: "Trans men", calculate: calculate(data, "transmen") },
    { id: 4, gender: "Trans woman", calculate: calculate(data, "transwomen") },
    {
      id: 5,
      gender: "People accessing resources (gender not-specified)",
      calculate: calculate(data, "gendernotspecified"),
    },
  ];

  const ethnicity = [
    { id: 1, ethnicity: "Hispanic", calculate: calculate(data, "hispanic") },
    {
      id: 2,
      ethnicity: "African-American people",
      calculate: calculate(data, "africanamerican"),
    },
    {
      id: 3,
      ethnicity: "Caucasian people",
      calculate: calculate(data, "caucasian"),
    },
    { id: 4, ethnicity: "Asian people", calculate: calculate(data, "asian") },
    {
      id: 5,
      ethnicity: "People accessing resources (race/ethnicity not-specified)",
      calculate: calculate(data, "raceethnicitynotspecified"),
    },
  ];

  const age = [
    {
      id: 1,
      age: "People aged 19 - 24",
      calculate: calculate(data, "aged19_24"),
    },
    {
      id: 2,
      age: "People aged 25 - 34",
      calculate: calculate(data, "aged25_35"),
    },
    {
      id: 3,
      age: "People aged 35 - 44",
      calculate: calculate(data, "aged35_44"),
    },
    { id: 4, age: "People 45+", calculate: calculate(data, "aged45") },
    {
      id: 5,
      age: "Age unknown",
      calculate: calculate(data, "agenotspecified"),
    },
  ];
  return (
    <div className="grid grid-cols-3 border-black">
      <div className="column1 divide-y divide-black grid grid-rows-6">
        <div className=" px-2 py-2 bg-gray-100">
          <h3 className="font-bold text-lg">Gender</h3>
        </div>


       {/*  <div className="flex border-top-black">
          <p>Men</p>
          <p>0</p>
        </div> */}

        {gender?.map((gender, index) => {
          return (
            <div
              className={`dataItem flex  ${
                index % 2 === 0 ? null : "bg-gray-100"
              }`}
            key={index}>
              <div className="w-3/4 px-2 py-2 items-center flex">
                <p>{gender.gender}</p>
              </div>
              <div className="w-1/4 justify-center items-center flex border-left-black " >
                <p>{gender.calculate}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="column2 divide-y divide-black grid grid-rows-6">
        <div className="px-2 py-2 bg-gray-100 border-left-black ">
          <h3 className="font-bold text-lg">Ethnicity</h3>
        </div>
        {ethnicity?.map((ethnicity, index) => {
          return (
            <div
              className={`dataItem flex border-left-black border-right-black ${
                index % 2 === 0 ? null : "bg-gray-100"
              }`}
              key={index}
            >
            <div className="w-3/4 px-2 py-2 items-center flex">
                <p>{ethnicity.ethnicity}</p>
              </div>
              <div className="w-1/4 justify-center items-center flex border-left-black " >
                <p>{ethnicity.calculate}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="column3 divide-y divide-black grid grid-rows-6">
        <div className="border-left-black px-2 py-2 bg-gray-100 ">
          <h3 className="font-bold text-lg">Age</h3>
        </div>
        {age?.map((age, index) => {
          return (
            <div
              className={`dataItem flex ${
                index % 2 === 0 ? null : "bg-gray-100"
              }`}
              key={index}
            >
                <div className="w-3/4 px-2 py-2  items-center flex">
                <p>{age.age}</p>
              </div>
              <div className="w-1/4 justify-center items-center flex border-left-black " >
                <p>{age.calculate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
