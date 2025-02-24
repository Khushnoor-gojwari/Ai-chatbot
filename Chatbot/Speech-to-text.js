import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {OpenAIOutlined,HomeOutlined} from "@ant-design/icons";
import {
  Navbar,
  Nav,
  Offcanvas,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setText(speechToText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">Speech to Text</Navbar.Brand>
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
              <OpenAIOutlined/>  Explore GPTs
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
                <HomeOutlined/>  Home
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
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "black" }}>Speech to Text</h3>
            </div>

            <InputGroup className="mb-3 bg-white">
              <Form.Control
                type="text"
                value={text}
                readOnly
                placeholder="Your speech will appear here..."
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
                <i className="bi bi-mic"></i>
              </InputGroup.Text>
            </InputGroup>

            <Button
              variant={isListening ? "danger" : "primary"}
              onClick={startListening}
              disabled={isListening}
            >
              {isListening ? "Listening..." : "Start Listening"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
