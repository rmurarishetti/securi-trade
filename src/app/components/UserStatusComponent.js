"use client";
import { useEffect } from "react";
import Gradient from "@bedard/gradient";
import * as Form from "@radix-ui/react-form";

export default function UserStatusComponent() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
      colors: ["#6ec3f4", "#3a3aff", "#ff61ab", "#E63946"],
      seed: Math.random(),
    });
  }, []);

  return (
    <div className="h-1/3 relative flex sm:flex-col">
      <div className="z-0">
        <canvas className="h-1/2"></canvas>
      </div>

      <div className="absolute top-0 left-12 flex sm:w-1/2 h-full justify-center my-20 z-30">
        <span className="md:text-4xl lg:text-5xl sm:text-lg pl-8 font-bold justify-end text-[#3A3A3A]/75">
          <div className="text-white">Your Application has been Recieved.</div>
          <div className="md:text-2xl lg:text-3xl sm:text-md py-1">
            Thank you for choosing our services.
          </div>
        </span>
      </div>

      <div className="w-full z-30 absolute bottom-0 flex bg-white justify-center items-center">
        <div className="w-full px-10 flex flex-col sm:flex-row justify-between sm:space-x-2">
          <div className="flex-1 p-5 border-2 rounded-md my-2">
            <div className="flex-col">
              <div className="font-bold md:text-xl lg:text-3xl sm:text-lg w-3/4 pb-2">
                Your Application Status: Processing
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
              <Form.Root className="flex flex-col justify-center">
                <div className="flex">
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Document Number
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <div className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none  selection:color-black" />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Full Name
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <div className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none  selection:color-black" />
                    </Form.Control>
                  </Form.Field>
                </div>
                <div className="flex">
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Email
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <div className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none  selection:color-black" />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field className="w-full grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                        Phone
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <div className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none  selection:color-black" />
                    </Form.Control>
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
