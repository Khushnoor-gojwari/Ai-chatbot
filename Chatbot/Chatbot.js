import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Navbar, Nav, Button, Offcanvas, Form, Alert } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";

import { CiCirclePlus } from "react-icons/ci";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa";
import { LiaAtomSolid } from "react-icons/lia";
import ButtonList from "./ButtonList";

import "../Chatbot/Chatbot.css";
// import { ButtonContext } from "../context/ButtonContext";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.txt', '.md', '.csv', '.json', '.xml', '.html', '.js', '.py', '.rb', '.c', '.cpp', '.h', '.java', '.php'];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(""); 
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [apiError, setApiError] = useState(null);

  const chatContainerRef = useRef(null);
  const [showGenerating, setShowGenerating] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [showFileInfo, setShowFileInfo] = useState(false);
  
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const messagesRef = useRef([]);
  
  // Function to check if file is valid
  const isValidFile = (file) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds maximum allowed size of 10MB`);
      return false;
    }
    
    // Check file extension
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFileError(`Only text-based files are supported. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError(null);
    setUploadSuccess(false);
    
    if (!file) {
      setSelectedFile(null);
      return;
    }
    
    if (isValidFile(file)) {
      setSelectedFile(file);
      setShowFileInfo(true);
    } else {
      event.target.value = null;
      setSelectedFile(null);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setFileError("Please select a file first.");
      return;
    }
    
    // Clear any previous errors
    setFileError(null);
    setApiError(null);
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("File uploaded successfully:", data);
        
        // Add message to chat
        const newMessage = { 
          question: `Uploaded file: ${selectedFile.name}`, 
          answer: data.answer 
        };
        
        messagesRef.current.push(newMessage);
        setMessages([...messagesRef.current]);
        
        // Show success message and close popover
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
          setPopoverOpen(false);
        }, 2000);
        
        // Reset file selection
        setSelectedFile(null);
        document.getElementById("fileInput").value = "";
      } else {
        // Handle API error response
        console.error("File upload failed:", data.error);
        setFileError(data.error || "File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setApiError("Network error: Could not connect to server");
    } finally {
      setIsUploading(false);
    }
  };
  
  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setApiError("Speech recognition is not supported in your browser");
      return;
    }
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setApiError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setApiError("No speech detected. Please try again.");
      } else {
        setApiError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (!loading) {
      setShowGenerating(false);
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 991);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear errors after 5 seconds
  useEffect(() => {
    if (apiError || fileError) {
      const timer = setTimeout(() => {
        setApiError(null);
        setFileError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [apiError, fileError]);

  const sendMessage = async () => {
    if (!input || input.trim() === "") return;

    setLoading(true);
    setApiError(null);

    const newMessage = { question: input, answer: "..." };
    messagesRef.current.push(newMessage);
    setMessages([...messagesRef.current]);

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
        
        // Update the last message with the response
        messagesRef.current[messagesRef.current.length - 1].answer = data.answer;
        setMessages([...messagesRef.current]);
      } else {
        const errorData = await response.json();
        console.error("Error generating response:", errorData);
        
        // Update the last message with the error
        messagesRef.current[messagesRef.current.length - 1].answer = 
          "Sorry, I couldn't generate a response. Please try again.";
        setMessages([...messagesRef.current]);
        
        setApiError(errorData.detail || "Error generating response");
      }
    } catch (error) {
      console.error("Network error:", error);
      
      // Update the last message with the error
      messagesRef.current[messagesRef.current.length - 1].answer = 
        "Network error: Could not connect to server";
      setMessages([...messagesRef.current]);
      
      setApiError("Network error: Could not connect to server");
    }

    setLoading(false);
    setInput("");
  };

  const generateTitle = (msg) => {
    if (typeof msg === "string") {
      const words = msg.split(" ");
      return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : msg;
    } else if (typeof msg === "object" && msg.question) {
      const words = msg.question.split(" ");
      return words.length > 3
        ? words.slice(0, 3).join(" ") + "..."
        : msg.question;
    }
    return "Unknown";
  };

  const handleHistoryClick = (msg) => {
    setInput(msg.question); // Set the question in the input box
  };
  
  const handlePopoverToggle = (nextShow) => {
    setPopoverOpen(nextShow);
    if (!nextShow) {
      // Reset file state when closing popover
      setShowFileInfo(false);
      setFileError(null);
    }
  };

  // Custom upload popover content
  const uploadPopover = (
    <Popover id="file-upload-popover">
      <Popover.Header as="h3">Upload File</Popover.Header>
      <Popover.Body>
        {fileError && (
          <Alert variant="danger" className="py-1 px-2 mb-2">
            <small>{fileError}</small>
          </Alert>
        )}
        
        <Form.Group controlId="fileInput" className="mb-2">
          <Form.Control 
            type="file" 
            onChange={handleFileChange}
            size="sm"
          />
          {showFileInfo && selectedFile && (
            <div className="mt-1 mb-2">
              <small className="text-muted">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </small>
            </div>
          )}
        </Form.Group>
        
        <div className="d-flex justify-content-between">
          <small className="text-muted">Max 10MB, text files only</small>
          <Button 
            onClick={uploadFile} 
            variant={uploadSuccess ? "success" : "primary"} 
            size="sm"
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1"></span>
                Uploading...
              </>
            ) : uploadSuccess ? (
              "Uploaded!"
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="bg-black">
      {/* Mobile Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none mb-4">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">DefconGPT</Navbar.Brand>
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

            <div className="mt-3 text-white w-100">
              <h5>History</h5>
              {messages.length > 0 ? (
                messages.map((msg, idx) => (
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
                    {generateTitle(msg.question)}
                  </div>
                ))
              ) : (
                <div className="text-muted">No chat history yet</div>
              )}
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

            <div className="mt-3 text-white w-100">
              <h5>History</h5>
              {messages.length > 0 ? (
                messages.map((msg, idx) => (
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
                    {generateTitle(msg.question)}
                  </div>
                ))
              ) : (
                <div className="text-muted">No chat history yet</div>
              )}
            </div>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="p-md-4 w-100" style={{ minHeight: "100vh" }}>
          {isVisible && <h4 className="text-white mb-4">DefconGPT</h4>}

          <div
            className="row g-0 p-0 justify-content-center align-items-center mt-16"
            style={{ backgroundColor: "black", width: "100%", marginTop: "20%" }}
          >
            <div className="col-11 col-md-10 d-flex flex-column justify-content-center align-items-center h-100">
              {/* Error alerts */}
              {apiError && (
                <Alert variant="danger" className="w-100 mb-3">
                  {apiError}
                </Alert>
              )}

              {/* Chat container */}
              {messages.length > 0 && (
                <div
                  className="response chat-container w-100 mb-3 bg-dark rounded-4 text-white p-3 font-large"
                  style={{
                    marginTop: "-20%",
                    overflowY: "auto",
                    maxHeight: "60vh"
                  }}
                  ref={chatContainerRef}
                >
                  {loading && showGenerating && (
                    <div className="mb-3 bg-dark rounded-4 text-white p-3 font-large text-center">
                      <span className="spinner-border spinner-border-sm"></span>{" "}
                      Generating response...
                    </div>
                  )}
                  
                  {messages.map((msg, idx) => (
                    <div key={idx} className="mb-3">
                      <div className="d-flex justify-content-end">
                        <div
                          className="user-message p-2 rounded-4"
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            alignSelf: "flex-end",
                            maxWidth: "fit-content",
                            wordWrap: "break-word",
                            borderRadius: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {msg.question}
                        </div>
                      </div>

                      <div className="d-flex justify-content-start">
                        <div
                          className="bot-message p-2 rounded"
                          style={{
                            backgroundColor: "#DCDCDC",
                            color: "black",
                            alignSelf: "flex-start",
                            maxWidth: "fit-content",
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
              <div className="w-100">
                {messages.length === 0 && !response && (
                  <h3 className="text-center text-white mb-4">
                    What can I help with?
                  </h3>
                )}

                {/* Wrapper div for input and buttons */}
                <div className="d-flex flex-column border border-secondary rounded bg-dark">
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />

                  <div className="px-2 py-2 d-flex justify-content-between">
                    {/* File Upload Popover */}
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      show={popoverOpen}
                      onToggle={handlePopoverToggle}
                      rootClose
                      overlay={uploadPopover}
                    >
                      <button className="upload-btn text-white p-0 g-0 bg-transparent border-0">
                        <CiCirclePlus className="fs-3" />
                      </button>
                    </OverlayTrigger>

                    {/* Send Button */}
                    {!input || input.trim() === "" ? (
                      <Button 
                        className="rounded-5 p-2" 
                        variant="success" 
                        onClick={startListening}
                        disabled={isListening}
                      >
                        {isListening ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <RiVoiceprintFill className="fs-4" />
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="rounded-5 p-2"
                        variant="success"
                        onClick={sendMessage}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <FaArrowUp className="fs-4" />
                        )}
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
