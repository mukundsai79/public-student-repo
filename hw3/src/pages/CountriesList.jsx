import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaUsers, FaMoneyBillWaveAlt, FaLanguage } from "react-icons/fa";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then(async (response) => {
        const countries = response.data;

        for (let country of countries) {
          if (country.detailsLink) {
            try {
              const detailsResponse = await axios.get(country.detailsLink);
              country.details = detailsResponse.data;
            } catch (err) {
              console.error("Error fetching details for:", country.name, err);
            }
          }
        }

        setCountries(countries);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError("Failed to load country data");
      });
  }, []);

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1
        className="text-center text-primary font-weight-bold display-4 mb-5"
        style={{ marginTop: "260px" }}
      >
        Countries in South America
      </h1>

      <Row className="g-4">
        {countries.map((country, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <Card className="shadow-lg border-0 rounded-lg h-100">
              <Card.Body className="d-flex flex-column align-items-center p-4">
                <div className="text-center mb-3">
                  <Card.Title className="font-weight-bold text-primary">
                    {country.name}
                  </Card.Title>
                  <img
                    src={country.flag_png}
                    alt={country.flag_alt || "Flag"}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "120px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="text-center mb-3 flex-grow-1">
                  <p className="text-muted">
                    <FaUsers /> <strong>Population:</strong>{" "}
                    {country.population
                      ? country.population.toLocaleString()
                      : "Not available"}
                  </p>
                  <p className="text-muted">
                    <FaMoneyBillWaveAlt /> <strong>GDP (in billions):</strong>{" "}
                    {country.gdp_billions
                      ? `${country.gdp_billions} billion`
                      : "Not available"}
                  </p>
                  <p className="text-muted">
                    <FaLanguage /> <strong>Official Languages:</strong>{" "}
                    {country.official_languages &&
                    country.official_languages.length > 0
                      ? country.official_languages.join(", ")
                      : "Not available"}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CountriesList;
