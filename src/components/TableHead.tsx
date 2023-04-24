import React from "react";

const TableHead: React.FC = () => {
  const title: string[] = [
    "No",
    "Company Name",
    "Address",
    "Contact Info",
    "Government Registration",
    "Date Created",
    "Status",
    "Actions",
  ];

  return (
    <>
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
          {title?.map((title, index) => (
            <th
              className="bg-gray-600 p-2 text-white font-bold text-[13px] md:border md:border-grey-500 text-center block md:table-cell"
              key={index}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
