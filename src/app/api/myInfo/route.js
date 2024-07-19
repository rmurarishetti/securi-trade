import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const response = await fetch("https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/S9812381D", {
        method: "GET",
        headers: {
          "Content-Type": "*/*",
          
        }});
    res.json(response);
  });

export default handler;