import React from "react";
import { useState, useEffect } from "react";
import { getCrypto } from "../api/external";
import Loader from "./Loader";

function Crypto() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCrypto();
      setCrypto(response);
    };

    fetchData();
  }, []);

  if (crypto.length === 0) {
    return <Loader text="Crypto" />;
  }

  return (
    <table className="m-auto w-4/5 md:w-4/6 mt-10">
      <thead className="text-xl">
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {crypto.map((item) => (
          <tr key={item.id} className="m-10 mt-3 border-b b-white" id={item.id}>
            <td className="py-6 lg:p-2 text-center font-bold">
              {item.market_cap_rank}
            </td>
            <td className="py-6 lg:p-2 text-center font-bold">
              <div className="flex items-center h-8 text-left pl-2 lg:pl-20 w-28 lg:w-6/12 mx-auto">
                <img
                  src={item.image}
                  className="w-6 h-6 mr-3"
                  alt={item.name}
                />
                <h4 className="text-sm font-normal">{item.name}</h4>
              </div>
            </td>
            <td className="py-6 lg:p-2 text-center font-bold">{item.symbol}</td>
            <td className="py-6 lg:p-2 text-center font-bold my-0 mx-auto">
              {item.current_price} $
            </td>
            <td
              className={`
                ${
                  item.market_cap_change_percentage_24h > 0
                    ? "text-green-700 py-6 lg:p-2 text-center pl-2 font-bold"
                    : "text-red-700 py-6 lg:p-2 text-center  pl-2 font-bold"
                }
              `}
            >
              {item.market_cap_change_percentage_24h}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Crypto;
