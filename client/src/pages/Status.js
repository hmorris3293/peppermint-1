import React, { useEffect, useState } from "react";
import Create from "../components/monitoring/create";
import io from "socket.io-client";

const Status = () => {
  const [data, setData] = useState();

  async function soc() {
    const socket = await io.connect("/");
    socket.on("data", (data) => setData(data));

    return () => socket.disconnect();
  }

  useEffect(() => {
    soc();
  }, []);

  console.log(data);

  return (
    <div className="">
      <Create />

      <div>
        {data === undefined && (
          <div>
            <h1>There are no monitors assigned</h1>
          </div>
        )}

        {data !== undefined && (
          <div className="p-8">
            <div class="flex mb-4 space-x-16">
              <div class="w-1/4 h-full">
                <div className="bg-gray-800 overflow-hidden shadow sm:rounded-xl">
                  <div className="px-4 py-5 sm:p-6 h-full spacey-y-8">
                    {data.map((monitor) => (
                      <div className="flex flex-col sm:flex-row justify-between">
                        <p
                          className={
                            monitor.up
                              ? "inline-flex items-center px-4 flex-wrap py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                              : "inline-flex items-center px-4 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          }
                        >
                          {monitor.up ? "Alive" : "Down"}
                        </p>
                        <h3 className="text-white">{monitor.name}</h3>
                        <p className="text-white">{monitor.res}ms</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div class="w-3/4 bg-gray-500"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
