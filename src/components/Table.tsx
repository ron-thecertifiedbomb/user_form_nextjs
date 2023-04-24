import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

interface Props {
  companies: any;
  toggleDeleteModal: any;
}

const Table = ({ companies, toggleDeleteModal }: Props) => {
  return (
    <>
    <table className="w-full border-collapse block md:table">
      <TableHead />
      <TableBody companies={companies} toggleDeleteModal={toggleDeleteModal} />
    </table>
      <br></br>
        <TableFooter addButtonText="Add more" />
        </>
  );
};

export default Table;