
const ClientInfoTopHeader = ({clientData, setClientData, data}) => {
    return (
        <section id="info" className="p-10 pt-7">
              <div className={`grid md:grid-cols-2 gap-x-5`}>
                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/client/client_information.svg"  />
                    <h3 className="font-black text-3xl">Client Information</h3>
                  </div>
                  <div className="grid md:grid-cols-3 items-end gap-7">
                    <label className="block ">
                      <p className="text-2xl font-medium mb-5">Date</p>
                      <input
                        type="date"
                        name=""
                        id=""
                        className="py-3 px-2 rounded-md text-2xl  bg-primary-light-blue"
                        value={clientData.progressNoteDate}
                        onChange={(e) =>
                          setClientData({
                            ...clientData,
                            progressNoteDate: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="block">
                      <p className="text-2xl font-medium mb-5">Client name</p>
                      <p className="p-3 rounded-md text-2xl bg-primary-light-blue">
                        {data[0]?.clientfirstname}{" "}
                        {data[0]?.clientlastname.charAt(0)}.
                      </p>
                    </label>

                    <label className="block">
                      <p className="text-2xl font-medium mb-5">Client ID</p>
                      <p className="py-3 px-2 rounded-md text-2xl w-28 text-center bg-primary-light-blue">
                        {data[0]?.clientid}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="service-action-plan-page-info-box">
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img
                      src="/progress_notes/health_care_worker.svg"
                      
                    />
                    <h3 className="font-black text-3xl ">Health Care Worker</h3>
                  </div>
                  <div className="grid md:flex items-end  gap-7">
                    <label className="block">
                      <p className="text-2xl font-medium mb-5">First Name</p>
                      <p className="md:w-72 p-3 rounded-md text-2xl bg-primary-light-blue">
                        {clientData.userFirstName}
                      </p>
                    </label>
                    <label className="block">
                      <p className="text-2xl font-medium mb-5">Last Name</p>
                      <p className="md:w-72 p-3 rounded-md text-2xl bg-primary-light-blue">
                        {clientData.userLastName}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </section>
    )
}

export default ClientInfoTopHeader;