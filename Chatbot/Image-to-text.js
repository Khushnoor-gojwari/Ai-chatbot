// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import {OpenAIOutlined,HomeOutlined} from "@ant-design/icons";
// import {
//   Navbar,
//   Nav,
//   Offcanvas,
//   Form,
//   InputGroup,
//   Container,
  
// } from "react-bootstrap";

// const ImageToText = () => {
//   const [input, setInput] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsVisible(window.innerWidth > 991);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div style={{ height: "100vh", backgroundColor: "#000" }}>
//       <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
//         <Navbar.Toggle onClick={() => setShowSidebar(true)} />
//         <Navbar.Brand href="#">Image to Text</Navbar.Brand>
//       </Navbar>

//       <Offcanvas
//         show={showSidebar}
//         onHide={() => setShowSidebar(false)}
//         className="bg-dark text-white"
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Menu</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Nav className="flex-column">
//             <Link to="/chatbot" style={{ textDecoration: "none" }}>
//               <Nav.Link href="#home" className="text-white">
//                <HomeOutlined/> Home
//               </Nav.Link>
//             </Link>
//             <Link to="/exploregpt" style={{ textDecoration: "none" }}>
//               <Nav.Link href="#exploregpt" className="text-white">
//                <OpenAIOutlined/> Explore GPTs
//               </Nav.Link>
//             </Link>
//           </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>

//       <div className="d-flex" style={{ height: "100%" }}>
//         {isVisible && (
//           <div
//             className="bg-dark text-white p-4 d-none d-lg-block"
//             style={{ width: "250px" }}
//           >
//             <h5 className="mb-4">Menu</h5>
//             <Nav className="flex-column">
//               <Link to="/chatbot" style={{ textDecoration: "none" }}>
//                 <Nav.Link href="#home" className="text-white">
//                 <HomeOutlined/>  Home
//                 </Nav.Link>
//               </Link>
//               <Link to="/exploregpt" style={{ textDecoration: "none" }}>
//                 <Nav.Link href="#exploregpt" className="text-white">
//                 <OpenAIOutlined/>   Explore GPTs
//                 </Nav.Link>
//               </Link>
//             </Nav>
//           </div>
//         )}

//         <div
//           className="flex-grow-1 d-flex flex-column"
//           style={{ backgroundColor: "white" }}
//         >
//           <div className="p-4" style={{ marginTop: "10%" }}>
//             <div className="d-flex justify-content-center align-items-center">
//               <h3 style={{ color: "black" }}>Image to Text Converter</h3>
//             </div>

//             <InputGroup className="mb-3 bg-white">
//               <Form.Control
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Enter image URL..."
//                 className="text-black bg-white"
//                 style={{
//                   resize: "none",
//                   overflowY: "auto",
//                   minHeight: "40px",
//                   boxSizing: "border-box",
//                   wordWrap: "break-word",
//                   whiteSpace: "pre-wrap",
//                 }}
//               />
//               <InputGroup.Text>
//                 <i className="bi bi-image"></i>
//               </InputGroup.Text>
//             </InputGroup>

//             <Container className="content">
//               <h3>Upload Your Image</h3>
//               <p style={{ color: "#B4B4B4" }}>Extract text from images easily</p>
//               <Form.Group controlId="formFile" className="mb-3">
//                 <Form.Control type="file" accept="image/*" />
//               </Form.Group>
//               <button className="btn btn-primary">Convert to Text</button>
//             </Container>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageToText;




import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { OpenAIOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Navbar,
  Nav,
  Offcanvas,
  Form,
  Container,
  Button,
} from "react-bootstrap";

const ImageToText = () => {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
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

  // Handle File Upload
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  // Handle Caption Generation
  const generateCaption = async () => {
    if (!imageFile) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);
    setCaption(""); // Clear previous caption

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch("http://localhost:8000/generate-caption/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate caption. Check the backend logs.");
    }

    setLoading(false);
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">Image to Text</Navbar.Brand>
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
                <HomeOutlined /> Home
              </Nav.Link>
            </Link>
            <Link to="/exploregpt" style={{ textDecoration: "none" }}>
              <Nav.Link href="#exploregpt" className="text-white">
                <OpenAIOutlined /> Explore GPTs
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
                <Nav.Link  href="#home" className="text-white">
                  <HomeOutlined /> Home
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
              <h3 style={{ color: "black" }}>Image to Text Converter</h3>
            </div>

            {/* File Upload */}
            <Container className="content">
              <h4>Upload an Image</h4>
              <p style={{ color: "#B4B4B4" }}>Extract text from images easily</p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>
              <Button variant="primary" onClick={generateCaption} disabled={loading}>
                {loading ? "Processing..." : "Convert to Text"}
              </Button>
            </Container>

            {/* Display Generated Caption */}
            {caption && (
              <div className="mt-4">
                <h5>Generated Caption:</h5>
                <p style={{ color: "black", fontWeight: "bold" }}>{caption}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToText;
