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
 
//   Button,
// } from "react-bootstrap";

// const TextToImage = () => {
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
//         <Navbar.Brand href="#">Text to Image</Navbar.Brand>
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
//               <HomeOutlined/>  Home
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
//               <h3 style={{ color: "black" }}>Text to Image Generator</h3>
//             </div>

//             <InputGroup className="mb-3 bg-white">
//               <Form.Control
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Enter text to generate an image..."
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
//               <Button variant="primary">Generate Image</Button>
//             </InputGroup>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextToImage;




import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { OpenAIOutlined, HomeOutlined } from "@ant-design/icons";
import { Navbar, Nav, Offcanvas, Form, InputGroup, Button } from "react-bootstrap";

const TextToImage = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
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

  // const generateImage = async () => {
  //   if (!input) {
  //     alert("Please enter a prompt!");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:8000/generate-image/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt: input }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to generate image");
  //     }

  //     const data = await response.json();
  //     setImage(`data:image/png;base64,${data.image_data}`);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Failed to generate image. Check the backend logs.");
  //   }
  //   setLoading(false);
  // };

  const generateImage = async () => {
    if (!input) {
      alert("Please enter a prompt!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-image/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
  
      const data = await response.json();
      setImage(data.image_url); // Use the image URL instead of base64
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image. Check the backend logs.");
    }
    setLoading(false);
  };
  


  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Toggle onClick={() => setShowSidebar(true)} />
        <Navbar.Brand href="#">Text to Image</Navbar.Brand>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="bg-dark text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to="/chatbot" style={{ textDecoration: "none" }}>
              <Nav.Link href="#home" className="text-white"><HomeOutlined /> Home</Nav.Link>
            </Link>
            <Link to="/exploregpt" style={{ textDecoration: "none" }}>
              <Nav.Link href="#exploregpt" className="text-white"><OpenAIOutlined /> Explore GPTs</Nav.Link>
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex" style={{ height: "100%" }}>
        {isVisible && (
          <div className="bg-dark text-white p-4 d-none d-lg-block" style={{ width: "250px" }}>
            <h5 className="mb-4">Menu</h5>
            <Nav className="flex-column">
              <Link to="/chatbot" style={{ textDecoration: "none" }}>
                <Nav.Link href="#home" className="text-white"><HomeOutlined /> Home</Nav.Link>
              </Link>
              <Link to="/exploregpt" style={{ textDecoration: "none" }}>
                <Nav.Link href="#exploregpt" className="text-white"><OpenAIOutlined /> Explore GPTs</Nav.Link>
              </Link>
            </Nav>
          </div>
        )}

        <div className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: "white" }}>
          <div className="p-4" style={{ marginTop: "10%" }}>
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "black" }}>Text to Image Generator</h3>
            </div>

            <InputGroup className="mb-3 bg-white">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to generate an image..."
                className="text-black bg-white"
              />
              <Button variant="primary" onClick={generateImage} disabled={loading}>
                {loading ? "Generating..." : "Generate Image"}
              </Button>
            </InputGroup>

            {/* Show Image if Generated */}
            {image && (
              <div className="d-flex justify-content-center mt-3">
                <img src={image} alt="Generated" style={{ width: "600px", height: "auto", objectFit: "cover" }}  />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
