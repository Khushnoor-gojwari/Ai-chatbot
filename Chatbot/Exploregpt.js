import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {OpenAIOutlined,HomeOutlined,FileTextTwoTone} from "@ant-design/icons";
import {
  Navbar,
  Nav,
  Offcanvas,
  Form,
  InputGroup,
  Row,
  Container,
  Col,
} from "react-bootstrap";

const ExploreGpt = () => {
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const components = [
    { icon: "bi bi-megaphone", name: "Text to Speech" },
    { icon: "bi bi-megaphone-fill", name: "Speech to Text" },
    { icon: "bi bi-card-image", name: "Text to Image" },
    { icon: "bi bi-chat-right-text", name: "Image to Text" },
  ];

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
            
        <Navbar.Brand href="#">ExploreGPT</Navbar.Brand>
      </Navbar>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
           
            <Link to="/chatbot" style={{textDecoration:"none"}}> <Nav.Link href="#home" className="text-white">
            <HomeOutlined />  Home
                </Nav.Link></Link>
            {/* <Link to="/exploregpt" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
                        <h5>Explore GPTs</h5>
            </Nav.Link></Link> */}
            <Offcanvas.Title><OpenAIOutlined />  Explore GPTs</Offcanvas.Title>
            <Link to="/text-to-speech" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
             Text to speech
            </Nav.Link></Link>
            <Link to="/speech-to-text" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
                          Speech to Text
            </Nav.Link></Link>
            <Link to="/text-to-image" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <FileTextTwoTone />           Text to Image
            </Nav.Link></Link>
            <Link to="/image-to-text" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
                         Image to Text
            </Nav.Link></Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex" style={{ height: "100%" }}>
        {isVisible && (
          <div
            className="bg-dark text-white p-4 d-none d-lg-block"
            style={{ width: "250px" }}
          >
            <h5 className="mb-4">Menu</h5>
            <Nav className="flex-column">
            <Link to="/chatbot" style={{textDecoration:"none"}}> <Nav.Link href="#home" className="text-white" >
            <HomeOutlined />    Home
                </Nav.Link></Link>
            
            <Offcanvas.Title> <OpenAIOutlined/> Explore GPTs</Offcanvas.Title>
            <Link to="/text-to-speech" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <i class="bi bi-megaphone" style={{marginRight:"5px"}}></i>            Text to speech
            </Nav.Link></Link>
            <Link to="/speech-to-text" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <i class="bi bi-megaphone-fill" style={{marginRight:"5px"}}></i>             Speech to Text
            </Nav.Link></Link>
            <Link to="/text-to-image" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <FileTextTwoTone />        Text to Image
            </Nav.Link></Link>
            <Link to="/image-to-text" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <i class="bi bi-file-image" style={{marginRight:"5px"}}></i>Image to Text
            </Nav.Link></Link>
            </Nav>
          </div>
        )}

        <div
          className="flex-grow-1 d-flex flex-column"
          style={{ backgroundColor: "white" }}
        >
          <div className="p-4" style={{ marginTop: "10%" }}>
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "black",marginBottom:"10px" }}>Explore "Defcon Innovations"  GPT</h3>
              
              
            </div>

            <InputGroup className="mb-3 bg-white">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search For GPTs..."
                className="text-black bg-white"
                style={{
                  resize: "none",
                  overflowY: "auto",
                  minHeight: "40px",
                  boxSizing: "border-box",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              />
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>

            <Container className="content">
              <h3>Featured</h3>
              <p style={{ color: "#B4B4B4" }}>Curated Top Picks For You</p>


                <Row className="g-4">
                {filteredComponents.map((component, index) => (
                    <Col xs={12} md={6} key={index}>
                    <div
                        className="component-item d-flex flex-column align-items-center"
                        style={{ backgroundColor: "#F9F9F9", borderRadius: "5px" }}
                    >
                        <span>
                        <i
                            className={component.icon}
                            style={{ fontSize: "2rem" }}
                        ></i>
                        </span>
                        <Link 
                        to={`/${component.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <button className="btn btn-outline-primary"
                        style={{marginBottom:"5px"}}><h4>{component.name}</h4></button>
                        </Link>
                    </div>
                    </Col>
                ))}
                </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreGpt;

