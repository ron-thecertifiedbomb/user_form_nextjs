import React from "react";
import Link from "next/link";
import { Company } from "@/pages/api/types";

interface Props {
  companies?: Company[];
  toggleDeleteModal: (company: Company) => void;
}

const TableBody = ({ companies, toggleDeleteModal }: Props) => {
  return (
    <tbody className="block md:table-row-group">
      {companies?.map((company, index) => (
        <tr
          className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
          key={company.id}
        >
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">No</span>
            {index}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Company Name
            </span>
            {company.name}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Address
            </span>
            {company.address}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Contact Info
            </span>
            {company.contactInfo}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Government Registration
            </span>
            {company.governmentRegistration}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Date Created
            </span>
            {new Date(company.createdAt).toLocaleDateString()}
          </td>
          <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Status
            </span>
            {company.isActive ? "Active" : "Inactive"}
          </td>
          <td className="d-flex  justify-center items-center p-2 md:w-[120px] md:border md:border-grey-500 md:text-center block md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Actions
            </span>
            <Link href={`/company/${company.id}`}>
              <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                <h1 className=" text-[12px]">Edit</h1>
              </button>
            </Link>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
              onClick={() => toggleDeleteModal(company)}
            >
              <h1 className=" text-[12px]">Delete</h1>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
