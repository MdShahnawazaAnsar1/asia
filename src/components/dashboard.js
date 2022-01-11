import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { Row, Col } from "react-grid-system";
const Dashboard = () => {
  const [countryDetal, setcountryDetal] = useState([]);

  const getCountryDetails = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");

    setcountryDetal(res.data);
    
    return res;
  };
  

  useEffect(() => {
    getCountryDetails();
  }, []);

  return (
    <div className="dashboard">
      <h3>All countries in Asia</h3>
      {countryDetal.map((c, index) => (
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
                      <b style={{ color: "#fc0398" }}> {c.name.official}</b>{" "}
                      <span>
                        (<b>capital</b> : {c.capital})
                      </span>
                    </div>
               
                    <div className="region">
                      <b>Region</b> : {c.region}, <b>Subregion</b> :{" "}
                      {c.subregion}
                    </div>
                    {c.languages &&
                      c.languages.length !== 0 &&
                      Object.keys(c.languages).map((keyName, i) => (
                        <div key={i} className="region">
                          <b>Lamgauges</b> : {c.languages[keyName]}
                        </div>
                      ))}
                    <div className="population">
                      <div>
                        {" "}
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
      ))}
    </div>
  );
};

export default Dashboard;
