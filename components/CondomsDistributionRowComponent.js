import React from 'react';

const CondomsDistributionRowComponent = ({name,title,setFormData,bg}) => {
  return (
    <div className={`flex bg-${bg}-blue py-2 rounded-lg my-2 items-center`}>
      <div className="form-row-item px-5 w-60">
        <p>{title}</p>
      </div>
      <div>
        <input
          type="tel"
          name={name}
          id={name}
          onChange={(e) => {
            setFormData((previousState) => ({
              ...previousState,
              [e.target.name]: Number(e.target.value),
            }));
          }}
          className="p-1 rounded-lg"
          defaultValue={0}
        />
      </div>
    </div>
  );
}

export default CondomsDistributionRowComponent;
