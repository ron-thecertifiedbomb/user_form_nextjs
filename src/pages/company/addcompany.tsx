import React from "react";
import AddCompanyForm from "@/components/AddCompanyForm";
import styles from "../../styles/myglobalstyles.module.css";

const AddProduct: React.FC = () => {
  return (
    <main className={styles.main}>
      <AddCompanyForm />
    </main>
  );
};

export default AddProduct;
