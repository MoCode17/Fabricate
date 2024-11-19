import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Pricing from "./components/Pricing";
import DesignWorkspace from "./components/AIDesigner/DesignWorkspace";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Features />
        <Showcase />
        <DesignWorkspace />
      </div>
    </div>
  );
}

export default App;
