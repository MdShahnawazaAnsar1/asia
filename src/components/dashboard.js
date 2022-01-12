import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { Row, Col } from "react-grid-system";
import { OpenWith } from "@mui/icons-material";
import { Button } from "@mui/material";
const Dashboard = () => {
  const [countryDetal, setcountryDetal] = useState([]);
  const [timer, settimer] = useState(5);
  const [openSearch, setopenSearch] = useState(false);
  const [search, setsearch] = useState("");
  const getCountryDetails = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    setcountryDetal(res.data);
    return res;
  };
  useEffect(() => {
    getCountryDetails();
  }, [1]);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        settimer(timer - 1);
      } else {
        settimer(5);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const filteredCountry = countryDetal.filter((c) => {
    if (countryDetal.length === 0 || search.length === 0) {
      return;
    } else {
      return c.name.official.toLowerCase().includes(search.toLowerCase());
    }
  });
  const searchHandler = (e) => {
    setsearch(e.target.value);
  };
  console.log(filteredCountry);
  return (
    <div className="dashboard">
      <h3>All countries in Asia</h3>

      <input
        type="search"
        placeholder="Search Country by Official Name"
        onChange={searchHandler}
      />
      {filteredCountry.length !== 0 ? (
        <>
          {filteredCountry.length > 1 ? (
            filteredCountry.map((c, index) => (
              <div key={index}>
                <Row>
                  <Col>
                    <div className="container">
                      <div className="minContainer">
                        <div>
                          <img src={c.flags.png} alt="More" />
                        </div>
                        <div className="secondContainer">
                          <div className="details">
                            <b style={{ color: "#fc0398" }}>
                              {" "}
                              {c.name.official}
                            </b>{" "}
                            <span>
                              (<b>capital</b> : {c.capital})
                            </span>
                          </div>

                          <div className="region">
                            <b>Region</b> : {c.region}, <b>Subregion</b> :{" "}
                            {c.subregion}
                          </div>
                          <div className="region">
                            <b>Langauges</b> :{" "}
                            {c.languages &&
                              c.languages.length !== 0 &&
                              Object.keys(c.languages).map((keyName, i) => (
                                <i key={i}>{c.languages[keyName]} </i>
                              ))}
                          </div>
                          <div className="population">
                            <div>
                              <b>Total Population</b> : {c.population}
                            </div>
                            <div className="border">
                              <b>Borders</b> :
                              {c.borders &&
                                c.borders.length !== 0 &&
                                c.borders.map((b) => <> {b}</>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <div className="noData">
              <span> No searched data to display!</span>
            </div>
          )}
        </>
      ) : (
        <>
          {countryDetal.length > 1 ? (
            countryDetal.map((c, index) => (
              <div key={index}>
                <Row>
                  <Col>
                    <div className="container">
                      <div className="minContainer">
                        <div>
                          <img src={c.flags.png} alt="More" />
                        </div>
                        <div className="secondContainer">
                          <div className="details">
                            <b style={{ color: "#fc0398" }}>
                              {" "}
                              {c.name.official}
                            </b>{" "}
                            <span>
                              (<b>capital</b> : {c.capital})
                            </span>
                          </div>

                          <div className="region">
                            <b>Region</b> : {c.region}, <b>Subregion</b> :{" "}
                            {c.subregion}
                          </div>
                          <div className="region">
                            <b>Langauges</b> :{" "}
                            {c.languages &&
                              c.languages.length !== 0 &&
                              Object.keys(c.languages).map((keyName, i) => (
                                <i key={i}>{c.languages[keyName]} </i>
                              ))}
                          </div>
                          <div className="population">
                            <div>
                              <b>Total Population</b> : {c.population}
                            </div>
                            <div className="border">
                              <b>Borders</b> :
                              {c.borders &&
                                c.borders.length !== 0 &&
                                c.borders.map((b) => <> {b}</>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <div className="loading">
              <span> Wait we are on the way... {timer}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
