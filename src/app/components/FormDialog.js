"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../../utils/firestore";
import { useRouter } from "next/navigation";

export default function ParticularsFormDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    Name: "",
    Status: "",
    Phone: "",
    NRIC: "",
    Email: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*Validate all fields are not empty*/
    if (
      state.Name === "" ||
      state.NRIC === "" ||
      state.Email === "" ||
      state.Phone === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    /*Validate NRIC is 9 digits*/
    if (!(state.NRIC.length === 9)) {
      alert("Invalid NRIC");
      return;
    }
    /*Validate Phone is 8 digits*/
    if (!/^\d{8}$/.test(state.Phone)) {
      alert("Invalid Phone Number");
      return;
    }
    /*Validate Email is in email format*/
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.Email)) {
      alert("Invalid Email");
      return;
    }
    /*Submit the form*/
    const docRef = await addDoc(collection(db, "users"), {
      Name: state.Name,
      NRIC: state.NRIC,
      Email: state.Email,
      Phone: state.Phone,
      Status: "Pending",
    });
    if (docRef.id) {
      setOpen(false);
      router.push(`/user/${state.NRIC}`);
    } else {
      alert("An error occurred. Please try again");
    }
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="box-border w-full text-white inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#635BFF] px-[15px] font-medium leading-none mt-[10px]"
        >
          Fill Particulars
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Particulars Form
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to the form here. Click save when you&apos;re done.
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
              defaultValue={state.Name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              defaultValue={state.NRIC}
              onChange={handleChange}
              placeholder="Enter your NRIC/FIN"
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
              defaultValue={state.Email}
              onChange={handleChange}
              placeholder="Enter your email address"
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
              defaultValue={state.Phone}
              onChange={handleChange}
              placeholder="Enter your phone number."
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#635BFF] text-white focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Submit
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-black hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
