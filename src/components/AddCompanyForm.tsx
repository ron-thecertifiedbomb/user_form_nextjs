import React, { useState } from "react";
import { useAddCompanyMutation } from "../pages/api/apiSlice";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

interface AddCompanyFormProps {}

const AddCompanyForm: React.FC<AddCompanyFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [addCompany] = useAddCompanyMutation();

  const d = new Date();
  const time = d.toISOString();

  const createdAt = time.toString();
  const lastUpdatedAt = time.toString();
  const lastUpdatedByUserName = time.toString();
  const lastUpdatedByUserId = time.toString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCompany({
      description: description,
      contactInfo: contactInfo,
      address: address,
      governmentRegistration: "Registered",
      name: name,
      isDeleted: false,
      isActive: true,
      createdByUserName: "admin",
      createdByUserId: 0,
      createdAt: createdAt,
      lastUpdatedAt: lastUpdatedAt,
      lastUpdatedByUserName: lastUpdatedByUserName,
      lastUpdatedByUserId: lastUpdatedByUserId,
    });
    setName("");
    setAddress("");
    setContactInfo("");
    setDescription("");
  };

  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Add Company
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="lg"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              size="lg"
              label=" Contact Info"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            <Input
              size="lg"
              label= "Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Add New Company
          </Button>
          <br></br>
          <Link href={"/"}>
            <button className=" h-[40px] w-full text-blue-gray-50 bg-green-400 rounded-lg">
              View Company List
            </button>
          </Link>
          <br></br>
          <br></br>
          <Link href={"/"}>
            <button className=" h-[40px] w-full text-blue-gray-50 bg-green-400 rounded-lg">
              Go Back to Home{" "}
            </button>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default AddCompanyForm;
