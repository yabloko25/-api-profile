import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://nt-devconnector.onrender.com/api/profile";

const DevelopersList = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setDevelopers(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching developers:", error));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Developers</h1>
      <ul>
        {developers.map(dev => (
          <li key={dev._id} className="mb-2 border-b pb-2">
            <Link to={`/developer/${dev._id}`} className="text-blue-500 hover:underline">
              {dev.user.name} - {dev.status} ({dev.company})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DeveloperDetail = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => {
        setDeveloper(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching developer details:", error));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!developer) return <p>Developer not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{developer.user.name}</h1>
      <p><strong>Status:</strong> {developer.status}</p>
      <p><strong>Company:</strong> {developer.company || "N/A"}</p>
      <p><strong>Website:</strong> <a href={developer.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{developer.website}</a></p>
      <Link to="/" className="text-blue-500 hover:underline">Back to Developers</Link>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DevelopersList />} />
          <Route path="/developer/:id" element={<DeveloperDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
