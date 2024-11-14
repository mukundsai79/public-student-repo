import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => (
  <Container className="p-4 main-content" fluid style={{ minHeight: "100vh" }}>
    <Row
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <Col className="text-center">
        <h1 className="text-primary mb-3" style={{ marginTop: "100px" }}>
          Welcome to the South America Explorer!
        </h1>
        <p className="lead text-muted mb-4">
          Discover the countries of South America, explore their populations,
          economies, and much more!
        </p>
        <Button variant="primary" size="lg" href="/list">
          Explore Now
        </Button>
      </Col>
    </Row>

    <Row className="mt-5">
      <Col>
        <h2 className="text-center text-secondary mb-3">
          Why Explore South America?
        </h2>
        <p className="text-center">
          South America is a continent of diverse cultures, histories, and
          natural wonders. From the Andes Mountains to the Amazon Rainforest,
          this is your gateway to understanding the vibrant nations that shape
          this incredible region.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Home;
