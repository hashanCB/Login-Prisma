import React, { useEffect, useState } from "react";
import { getAllData } from "./api/register";
import AfterDeleted from "./AfterDeleted";
import UpdateUser from "./UpdateUser";

const AfterLogin = () => {
  const [user, setUser] = useState();
  const [displayuser, setdisplayuser] = useState();
  const GetAlluser = async () => {
    const getusers = await getAllData();
    setUser(getusers);
  };
  useEffect(() => {
    GetAlluser();
  }, []);

  const displauupdate = (data) => {
    setdisplayuser(data);

    // console.log(data);
  };
  return (
    <div>
      All-user-List
      {user
        ? user.data?.map((ele, index) => (
            <>
              <div> Name: {ele.username} </div>
              <div> Email: {ele.email} </div>
              <div>
                {" "}
                <AfterDeleted
                  value={ele.id}
                  Deledtedupdate={() => GetAlluser()}
                />{" "}
                <button
                  className=" bg-green-400 p-2"
                  onClick={() => displauupdate(ele)}
                >
                  Update
                </button>
              </div>
            </>
          ))
        : null}
      ===================Update Part=======================
      {displayuser ? (
        <UpdateUser
          value={displayuser}
          Updatesceen={() => {
            setdisplayuser("");
            GetAlluser();
          }}
        />
      ) : (
        <div>no data update here </div>
      )}
    </div>
  );
};

export default AfterLogin;
