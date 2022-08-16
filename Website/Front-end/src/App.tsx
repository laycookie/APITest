import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => console.error("something went wrong", error));
  }, []);

  return <div>App</div>;
}
