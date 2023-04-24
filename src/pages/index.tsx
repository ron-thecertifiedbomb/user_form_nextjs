import React from "react";
import List from "@/components/List";
import styles from "../styles/myglobalstyles.module.css";

const AddProduct: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1 className=" font-bold text-2xl text-center">List of Companies</h1>
      <List />
    </main>
  );
};

export default AddProduct;
