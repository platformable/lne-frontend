import React from 'react';

const CondomsDistributionRowComponent = ({name,title,setFormData,bg}) => {
    const isNumberKey = (e) => {
    const invalidChars = [
      "-",
      "+",
      "e",
    ];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    } 
    }
  return (
    <div className={`flex bg-${bg}-pink py-2 rounded-lg my-2 items-center`}>
      <div className="form-row-item px-5 w-96">
        <p className='font-medium text-lg leading-tight'>{title}</p>
      </div>
      <div>
        <input
          type="number"
          name={name}
          id={name}
          onChange={(e) => {
            setFormData((previousState) => ({
              ...previousState,
              [e.target.name]: Number(e.target.value),
            }));
          }}
          className="p-2 rounded-lg text-lg text-center w-24 border-2"
          defaultValue={0}
        />
      </div>
    </div>
  );
}

export default CondomsDistributionRowComponent;
