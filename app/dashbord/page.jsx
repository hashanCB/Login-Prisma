"use server";

import AddData from "./AddData";
import { DisplayData } from "./DisplayData";

const page = async () => {
  return (
    <div>
      <div>ADD Task- using Server Action</div>
      <DisplayData />
      <div>===================</div>
      <AddData />
    </div>
  );
};

export default page;
