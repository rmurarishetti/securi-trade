/**
 * ParticularsComponent
 * 
 * Overview:
 * The ParticularsComponent is a React component designed to collect user particulars, including name, NRIC, email, and phone number. It leverages various technologies and libraries such as Firebase Firestore for data storage, Radix UI for dialog and form elements, and Next.js for image handling and navigation.
 * 
 * Key Features:
 * - Singpass Integration: Allows users to submit their particulars using Singpass, enhancing the authentication process and data accuracy.
 * - Dynamic Form Dialog: Utilizes Radix UI's Dialog component to present a form in a modal dialog, improving user interaction and focus.
 * - Firestore Database Interaction: Manages user data with Firestore, performing operations like querying and adding documents to store user particulars.
 * - Client-Side Rendering: Marks the component for client-side rendering with the "use client" directive, optimizing performance and user experience in Next.js applications.
 * 
 * State Management:
 * - Uses React's useState hook to manage local state, including form fields (nric), dialog visibility (singpassDialogOpen), and user data (userData).
 * 
 * Navigation:
 * - Employs the useRouter hook from Next.js for navigation. However, there's an incorrect import statement that should be corrected to import from "next/router" instead of "next/navigation".
 * 
 * Form Handling:
 * - Implements a form submission handler (handleSingpassSubmit) that validates the input fields before proceeding with the submission logic. This ensures that all required fields are filled out.
 * 
 * Firestore Integration:
 * - Utilizes Firestore's collection, query, where, getDocs, and addDoc functions to interact with the Firestore database, enabling the retrieval and storage of user particulars.
 * 
 * Usage:
 * This component is intended for use in applications requiring user authentication and data collection, particularly where Singpass integration is beneficial. It's suitable for scenarios demanding secure and verified user data submission.
 * 
 * Implementation Notes:
 * - The component should ensure all user data is validated and sanitized before submission to Firestore to maintain data integrity and security.
 * - Error handling should be implemented for Firestore operations and form submission to enhance user experience and debuggability.
 */

"use client";
import React from "react";
import { useEffect, useState } from "react";
import Gradient from "@bedard/gradient";
import { Singpass } from "../../../public";
import Image from "next/image";
import * as Form from "@radix-ui/react-form";
import ParticularsFormDialog from "./FormDialog";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import db from "../../../utils/firestore";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function ParticularsComponents({phone}) {
  const router = useRouter();

  const [state, setState] = useState({ nric: "" });
  const [singpassDialogOpen, setSingpassDialogOpen] = useState(false);

  const [userData, setUserData] = useState({
    Name: "",
    Status: "Pending",
    Phone: phone,
    NRIC: "",
    Email: "",
  });

  const handleSingpassSubmit = async (e) => {
    e.preventDefault();
    /*Validate all fields are not empty*/
    if (
      userData.Name === "" ||
      userData.NRIC === "" ||
      userData.Email === "" ||
      userData.Phone === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    /*Validate NRIC is 9 digits*/
    if (!(userData.NRIC.length === 9)|| (userData.NRIC !== state.nric)) {
      alert("Invalid NRIC or NRIC doesn't match the one provided to fetch information");
      return;
    }
    /*Validate Phone is 8 digits*/
    if (!/^\d{8}$/.test(userData.Phone)) {
      alert(`Invalid Phone Number`);
      return;
    }
    /*Validate Email is in email format*/
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.Email)) {
      alert("Invalid Email");
      return;
    }
    /*Submit the form*/
    const docRef = await addDoc(collection(db, "users"), {
      Name: userData.Name,
      NRIC: userData.NRIC,
      Email: userData.Email,
      Phone: phone,
      Status: "Pending",
    });
    if (docRef.id) {
      setSingpassDialogOpen(false);
      router.push(`/user/${userData.NRIC}`);
    } else {
      alert("An error occurred. Please try again");
    }
  };

  const singpassCollection = collection(db, "singpass");

  async function fetchData() {
    console.log(state.nric);
    const q = query(
      singpassCollection,
      where("NRIC", "==", state.nric ? state.nric : "S9812381D")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      console.log(querySnapshot.docs[0].data());
      setUserData(querySnapshot.docs[0].data());
    } else {
      console.log("No user found with the given NRIC");
    }
  }

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
      colors: ["#6ec3f4", "#3a3aff", "#ff61ab", "#E63946"],
      seed: Math.random(),
    });
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSingpassChange = (e) => {
    console.log(e.target.id, e.target.value);
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData().then(setSingpassDialogOpen(true));
  };

  return (
    <div className="h-1/2 relative sm:flex flex-col">
      <div className="z-0 h-1/4">
        <canvas className="w-full"></canvas>
      </div>

      <div className="absolute top-6 left-12 flex w-1/2 sm:h-full justify-center my-20 z-30">
        <span className="md:text-5xl lg:text-6xl sm:text-xl pl-8 font-bold justify-end text-[#3A3A3A]/75">
          <div className="text-white">Know Your Customer.</div>
          <div className="md:text-3xl lg:text-4xl sm:text-lg py-2">
            Fill Your Particulars
          </div>
        </span>
      </div>

      <div className="w-full sm:absolute sm:bottom-0 pt-12 z-30 sm:flex bg-white justify-center items-center">
        <div className="w-full px-10 flex flex-col sm:flex-row justify-between sm:space-x-2">
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <div className="font-bold md:text-xl lg:text-3xl sm:text-lg w-3/4 pb-2">
                Choose how you want to retrieve your particulars.
              </div>
              <div className="md:text-md lg:text-lg sm:text-sm w-4/5 py-2">
                You can choose to fill in your particulars manually or use
                Singpass MyInfo.
              </div>
            </div>
          </div>
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <Image src={Singpass} alt="logo" className="w-auto h-[52px]" />
              <div className="md:text-md lg:text-lg sm:text-sm w-4/5 py-2">
                Click on Retrieve MyInfo to fill in your particulars.
              </div>
              <Form.Root
                className="flex flex-col justify-center"
                onSubmit={handleSubmit}
              >
                <Form.Field className="grid mb-[10px]" name="nric">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                      NRIC/FIN
                    </Form.Label>
                    <Form.Message
                      className="text-[13px] text-black opacity-[0.8]"
                      match="valueMissing"
                    >
                      Please Enter Your NRIC/FIN
                    </Form.Message>
                  </div>
                  <div className="flex justify-between items-center gap-x-1">
                    <Form.Control asChild>
                      <input
                        value={state.nric}
                        onChange={handleChange}
                        className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                        placeholder="Enter Your 9 Digit UIN"
                        required
                      />
                    </Form.Control>
                    <button className="box-border text-white inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#F4333D] px-[15px] font-medium leading-none">
                      Retrieve MyInfo
                    </button>
                  </div>
                </Form.Field>
                <Dialog.Root open={singpassDialogOpen}>
                  <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                      <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Fetching Particulars from Singpass
                      </Dialog.Title>
                      <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Click submit when you&apos;re done.
                      </Dialog.Description>
                      <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                          className="text-violet11 w-[90px] text-right text-[15px]"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          id="Name"
                          defaultValue={userData.Name}
                          placeholder="Loading"
                          handleChange={handleSingpassChange}
                        />
                      </fieldset>
                      <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                          className="text-violet11 w-[90px] text-right text-[15px]"
                          htmlFor="nric"
                        >
                          NRIC/FIN
                        </label>
                        <input
                          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          id="NRIC"
                          placeholder="Loading"
                          defaultValue={userData.NRIC}
                          handleChange={handleSingpassChange}
                        />
                      </fieldset>
                      <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                          className="text-violet11 w-[90px] text-right text-[15px]"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          id="Email"
                          defaultValue={userData.Email}
                          placeholder="Loading"
                          handleChange={handleSingpassChange}
                        />
                      </fieldset>
                      <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                          className="text-violet11 w-[90px] text-right text-[15px]"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          id="Phone"
                          defaultValue={userData.Phone}
                          placeholder="Loading"
                          handleChange={handleSingpassChange}
                        />
                      </fieldset>
                      <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                          <button
                            onClick={handleSingpassSubmit}
                            className="bg-[#F4333D] text-white focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                          >
                            Submit
                          </button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          onClick={() => setSingpassDialogOpen(false)}
                          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                          aria-label="Close"
                        >
                          <Cross2Icon />
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </Form.Root>
            </div>
          </div>
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <div className="font-bold text-[#635BFF] md:text-xl lg:text-3xl sm:text-lg w-3/4 py-2">
                Manual Submission
              </div>
              <div className="md:text-md lg:text-lg sm:text-sm w-4/5 py-2">
                Click on Fill to manually fill in your particulars. Please have
                a copy of your document ready.
              </div>
              <ParticularsFormDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
