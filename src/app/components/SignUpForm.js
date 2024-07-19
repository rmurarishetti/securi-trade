"use client";
import React from "react";
import { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import * as Toast from "@radix-ui/react-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../../utils/firestore";

export default function SignUpForm() {
  const router = useRouter();
  const userCollection = collection(db, "users");

  const [state, setState] = useState({
    phone: "",
    code: "",
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastContents, setToastContents] = useState({
    Title: "",
    Description: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (/^\d{8,}$/.test(state.phone) && state.code === "0527") {
      // const docRef = doc(db, "users", state.phone);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   router.push(`/user/${data.NRIC}`);
      // }
      const q = query(userCollection, where("Phone", "==", state.phone));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data());
      if (querySnapshot.docs.length > 0) {
        const data = querySnapshot.docs[0].data();
        router.push(`/user/${data.NRIC}`);
      } else{
        router.push(`/particulars/${state.phone}`);
      }
      
    } else {
      alert("Invalid Phone Number or Verification Code");
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (/^\d{8,}$/.test(state.phone)) {
      setToastContents({
        Title: "Code Sent",
        Description:
          "Your phone number has been verified. The code is 0527. You can now proceed.",
      });
      setToastOpen(true);
      setTimeout(() => setToastOpen(false), 2000);
    } else {
      setToastContents({
        Title: "Invalid Phone Number",
        Description: "Please enter a valid phone number",
      });
      setToastOpen(true);
      setTimeout(() => setToastOpen(false), 2000);
    }
  };

  return (
    <div className="flex justify-center bg-transparent pb-2">
      {/* flex-col text-5xl font-bold text-black text-[#3A3A3A]/75 mt-13 p-5 z-30 */}
      <Form.Root
        className="flex w-3/5 flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid mb-[10px]" name="phone">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Phone
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please Enter Your Phone Number
            </Form.Message>
          </div>
          <div className="flex justify-between items-center gap-x-1">
            <div className="box-border text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              +65
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                type="tel"
                onChange={handleChange}
                value={state.phone}
                placeholder={
                  state.phone == "" ? "Enter Your Phone Number" : state.phone
                }
                required
              />
            </Form.Control>
          </div>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="code">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Verification Code
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your verification code
            </Form.Message>
          </div>
          <div className="flex justify-between items-center gap-x-1">
            <Form.Control asChild>
              <input
                className="box-border w-[70%] bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                placeholder={
                  state.code == ""
                    ? "Enter the One-Time Verification Code"
                    : state.code
                }
                onChange={handleChange}
                value={state.code}
                required
              />
            </Form.Control>
            <button
              onClick={handleSendCode}
              className="box-border text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              Send Code
            </button>
            <Toast.Provider swipeDirection="right" duration={2000}>
              <Toast.Root
                className="bg-gray-100 border-[5px] rounded-md border-[#FFFFFF] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                open={toastOpen}
                onOpenChange={setToastOpen}
              >
                <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-black text-[15px]">
                  {toastContents.Title}
                </Toast.Title>
                <Toast.Description>
                  <div className="text-mauve11 font-normal mt-[10px] mb-5 text-[15px] leading-normal">
                    {toastContents.Description}
                  </div>
                </Toast.Description>
                <Toast.Close className="[grid-area:_action]" asChild>
                  <button className="box-border text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                    <Cross2Icon />
                  </button>
                </Toast.Close>
              </Toast.Root>
              <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[470px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
            </Toast.Provider>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <button className="box-border w-full text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
            Sign Up / Login
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
