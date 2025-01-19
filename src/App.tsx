import React from "react";
import Navbar from "./components/Navbar";
import DesignWorkspace from "./components/AIDesigner/DesignWorkspace";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Showcase from "./components/Showcase";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-16">
        <DesignWorkspace />
      </div>
    </div>
  );
}

export default App;
