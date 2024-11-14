import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import CountryList from "./pages/CountriesList";
import PopulationChart from "./pages/PopulationChart";
import EconomyChart from "./pages/EconomyChart";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Welcome to South America Explorer</title>
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Helmet>
                  <title>Home - South America Explorer</title>
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <Helmet>
                  <title>Country List - South America Explorer</title>
                </Helmet>
                <CountryList />
              </>
            }
          />
          <Route
            path="/population"
            element={
              <>
                <Helmet>
                  <title>Population Data - South America Explorer</title>
                </Helmet>
                <PopulationChart />
              </>
            }
          />
          <Route
            path="/economy"
            element={
              <>
                <Helmet>
                  <title>Economy Data - South America Explorer</title>
                </Helmet>
                <EconomyChart />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
