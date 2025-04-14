import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css'; // Make sure this file contains the .search-container styles

function PropertySearch() {
    const [location, setLocation] = useState('');
    const [properties, setProperties] = useState([]);

    const searchProperties = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/properties?location=${location}`);
            setProperties(res.data);
        } catch (err) {
            alert("❌ Error fetching properties");
        }
    };

    const handleSelectProperty = async (id) => {
        try {
            await axios.put(`http://localhost:5000/properties/${id}/sell`);
            alert("✅ Property marked as sold!");
            searchProperties(); // Refresh list
        } catch (err) {
            alert("❌ Error selecting property");
        }
    };

    return (
        <div className="search-container">
            <div className="form-box">
                <h2>Search for Properties</h2>
                <input 
                    type="text" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
                <button onClick={searchProperties}>🔍 Search</button>

                <div className="property-list">
                    {properties.length === 0 && <p>No properties found</p>}
                    {properties.map(property => (
                        <div key={property.id} className="property-item">
                            <h3>{property.title} ({property.type})</h3>
                            <p>Location: {property.location}</p>
                            <p>Price: ${property.price}</p>
                            <p>Status: {property.status}</p>
                            <img 
                                src={property.image} 
                                alt={property.title} 
                                className="property-image"
                                onError={(e) => e.target.src = "http://localhost:5000/uploads/default.jpg"} 
                            />
                            {(property.status.toLowerCase() === "available" || property.status.toLowerCase() === "for sale") && (
                                <button onClick={() => handleSelectProperty(property.id)}>Select</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PropertySearch;
