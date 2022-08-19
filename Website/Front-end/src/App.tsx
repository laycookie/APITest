import { useState, useEffect } from "react";

import Login from "./components/Login";

export default function App() {
  const [auntificationData, setAuntificationData] = useState(null);

  useEffect(() => {
    fetch("/apiTest")
      .then((res) => {
        res.json().then((data) => {
          // console.log(data);
        });
      })
      .catch((error) => console.error("something went wrong", error));
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
