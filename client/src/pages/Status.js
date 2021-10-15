import React, { useEffect, useState } from "react";
import Create from "../components/monitoring/create";
import io from "socket.io-client";

const Status = () => {
  const [data, setData] = useState("");

  async function soc() {
    const socket = await io.connect("/");
    socket.on("data", (data) => setData({ data }));
  }

  useEffect(() => {
    soc();
  }, []);

  console.log(data);

  return (
    <div className="">
      <Create />
    </div>
  );
};

export default Status;
