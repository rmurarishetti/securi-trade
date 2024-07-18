"use client";
import { useEffect } from "react";
import Gradient from "@bedard/gradient";
import { Singpass } from "../../../public";
import Image from "next/image";
import * as Form from "@radix-ui/react-form";

export default function ParticularsComponents() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
      colors: ["#6ec3f4", "#3a3aff", "#ff61ab", "#E63946"],
      seed: Math.random(),
    });
  }, []);
  return (
    <div className="h-1/2 relative flex sm:flex-col">
      <div className="z-0">
        <canvas className="h-1/2"></canvas>
      </div>

      <div className="absolute top-6 left-12 flex w-1/2 h-full justify-center my-20 z-30">
        <span className="md:text-5xl lg:text-6xl sm:text-xl pl-8 font-bold justify-end text-[#3A3A3A]/75">
          <div className="text-white">Know Your Customer.</div>
          <div className="md:text-3xl lg:text-4xl sm:text-lg py-2">
            Fill Your Particulars
          </div>
        </span>
      </div>

      <div className="w-full z-30 absolute bottom-0 right-0 flex bg-white justify-center items-cente">
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
              <Form.Root className="flex flex-col justify-center">
                <Form.Field className="grid mb-[10px]" name="email">
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
                    <Form.Message
                      className="text-[13px] text-black opacity-[0.8]"
                      match="typeMismatch"
                    >
                      Please provide a valid NRIC/FIN
                    </Form.Message>
                  </div>
                  <div className="flex justify-between items-center gap-x-1">
                    <Form.Control asChild>
                      <input
                        className="box-border w-3/5 bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                        type="email"
                        placeholder="Enter Your 9 Digit UIN"
                        required
                      />
                    </Form.Control>
                    <button className="box-border text-white inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#F4333D] px-[15px] font-medium leading-none">
                      Retrieve MyInfo
                    </button>
                  </div>
                </Form.Field>
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
              <button className="box-border w-full text-white inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#635BFF] px-[15px] font-medium leading-none mt-[10px]">
                Fill Particulars
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
