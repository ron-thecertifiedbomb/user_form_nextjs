import React, { useState } from "react";
import { useGetListOfCompaniesQuery } from "../pages/api/apiSlice";
import Modal from "./Modal";
import Table from "./Table";

const List = (): JSX.Element | null => {
  const {
    data: companies,
    isLoading,
    isSuccess,
    isError,
  } = useGetListOfCompaniesQuery();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [deleteName, setDeleteName] = useState<string>("");

  const toggleDeleteModal = (company: any) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteId(company.id);
    setDeleteName(company.name);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>There's an error</p>;
  }

  if (isSuccess) {
    return (
      <div className=" max-w-[1400px] p-2 w-full mb-10">
        <Table companies={companies} toggleDeleteModal={toggleDeleteModal} />
        {showDeleteModal && (
          <Modal toggleDeleteModal={toggleDeleteModal} deleteName={deleteName} deleteId={deleteId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}/>
        )}
      </div>
    );
  }

  return null;
};

export default List;
