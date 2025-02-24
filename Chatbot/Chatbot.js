
import { useEffect } from "react";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {OpenAIOutlined,HomeOutlined,FileTextTwoTone} from "@ant-design/icons";
import {
  Navbar,
  Nav,
  Button,
  Offcanvas,
  Form,
  InputGroup,
} from "react-bootstrap";


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(""); // State to store the chatbot's response
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 991); // Hides if width <= 991px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      
      setMessages([...messages, input]);

      // Send the input to the backend API
      try {
        const response = await fetch("http://localhost:8000/generate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });

        if (response.ok) {
          const data = await response.json();
          setResponse(data.answer); // Update response state with the API response
        } else {
          console.error("Error generating response");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // Clear the input box after sending
      setInput("");
    }
  };

 

  const generateTitle = (msg) => {
    const words = msg.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : msg;
  };

  const handleHistoryClick = (msg) => {
    setInput(msg); // Set the full message in the input box
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">ChatGPT</Navbar.Brand>
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
          <Link to="/"> <Nav.Link href="#home" className="text-white">
            <HomeOutlined/>  Home
            </Nav.Link></Link>
              <Link to="/exploregpt">   
                <Nav.Link href="#explore" className="text-white">
                  <OpenAIOutlined/> Explore GPTs
                </Nav.Link>
               </Link>
            <div className="mt-3" style={{ color: "#fff" }}>
              <h5>History</h5>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 text-white overflow-hidden"
                  style={{
                    cursor: "pointer",
                    padding: "8px", // Smaller padding to match input height
                    border: "1px solid #444",
                    borderRadius: "5px",
                    whiteSpace: "normal",
                    overflow: 'hidden',
                    overflowWrap: "break-word", // Same as wordWrap but more reliable
                    maxWidth: "100%", // Ensure it doesn't stretch too wide
                    height: "40px", // Set fixed height like input field
                    lineHeight: "20px", // Adjust line height to center text vertically
                  }}
                  onClick={() => handleHistoryClick(msg)}
                >
                  {generateTitle(msg)} {/* Display short title */}
                </div>
              ))}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
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
          <Link to="/" style={{textDecoration:"none"}}> <Nav.Link href="#home" className="text-white">
          <HomeOutlined/>  Home
            </Nav.Link></Link>
            <Link to="/exploregpt" style={{textDecoration:"none"}}>   
              <Nav.Link href="#explore" className="text-white">
              <OpenAIOutlined/> Explore GPTs
              </Nav.Link>
            </Link>
            <div className="mt-3" style={{ color: "#fff" }}>
              <h5>History</h5>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 text-white overflow-hidden"
                  style={{
                    cursor: "pointer",
                    padding: "8px", // Smaller padding to match input height
                    border: "1px solid #444",
                    borderRadius: "5px",
                    whiteSpace: "normal",
                    overflow: 'hidden',
                    overflowWrap: "break-word", // Same as wordWrap but more reliable
                    maxWidth: "100%", // Ensure it doesn't stretch too wide
                    height: "40px", // Set fixed height like input field
                    lineHeight: "20px", // Adjust line height to center text vertically
                  }}
                  onClick={() => handleHistoryClick(msg)}
                >
                  {generateTitle(msg)} {/* Display short title */}
                </div>
              ))}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex" style={{ height: "100%" }}>
        <div
          className="bg-dark text-white p-4 d-none d-lg-block"
          style={{ width: "250px" }}
        >
          <h5 className="mb-4">Menu</h5>
          <Nav className="flex-column">
           <Link to="/" style={{textDecoration:"none"}}> <Nav.Link href="#home" className="text-white">
           <HomeOutlined/>  Home
            </Nav.Link></Link>
            <Link to="/exploregpt" style={{textDecoration:"none"}}><Nav.Link href="#exploregpt" className="text-white">
            <OpenAIOutlined/>  Explore GPTs
            </Nav.Link></Link>
            <div className="mt-3" style={{ color: "#fff" }}>
              <h5>History</h5>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 text-white"
                  style={{
                    cursor: "pointer",
                    padding: "8px", // Smaller padding to match input height
                    border: "1px solid #444",
                    borderRadius: "5px",
                    whiteSpace: "normal", // Allow wrapping of text
                    wordWrap: "break-word", // Break long words
                    overflow:'hidden',
                    maxWidth: "100%", // Ensure it doesn't stretch too wide
                    height: "40px", // Set fixed height like input field
                    lineHeight: "20px", // Adjust line height to center text vertically
                  }}
                  onClick={() => handleHistoryClick(msg)}
                >
                  {generateTitle(msg)} {/* Display short title */}
                </div>
              ))}
            </div>
          </Nav>
        </div>

        <div
          style={{
            display: isVisible ? "block" : "none",
            color: "white",
          }}
        >
          <h4 style={{ color: "white" }}>ChatGpt</h4>
        </div>

        <div
          className="flex-grow-1 d-flex flex-column"
          style={{ marginTop: "20%" }}
        >
          <div className="p-4">
            {/* Display the response above the "What can I help with?" */}
            <div>
              {response && (
                
                
                <textarea
                  value={response}
                  readOnly
                  className="form-control mb-3"
                  rows={6}
                  style={{
                    resize: "none",
                    backgroundColor: "#333",
                    color: "white",
                    border: "1px solid #444",
                  }}
                />
                
              )}
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "#fff" }}>What can I help with?</h3>
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows={3} // Set the number of rows when no content
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message ChatGPT..."
                className="text-white bg-dark"
                style={{
                  resize: "vertical", // Allow only vertical resizing
                  overflowY: "scroll", // Show vertical scrollbar when content overflows
                  maxHeight: "20px", // Maximum height to avoid it getting too tall
                  minHeight: "80px", // Set minimum height to keep the input box consistent
                  boxSizing: "border-box", // Ensures padding/borders are included in total height/width
                  wordWrap: "break-word", // Allow words to break and wrap onto the next line
                  whiteSpace: "pre-wrap",
                   // Ensure wrapping of text with spaces/newlines
                }}
              />
              <Button variant="success" onClick={sendMessage}>
                Send
              </Button>
             
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;


