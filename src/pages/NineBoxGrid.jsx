import React,{ useState, useEffect } from "react";
import { Card, Container, Row,Modal,Button, Col,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/NineBoxGrid.css";
import 'font-awesome/css/font-awesome.min.css';
const NineBoxGrid = () => {
  // State to hold grid data
  const [gridData, setGridData] = useState([
    { no: "4", title: "0", description: "Pegawai", color: "bg-success text-white", class: "box-green" },
    { no: "7", title: "0", description: "Pegawai", color: "bg-primary text-white", class: "box-blue" },
    { no: "9", title: "0", description: "Pegawai", color: "bg-primary text-white", class: "box-blue" },
    { no: "2", title: "0", description: "Pegawai", color: "bg-danger text-white", class: "box-red" },
    { no: "5", title: "0", description: "Pegawai", color: "bg-success text-white", class: "box-green" },
    { no: "8", title: "0", description: "Pegawai", color: "bg-primary text-white", class: "box-blue" },
    { no: "1", title: "0", description: "Pegawai", color: "bg-danger text-white", class: "box-red" },
    { no: "3", title: "0", description: "Pegawai", color: "bg-danger text-white", class: "box-red" },
    { no: "6", title: "0", description: "Pegawai", color: "bg-success text-white", class: "box-green" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  
  // Function to handle card click and show modal
  const handleCardClick = async (card) => {
    setSelectedCard(card);
    setShowModal(true);

    // Fetch filtered data from Google Sheets and filter by 'no'
    const data = await fetchFilteredData(card.no);
    setFilteredData(data);
  };

   // Fetch filtered data from Google Sheets API
   const fetchFilteredData = async (cardNo) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/11bKWMw5vLxBEzsi-5rC4jDIe3gPlrKo7jidSpTQ5zt0/values/Detail!A2:AH83?key=AIzaSyD4a6Eyg8Gr0Wnfsac1cGUrMy_yQMsMDDo`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.values) {
        // Filter data where the first column (index 0) matches the 'no' from the card
        return filterByNo(data.values, cardNo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return [];
  };

  // Filter data where the first column (index 0) matches the card 'no'
  const filterByNo = (data, cardNo) => {
    return data.filter(row => row[row.length - 1] === cardNo);
  };
  
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);
    setFilteredData([]); // Clear filtered data on close
  };

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/11bKWMw5vLxBEzsi-5rC4jDIe3gPlrKo7jidSpTQ5zt0/values/Rekap!A1:B10?key=AIzaSyD4a6Eyg8Gr0Wnfsac1cGUrMy_yQMsMDDo"); // Replace with your API endpoint
        const data = await response.json();
        // Map API data to grid structure
        const apiValues = data.values.slice(1); // Remove header row
        const updatedGrid = gridData.map((item) => {
          const matchingData = apiValues.find(([pos]) => pos === item.no);
          return matchingData
          ? { ...item, title: matchingData[1] }
          : item;
        });
        
        setGridData(updatedGrid);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  const labels = ["Rendah", "Sedang", "Tinggi"];
  const yLabels = ["Dibawah Ekspektasi", "Sesuai Ekspektasi", "Diatas Ekspektasi"];

   // Function to format numbers to 2 decimal places
   const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };
  return (
    <Container className="nine-box-container">
    <div className="nine-box-grid">
    {/* Y-axis Label (Potential) */}
    
    <h5 className="y-axis-title">K I N E R J A</h5>
    <Col className="y-axis">
    {yLabels.map((label, index) => (
      <div key={index} className="y-axis-label">
      {label}
      </div>
    ))}
    </Col>
    
    {/* Render the grid data */}
    <div className="grid-items" style={{ gridColumnStart: 2, gridColumnEnd: 4 }}>
    <Row className="text-center content-box">
    {gridData.map((item, index) => (
      <Col key={index} md={4} className="mb-3">
      <Card className={`text-center ${item.class} p-3 card-container`} onClick={() => handleCardClick(item)}>
      <div className="card-number">{item.no}</div>
      <Card.Body>
      <Card.Title className="card-title"><span className={`card-title-${item.class}`}>{item.title}</span></Card.Title>
      <Card.Text className="card-description">{item.description}</Card.Text>
      </Card.Body>
      </Card>
      </Col>
    ))}
    </Row>
    
    <Row className="x-axis-labels">
    {labels.map((label, index) => (
      <Col key={index} md={4} className="text-center">
      <div className="x-axis-label">{label}</div>
      </Col>
    ))}
    </Row>
    <div className="x-axis">
    <h5>P O T E N S I A L</h5>
    
    </div>
    </div>
    
    </div>
    
    {/* X-axis Label (Performance) */}
    

    {/* Modal for displaying card details */}
    <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
        {selectedCard ? (
          <Modal.Title>Detail Posisi Box {selectedCard.no} - ( {selectedCard.title} Pegawai )</Modal.Title>
        ):''}
        </Modal.Header>
        <Modal.Body>
          {selectedCard ? (
            <>
                 {/* Display filtered data in table */}
                 {filteredData.length > 0 ? (
                <Table striped bordered hover size="md">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NIP</th>
                      <th>Nama</th>
                      <th>Jabatan</th>
                      <th>Pendidikan</th>
                      <th>Nilai Kinerja</th>
                      <th>Nilai Potensial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index}>
                        <td>{index+1}</td> {/* No */}
                        <td>{row[0]}</td> {/* nip */}
                        <td>{row[2]}</td> {/* Nama */}
                        <td>{row[3]}</td> {/* Jabatan */}
                        <td>{row[6]}</td> {/* Pendidikan */}
                        <td>{formatNumber(row[23])} ({row[24]}) </td> {/* Nilai A */}
                        <td>{formatNumber(row[30])} ({row[31]}) </td> {/* Nilai A */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No details available for this card.</p>
              )}
            </>
          ) : (
            <p>No card selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add a link to the data source */}
      <div className="data-source-link" style={{ marginTop: "20px", textAlign: "center" }}>
     
        <a
        href="https://docs.google.com/spreadsheets/d/11bKWMw5vLxBEzsi-5rC4jDIe3gPlrKo7jidSpTQ5zt0"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '18px',
          color: '#007bff',
          marginRight:'20px'
        }}
      >
        <i
          className="fa fa-file"
          style={{ fontSize: '20px', marginRight: '8px' }} // Adjust icon size and spacing
        ></i>
        Sumber Data
      </a>  
        <a
        href="https://github.com/ArfRhman/mt-ninebox-demo"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '18px',
          color: '#007bff',
        }}
      >
        <i
          className="fa fa-github"
          style={{ fontSize: '24px', marginRight: '8px' }} // Adjust icon size and spacing
        ></i>
        Source Code
      </a>  
      </div>
       
    </Container>
  );
};


export default NineBoxGrid;
