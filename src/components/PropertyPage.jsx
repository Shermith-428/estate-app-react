import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyPage = ({ properties }) => {
  const { id } = useParams();
  // Find the specific property based on the URL ID
  const property = properties.find(p => p.id === id);
  
  // State for toggling the main view image
  const [mainImage, setMainImage] = useState('');
  // State for the Description/Floorplan/Map tabs
  const [activeTab, setActiveTab] = useState('description');

  // Initialize the main image once the property data is available
  useEffect(() => {
    if (property) {
      setMainImage(property.picture);
    }
  }, [property]);

  // Handle case where property ID doesn't exist (Security/Error Handling)
  if (!property) {
    return (
      <div className="property-page">
        <Link to="/" className="back-link">← Back to Search</Link>
        <h2>Property Not Found</h2>
      </div>
    );
  }

  return (
    <div className="property-page">
      {/* Navigation Requirement: Back to search link */}
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <h1>{property.type} - {property.location}</h1>
      <h2 style={{color: '#0064f5', marginBottom: '20px'}}>£{property.price.toLocaleString()}</h2>

      <div className="gallery-section">
        {/* Main Feature Image */}
        <div className="main-image">
          <img src={`/${mainImage}`} alt="Property" />
        </div>

        {/* Phase 4 Requirement: Thumbnail Gallery for toggling images */}
        <div className="thumbnails">
          {property.images.map((img, index) => (
            <img 
              key={index} 
              src={`/${img}`} 
              className={mainImage === img ? 'active-thumb' : ''} 
              onClick={() => setMainImage(img)}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Phase 4 Requirement: Tabbed interface for additional info */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button 
            onClick={() => setActiveTab('description')} 
            className={activeTab === 'description' ? 'active' : ''}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('floorplan')} 
            className={activeTab === 'floorplan' ? 'active' : ''}
          >
            Floor Plan
          </button>
          <button 
            onClick={() => setActiveTab('map')} 
            className={activeTab === 'map' ? 'active' : ''}
          >
            Map
          </button>
        </div>

        <div className="tab-content">
          {/* Dynamic content rendering based on active tab */}
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{property.description}</p>
              <ul style={{marginTop: '20px', listStyleType: 'none'}}>
                <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                <li><strong>Tenure:</strong> Freehold</li>
                <li><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</li>
              </ul>
            </div>
          )}

          {activeTab === 'floorplan' && (
            <div className="floorplan-view">
              <img src="/images/floorplan.png" alt="Floorplan" style={{width: '100%', borderRadius: '10px'}}/>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="map-view">
              <iframe 
                title="property-map"
                width="100%" 
                height="400" 
                style={{border: 0, borderRadius: '10px'}}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;