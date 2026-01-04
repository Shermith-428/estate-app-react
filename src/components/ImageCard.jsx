import React from 'react';
import { Link } from 'react-router-dom';

const ImageCard = ({ property, onAddToFav, onRemoveFav, isFav }) => {
  const { id, type, price, location, picture } = property;

  return (
    <section 
      className="card" 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("property", JSON.stringify(property))}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }} // Ensures cards are same height
    >
      <Link to={`/property/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="image-container" style={{ height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
          <img 
            src={picture}
            alt={type} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Corrects alignment
          />
        </div>
      </Link>

      <div className="description" style={{ flexGrow: 1, padding: '10px' }}>
        <Link to={`/property/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ margin: '5px 0', color: 'rgb(0, 100, 245)' }}>{type} - £{price.toLocaleString()}</h3>
        </Link>
        <p style={{ fontSize: '14px', color: '#555' }}>{location}</p>
        
        {/* Requirement: Clear action buttons */}
        <div style={{ marginTop: 'auto' }}>
          {isFav ? (
            <button 
              onClick={() => onRemoveFav(id)} 
              style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px', width: '100%', cursor: 'pointer', borderRadius: '5px' }}
            >
              Remove from Favorites
            </button>
          ) : (
            <button 
              onClick={() => onAddToFav(property)} 
              style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px', width: '100%', cursor: 'pointer', borderRadius: '5px' }}
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageCard;