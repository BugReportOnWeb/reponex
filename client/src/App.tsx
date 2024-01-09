import React from "react";

const App = () => {
  const sendRequest = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <main className="w-full min-h-[73vh]">
        <h1>Hello World!</h1>
        <button onClick={sendRequest}>Send Request</button>
      </main>
    </>
  );
};

export default App;
