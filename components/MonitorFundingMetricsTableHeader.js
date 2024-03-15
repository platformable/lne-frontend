export default function MonitorFundingMetricsTableHeader({title,sortFunction}) {
    return (
        <div className="monitor-funding-table-col flex light-blue-bg justify-between items-center px-5 py-3 font-bold ">
                <p className="">{title}</p>
                <svg
                  onClick={() => sortFunction()}
                  className="cursor-pointer"
                  width="20"
                  height="20"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 9.5L12 6L8.5 9.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 14L12 17.5L8.5 14"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
    );
}
