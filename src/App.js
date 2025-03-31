import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./component/Navbar.js";
import './App.css';
import tabaco from './img/tabaco.jpg';
import logo1 from './img/logo1.png';
import logo2 from './img/logo2.png';
import blog1 from './img/blog1.jpg';
import blog2 from './img/blog2.jpg';
import blog3 from './img/blog3.jpg';
import main_logo from './img/main-logo.png';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setPrediction(null);
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("https://falsk-server.onrender.com/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data);
      setToast("Prediction Success!");
    } catch (err) {
      setError("Failed to get prediction. Try again.");
      setToast("Prediction Failed.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }

    // Show toast for 3 seconds
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="App">
      <Navbar />

      {/* Toast Notification */}
      {toast && <div className={`toast ${toast === "Prediction Failed." ? "error" : ""} show`}>{toast}</div>}

      <img src={main_logo} className="main-logo" />
      
      {/* Awareness Section */}
      <section className="awareness">
        <h3>What is Oral Cancer?</h3>
        <p>Oral cancer refers to cancer that develops in the mouth, lips, tongue, cheeks, floor of the mouth, and throat...</p>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <h2>Oral Cancer Image Classification</h2>

        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <br /><br />
          
          {/* Image preview */}
          {imagePreview && (
            <div className="image-preview">
              <h4>Image Preview:</h4>
              <img src={imagePreview} alt="Selected" style={{ width: "200px", borderRadius: "5px" }} />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Upload & Predict"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {prediction && (
          <div className="prediction-result">
            <h3>Prediction Result</h3>
            <p><strong>Class:</strong> {prediction.class}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}%</p>

            {/* Display the uploaded image
            <div>
              <h4>Uploaded Image:</h4>
              <img src={imagePreview} alt="Uploaded" style={{ width: "200px", marginTop: "10px", borderRadius: "5px" }} />
            </div> */}

            {/* Display the prediction result image */}
            <div>
              <h4>Predicted Image:</h4>
              <img src={imagePreview} alt="Prediction Result" style={{ width: "200px", marginTop: "10px", borderRadius: "5px" }} />
            </div>
          </div>
        )}
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <h2>Latest Articles</h2>
        <div className="blog-item">
          <img src={blog1} alt="Blog 1" className="blog-thumbnail" />
          <div className="blog-content">
            <h4>
              <a href="https://oralcancerfoundation.org/oral-cancer-answers-with-jo-anne-jones/" target="_blank" rel="noopener noreferrer">Oral Cancer Answers with Jo-Anne Jones</a>
            </h4>
            <p>Oral Cancer Answers Podcast...</p>
          </div>
        </div>
        <div className="blog-item">
          <img src={blog2} alt="Blog 2" className="blog-thumbnail" />
          <div className="blog-content">
            <h4>
              <a href="https://oralcancerfoundation.org/ocf-rdh-part-change-campaign/" target="_blank" rel="noopener noreferrer">Be part of the change™</a>
            </h4>
            <p>In the world of cancer...</p>
          </div>
        </div>
        <div className="blog-item">
          <img src={blog3} alt="Blog 3" className="blog-thumbnail" />
          <div className="blog-content">
            <h4>
              <a href="https://oralcancerfoundation.org/ocf-founders-holiday-wish/" target="_blank" rel="noopener noreferrer">OCF Founder’s Holiday wish</a>
            </h4>
            <p>Brian Hill, OCF Founder...</p>
          </div>
        </div>
      </section>

      {/* Prevention Tips Section */}
      <section className="prevention-tips">
        <h3>Prevention Tips</h3>
        <ul>
          <li>Avoid tobacco and alcohol consumption.</li>
          <li>Maintain good oral hygiene, including regular brushing and flossing.</li>
          <li>Visit your dentist regularly for checkups and screenings.</li>
          <li>Eat a balanced diet rich in fruits and vegetables.</li>
        </ul>
        <img src={tabaco} className="tabaco" />
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <h3>Oral Cancer Statistics</h3>
        <ul>
          <li>About 54,540 new cases of oral cancer are diagnosed each year in India.</li>
          <li>Oral cancer has a survival rate of over 80% when diagnosed early.</li>
          <li>Over 50% of oral cancer cases in India are caused by tobacco consumption.</li>
        </ul>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info">
        <h3>Contact Information</h3>
        <ul>
          <li>National Cancer Institute: <a href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">www.cancer.gov</a></li>
          <li>Oral Cancer Foundation: <a href="https://oralcancerfoundation.org" target="_blank" rel="noopener noreferrer">oralcancerfoundation.org</a></li>
        </ul>
        <div className="logo-img">
          <img src={logo1} className="logo1" />
          <img src={logo2} className="logo2" />
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="resources">
        <h3>Additional Resources</h3>
        <ul>
          <li><a href="https://www.cancer.gov/about-cancer/causes-prevention/risk-factors" target="_blank" rel="noopener noreferrer">Cancer.gov - Risk Factors</a></li>
          <li><a href="https://www.cdc.gov/cancer/oral" target="_blank" rel="noopener noreferrer">CDC - Oral Cancer</a></li>
          <li><a href="https://oralcancerfoundation.org/prevention" target="_blank" rel="noopener noreferrer">Oral Cancer Foundation - Prevention</a></li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo1} alt="Logo" className="footer-logo-img" />
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#awareness">What is Oral Cancer?</a></li>
              <li><a href="#prevention-tips">Prevention Tips</a></li>
              <li><a href="#statistics">Statistics</a></li>
              <li><a href="#contact-info">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
