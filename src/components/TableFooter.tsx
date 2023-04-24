import React from "react";
import Link from "next/link";

interface TableFooterProps {
  addButtonText: string;

}

const TableFooter = ({ addButtonText}: TableFooterProps) => {
  return (
    <>
      <div className="flex w-full justify-center ">
        <Link href={"/company/addcompany"}>
          <button className="h-[40px] w-60 text-blue-gray-50 bg-green-400 rounded-lg">
            {addButtonText}
          </button>
        </Link>
      </div>
     
    </>
  );
};

export default TableFooter;