import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {OpenAIOutlined,HomeOutlined} from "@ant-design/icons";
import {
  Navbar,
  Nav,
  Offcanvas,
  Form,
  InputGroup,
  Container,
} from "react-bootstrap";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSpeak = () => {
    if (text.trim() !== "") {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">Text to Speech</Navbar.Brand>
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
            <Link to="/chatbot" style={{ textDecoration: "none" }}>
              <Nav.Link href="#home" className="text-white">
               <HomeOutlined/> Home
              </Nav.Link>
            </Link>
            <Link to="/exploregpt" style={{ textDecoration: "none" }}>
              <Nav.Link href="#exploregpt" className="text-white">
              <OpenAIOutlined/> Explore GPTs
              </Nav.Link>
            </Link>
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
              <Link to="/chatbot" style={{ textDecoration: "none" }}>
                <Nav.Link href="#home" className="text-white">
                <HomeOutlined/> Home
                </Nav.Link>
              </Link>
              <Link to="/exploregpt" style={{ textDecoration: "none" }}>
                <Nav.Link href="#exploregpt" className="text-white">
                <OpenAIOutlined/> Explore GPTs
                </Nav.Link>
              </Link>
            </Nav>
          </div>
        )}

        <div
          className="flex-grow-1 d-flex flex-column"
          style={{ backgroundColor: "white" }}
        >
          <div className="p-4" style={{ marginTop: "10%" }}>
            <h3 className="text-center">Text to Speech</h3>
            <Container className="mt-4">
              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type text here..."
                  rows={4}
                />
              </InputGroup>
              <button
                className="btn btn-primary w-20"
                onClick={handleSpeak}
              >
                Speak
              </button>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;




