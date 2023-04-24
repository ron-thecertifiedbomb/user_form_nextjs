import React, { FunctionComponent } from "react";
import { useDeleteCompanyMutation } from "../pages/api/apiSlice";

interface ModalProps {
  toggleDeleteModal: (company?: any) => void;
  deleteName: string;
  deleteId: string;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  toggleDeleteModal,
  deleteName,
  deleteId,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  const [deleteCompany] = useDeleteCompanyMutation();

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={toggleDeleteModal}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Are you sure you want to delete this company?
              </h3>
              <br></br>
              <h3
                className="text-lg leading-6 font-bold text-gray-900"
                id="modal-headline"
              >
                {deleteName}
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              className="inline-flex justify-center w-full rounded-md border mb-2 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={toggleDeleteModal}
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              onClick={() => {
                deleteCompany({ id: Number(deleteId) });
                setShowDeleteModal(!showDeleteModal);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
