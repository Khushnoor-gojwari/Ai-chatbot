import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import  { useState } from 'react';
import emailjs from 'emailjs-com';
import Navbar from './Header';
import { useNavigate,Link } from 'react-router-dom';
import img1 from '../chatbot.jpg'


export default function DefconLandingPage() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/function');  // Navigates to the FunctionApp page
  };

 

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
      const [status, setStatus] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        emailjs
          .send(
            'YOUR_SERVICE_ID', // Service ID
            'YOUR_TEMPLATE_ID', // Template ID
            formData,           // Form data
            'YOUR_USER_ID'      // User ID (provided by EmailJS)
          )
          .then(
            (result) => {
              setStatus('Message sent successfully!');
              console.log(result.text);
            },
            (error) => {
              setStatus('Error sending message.');
              console.log(error.text);
            }
          );
      };  
  

  return (
    <div>
        <Navbar/>
    <div>
      {/* Hero Section */}
     <section className="min-vh-100 d-flex align-items-center position-relative overflow-hidden">
  {/* Background image */}
  <div 
    className="position-absolute w-100 h-100" 
    style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>

  {/* Dark overlay */}
  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

  {/* Content */}
  <div className="container position-relative text-center text-white">
    <h1 className="display-3 fw-bold mb-4">Empowering Innovation with AI Solutions by Defcon Innovations</h1>
    <p className="lead mb-5">Transform your business with our advanced Chatbot and Data Robot technologies. Experience the future of automation today.</p>
    <div className="d-flex justify-content-center gap-3">
      <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('features')}>Explore Features</button>
      <button className="btn btn-outline-light btn-lg">Watch Demo</button>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Cutting-Edge Features</h2>
            <p className="lead text-muted">Discover how our AI solutions can revolutionize your business operations</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <img loading='eager' style={{height:"427px"}} src={img1} className="card-img-top" alt="AI-Powered Chatbot" />
                <div className="card-body">
                  <Link to="/chatbot"><button className='btn btn-primary btn-lg' 
                    ><h3 className="card-title">AI-Powered Chatbot</h3></button></Link>
                  <p className="card-text">Intelligent conversational AI that understands context and provides human-like responses.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <img src="./data.jpg" className="card-img-top"
                     style={{height:"427px"}}  alt="Data Robot" />
                <div className="card-body">
                  <button onClick={handleClick} className='btn btn-primary btn-lg' style={{border:"none"}} 
                  ><h3 className="card-title">Data Robot</h3></button>
                  <p className="card-text" style={{marginTop:"20px"}} 
                  >Advanced data processing and analytics powered by machine learning algorithms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    <section id="contact" className="py-5">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">Get in Touch With Us</h2>
            <p className="lead text-muted mb-5">
              Ready to transform your business with AI? Contact us today to learn how our solutions can work for you.
            </p>
            <p><i className="bi bi-telephone me-2"></i> +91 9906934454 </p>
            <p><i className="bi bi-envelope me-2"></i>contact@defcon-innovations.com</p>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      className="form-control"
                      rows={5}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Send Message
                    </button>
                  </div>
                </form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    </div>
  );
}
