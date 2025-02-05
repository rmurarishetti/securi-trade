/**
 * UserStatusComponent
 * 
 * Overview:
 * The UserStatusComponent is a React component designed for displaying the status of a user based on their National Registration Identity Card (NRIC) number. It utilizes client-side rendering, indicated by the "use client" directive, to enhance performance and user experience. The component fetches user data from a Firestore database and displays relevant information such as name, email, phone number, NRIC, and status.
 * 
 * Key Features:
 * - Firestore Database Integration: Queries user data from a Firestore collection based on the NRIC number provided as a prop.
 * - Dynamic Data Fetching: Utilizes React's useEffect hook to fetch user data asynchronously upon component mount or when the provided NRIC number changes.
 * - State Management: Manages user data state using React's useState hook, allowing for reactive updates to the UI based on fetched data.
 * - Client-Side Rendering: Optimizes rendering performance and user experience by executing in the client's browser.
 * 
 * Implementation Details:
 * - The component initializes a state object `userData` to store user particulars including Name, Status, Phone, NRIC, and Email.
 * - It defines a Firestore collection reference `userCollection` targeting the "users" collection within the Firestore database.
 * - Utilizes two useEffect hooks:
 *   - The first useEffect hook is responsible for fetching user data from Firestore based on the NRIC number. It sets the fetched data to the `userData` state, triggering a re-render with the updated information.
 *   - The second useEffect hook is not fully shown but is implied to be used for additional side effects or cleanup operations.
 * 
 * Usage:
 * This component is intended for use in applications requiring the display of user status information, particularly in systems that identify users based on NRIC numbers. It can be used in administrative dashboards, user profile pages, or any application section where user verification and status display are required.
 * 
 */

"use client";
import { useEffect, useState } from "react";
import Gradient from "@bedard/gradient";
import * as Form from "@radix-ui/react-form";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../../utils/firestore";

export default function UserStatusComponent({ id }) {
  //Create a useState object to store name, email, phone, and nric and status
  const [userData, setUserData] = useState({
    Name: "",
    Status: "",
    Phone: "",
    NRIC: "",
    Email: "",
  });

  const userCollection = collection(db, "users");

  useEffect(() => {
    async function fetchData() {
      const q = query(userCollection, where("NRIC", "==", id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        setUserData(querySnapshot.docs[0].data());
        //console.log(querySnapshot.docs[0].data());
        //console.log(userData);
      } else {
        //console.log("No user found with the given NRIC");
      }
    }
    fetchData();
  });

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
      colors: ["#6ec3f4", "#3a3aff", "#ff61ab", "#E63946"],
      seed: Math.random(),
    });
  }, []);

  return (
    <div className="h-1/2 relative sm:flex flex-col">
      <div className="z-0 h-1/4">
        <canvas className="h-[200px] sm:h-auto w-full"></canvas>
      </div>

      <div className="absolute top-0 sm:left-12 flex sm:w-1/2 w-full justify-center my-20 z-30">
        <span className="md:text-4xl lg:text-5xl sm:text-lg sm:pl-8 font-bold justify-end text-[#3A3A3A]/75">
          <div className="text-white">Your Application has been Recieved.</div>
          <div className="md:text-2xl lg:text-3xl sm:text-md text-[#3A3A3A] sm:text-[#3A3A3A]/75 py-1">
            Thank you for choosing our services.
          </div>
        </span>
      </div>

      <div className="w-full z-30 sm:absolute sm:bottom-0 flex bg-white justify-center items-center">
        <div className="w-full px-10 flex flex-col sm:flex-row justify-between sm:space-x-2">
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <div className="font-bold md:text-xl lg:text-3xl sm:text-lg w-3/4 pb-2">
                Your Application Status: {userData.Status}
              </div>
              <div className="md:text-md lg:text-lg sm:text-sm w-4/5 py-2">
                Details of your application will be sent to your email.
              </div>
            </div>
          </div>
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <div className="font-bold md:text-xl lg:text-3xl sm:text-lg w-3/4 pb-2">
                Applicant Details.
              </div>
              <div className="md:text-md lg:text-lg sm:text-sm w-4/5 py-2">
                Submitted details are as follows:
              </div>
              <Form.Root className="flex flex-col justify-between">
                <div className="sm:flex">
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-center">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Document Number
                      </Form.Label>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <Form.Control asChild>
                        <div className="box-border w-3/5 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-sm sm:text-[15px] leading-none text-black shadow-[0_0_0_1px]">
                          {userData.NRIC}
                        </div>
                      </Form.Control>
                    </div>
                  </Form.Field>
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-center">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Full Name
                      </Form.Label>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <Form.Control asChild>
                        <div className="box-border w-3/5 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-sm sm:text-[15px] leading-none text-black shadow-[0_0_0_1px]">
                          {userData.Name}
                        </div>
                      </Form.Control>
                    </div>
                  </Form.Field>
                </div>
                <div className="sm:flex">
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-center">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Email
                      </Form.Label>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <Form.Control asChild>
                        <div className="box-border w-3/5 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-sm sm:text-[15px] leading-none text-black shadow-[0_0_0_1px]">
                          {userData.Email}
                        </div>
                      </Form.Control>
                    </div>
                  </Form.Field>
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-center">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Phone
                      </Form.Label>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <Form.Control asChild>
                        <div className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-sm sm:text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none  selection:color-black">
                          {userData.Phone}
                        </div>
                      </Form.Control>
                    </div>
                  </Form.Field>
                </div>
              </Form.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
