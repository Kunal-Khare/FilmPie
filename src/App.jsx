import React, { useEffect, useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [searhTerm, setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero banner" />

            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle{" "}
            </h1>
          </header>
          <Search searchTerm={searhTerm} setSearchTerm={setSearchTerm} />
          <h3 className="text-white">{searhTerm}</h3>
        </div>
      </div>
    </main>
  );
};

export default App;
