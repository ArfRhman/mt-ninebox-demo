import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/NineBoxGrid.css";
const NineBoxGrid = () => {
  const gridData = [
    { title: "Develop", description: "Untapped Talent", color: "bg-primary text-white" },
    { title: "Develop / Stretch", description: "High Potentials", color: "bg-warning text-dark" },
    { title: "Stretch", description: "Exceptional Talent", color: "bg-info text-white" },
    { title: "Observe - Dilemma", description: "Inconsistent Performers", color: "bg-secondary text-white" },
    { title: "Core", description: "Reliable Team Players", color: "bg-success text-white" },
    { title: "Stretch / Develop", description: "Strong Contributors", color: "bg-warning text-dark" },
    { title: "Observe / Terminate", description: "Underperformers", color: "bg-danger text-white" },
    { title: "Observe - Effective", description: "Effective Performers", color: "bg-dark text-white" },
    { title: "Trust", description: "Trusted Professionals", color: "bg-primary text-white" },
  ];

  return (
    <Container className="nine-box-container">
    <div className="nine-box-grid">
      {/* Y-axis Label (Potential) */}
      <Col className="y-axis">
        <h5>K I N E R J A</h5>
      </Col>

      {/* Render the grid data */}
      <div className="grid-items" style={{ gridColumnStart: 2, gridColumnEnd: 4 }}>
        <Row className="text-center content-box">
          {gridData.map((item, index) => (
            <Col key={index} md={4} className="mb-3">
              <Card className={`text-center ${item.color} p-3 card-container`}>
                <Card.Body>
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text className="card-description">{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="x-axis">
    <h5>P O T E N S I</h5>

    </div>
      </div>
      
    </div>

    {/* X-axis Label (Performance) */}
   
  </Container>
  );
};

export default NineBoxGrid;
