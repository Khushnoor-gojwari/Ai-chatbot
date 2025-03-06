// import {  useContext } from "react";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Navbar, Nav, Button, Offcanvas, Form } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";

import { CiCirclePlus } from "react-icons/ci";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa";
import { LiaAtomSolid } from "react-icons/lia";
import ButtonList from "./ButtonList";

import "../Chatbot/Chatbot.css";
// import { ButtonContext } from "../context/ButtonContext";
import { useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  // const { buttonValue } = useContext(ButtonContext);
  const [input, setInput] = useState();
  const [response, setResponse] = useState(""); // State to store the chatbot's response
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // const [show, setShow] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatContainerRef = useRef(null);
  const [showGenerating, setShowGenerating] = useState(true);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get recognized text
      setInput(transcript); // Update input field
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (!Loading) {
      setShowGenerating(false);
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, Loading]);

  // Handle window resize
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
      SetLoading(true);

      // Add user question to messages list with a placeholder for response
      setMessages((prevMessages) => [
        ...prevMessages,
        { question: input, answer: "..." },
      ]);

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

          // Update only the last message instead of resetting all messages
          setMessages((prevMessages) => {
            return prevMessages.map((msg, index) =>
              index === prevMessages.length - 1
                ? { ...msg, answer: data.answer }
                : msg
            );
          });
        } else {
          console.error("Error generating response");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      SetLoading(false);
      setInput(""); // Clear input after sending
    }
  };

  const generateTitle = (msg) => {
    if (typeof msg === "string") {
      // If msg is a string (old logic)
      const words = msg.split(" ");
      return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : msg;
    } else if (typeof msg === "object" && msg.question) {
      // If msg is an object (new structure with { question, answer })
      const words = msg.question.split(" ");
      return words.length > 3
        ? words.slice(0, 3).join(" ") + "..."
        : msg.question;
    }
    return "Unknown";
  };

  const handleHistoryClick = (msg) => {
    // setInput(msg.question);
    setInput(msg.answer); // Set the full message in the input box
  };

  return (
    <div className=" bg-black">
      {/* Mobile Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none mb-4">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">ChatGPT</Navbar.Brand>
      </Navbar>

      {/* Sidebar Offcanvas */}
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
            <Link to="/" className="text-decoration-none">
              <Nav.Link href="#/" className="text-white">
                <HomeOutlined /> Home
              </Nav.Link>
            </Link>
            <Link to="/exploregpt" className="text-decoration-none">
              <Nav.Link className="text-white" href="#exploregpt">
                <LiaAtomSolid /> Explore GPTs
              </Nav.Link>
            </Link>

            {/* History Section */}

            <div className="mt-3 text-white w-100">
              <h5>History</h5>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 p-2 border border-secondary rounded text-white overflow-hidden"
                  style={{
                    cursor: "pointer",
                    height: "40px",
                    lineHeight: "20px",
                    overflowWrap: "break-word",
                  }}
                  onClick={() => handleHistoryClick(msg)}
                >
                  {generateTitle(msg.question)}{" "}
                  {/* Display only the question */}
                </div>
              ))}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex h-100">
        {/* Desktop Sidebar */}
        <div
          className="bg-dark text-white p-4 d-none d-lg-block"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <h5 className="mb-4">Menu</h5>
          <Nav className="flex-column">
            <Link to="/" className="text-decoration-none">
              <Nav.Link href="#/" className="text-white p-2">
                <HomeOutlined className="fs-4" /> <span>Home</span>
              </Nav.Link>
            </Link>
            <Link to="/exploregpt" className="text-decoration-none">
              <Nav.Link className="text-white p-2" href="#exploregpt">
                <LiaAtomSolid className="fs-4" /> <span>Explore Models</span>
              </Nav.Link>
            </Link>

            {/* History Section */}

            <div className="mt-3 text-white w-100">
              <h5>History</h5>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 p-2 border border-secondary rounded text-white overflow-hidden"
                  style={{
                    cursor: "pointer",
                    height: "40px",
                    lineHeight: "20px",
                    overflowWrap: "break-word",
                  }}
                  onClick={() => handleHistoryClick(msg)}
                >
                  {generateTitle(msg.question)}{" "}
                  {/* Display only the question */}
                </div>
              ))}
            </div>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="p-md-4 w-100" style={{ minHeight: "100vh" }}>
          {isVisible && <h4 className="text-white mb-4">DefconGPT</h4>}

          <div
            className="row g-0 p-0 justify-content-center align-items-center mt-16"
            style={{
              backgroundColor: "black",
              width: "100%",
              marginTop: "20%",
            }}
          >
            <div className="col-11 col-md-10 d-flex flex-column justify-content-center align-items-center h-100">
              {messages.length > 0 && (
                <div
                  className="response chat-container w-100 mb-3  bg-dark  rounded-4 text-white p-3 font-large"
                  style={{
                    // minHeight: "150px",
                    // maxHeight: "290px",
                    // whiteSpace: "pre-wrap",
                    // overflowY: "auto",
                    marginTop: "-20%",
                  }}
                  ref={chatContainerRef}
                >
                  {Loading && showGenerating && (
                    <div className="mb-3 bg-dark rounded-4 text-white p-3 font-large text-center">
                      <span className="spinner-border spinner-border-sm"></span>{" "}
                      Generating response...
                    </div>
                  )}
                  {messages.length > 0 &&
                    messages.map((msg, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="d-flex justify-content-end">
                          <div
                            className="user-message p-2 rounded-4"
                            style={{
                              backgroundColor: "#fff",
                              color: "#000",
                              alignSelf: "flex-end",
                              maxWidth: "fit-content", // Auto width
                              wordWrap: "break-word",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            {msg.question}
                          </div>
                        </div>

                        {/* Chatbot Response (Left-Aligned, Auto Width) */}
                        <div className="d-flex justify-content-start ">
                          <div
                            className="bot-message p-2  rounded"
                            style={{
                              backgroundColor: "#DCDCDC",
                              color: "black",
                              alignSelf: "flex-start",
                              maxWidth: "fit-content", // Auto width
                              wordWrap: "break-word",
                              borderRadius: "10px",
                            }}
                          >
                            {msg.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Input Section */}
              <div className=" w-100 ">
                {!response && (
                  <h3 className="text-center text-white">
                    What can I help with?
                  </h3>
                )}

                {/* Wrapper div to contain both textarea and buttons */}
                <div className="d-flex flex-column border border-secondary rounded bg-dark">
                  {/* Textarea */}
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message ChatGPT..."
                    className="text-white bg-dark border-0 p-3 fs-5"
                    style={{
                      overflowY: "auto",
                      resize: "none",
                      flexGrow: 1,
                      boxShadow: "none",
                    }}
                  />

                  <div className="px-2 py-2 d-flex justify-content-between">
                    {/* Popover Trigger Button */}
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      rootClose
                      overlay={
                        <Popover>
                          <Popover.Body>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control type="file" />
                            </Form.Group>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <button className="upload-btn text-white p-0 g-0 bg-transparent border-0">
                        <CiCirclePlus className="fs-3" />
                      </button>
                    </OverlayTrigger>

                    {/* Send Button */}
                    {!input ? (
                      <Button
                        className="rounded-5 p-2"
                        variant="success"
                        onClick={startListening}
                      >
                        <RiVoiceprintFill className="fs-4" />
                      </Button>
                    ) : (
                      <Button
                        className="rounded-5 p-2"
                        variant="success"
                        onClick={sendMessage}
                      >
                        <FaArrowUp className="fs-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <ButtonList input={input} setInput={setInput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
