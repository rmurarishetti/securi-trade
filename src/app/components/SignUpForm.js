import * as Form from "@radix-ui/react-form";

export default function SignUpForm() {
  return (
    <div className="flex justify-center bg-transparent pb-2">
      {/* flex-col text-5xl font-bold text-black text-[#3A3A3A]/75 mt-13 p-5 z-30 */}
      <Form.Root className="flex w-3/5 flex-col justify-center">
        <Form.Field className="grid mb-[10px]" name="email">
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
            <Form.Message
              className="text-[13px] text-black opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid Phone Number
            </Form.Message>
          </div>
          <div className="flex justify-between items-center gap-x-1">
            <div className="box-border text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              +65
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                type="email"
                placeholder="Enter Your Phone Number"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="question">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Verification Code
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter a question
            </Form.Message>
          </div>
          <div className="flex justify-between items-center gap-x-1">
            <Form.Control asChild>
              <input
                className="box-border w-[70%] bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-blackA6"
                type="email"
                placeholder="Enter the One-Time Verification Code"
                required
              />
            </Form.Control>
            <button className="box-border text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Send Code
            </button>
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
