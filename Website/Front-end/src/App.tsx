import { useState, useEffect } from "react";

import Login from "./components/Login";
import Authorize from "./components/Authorize";

export default function App() {
  const [auntificationData, setAuntificationData] = useState(null);

  return (
    <>
      {!auntificationData ? (
        <Login setData={setAuntificationData} />
      ) : (
        <Authorize tokenData={auntificationData} />
      )}
    </>
  );
}
