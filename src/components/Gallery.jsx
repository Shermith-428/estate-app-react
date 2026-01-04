import React, { useState } from 'react'; // Added useState for hover tracking
import ImageCard from './ImageCard';

const Gallery = ({ properties, favorites, onAddToFav, onRemoveFav, onClearFav }) => {
  // Phase 3: State to track if an item is currently being dragged over the sidebar
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false); // Reset hover effect on drop
    try {
      const propertyData = JSON.parse(e.dataTransfer.getData("property"));
      onAddToFav(propertyData);
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  // Requirement: Change state when item enters/leaves the sidebar area
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="container">
      <div className="all-items">
        <h2>Available Properties ({properties.length})</h2>
        <div className="gallery">
          {properties.map((item) => (
            <ImageCard key={item.id} property={item} onAddToFav={onAddToFav} isFav={false} />
          ))}
        </div>
      </div>
      
      {/* Requirement: Dynamically apply the 'drag-over' class based on state.
        Added handleDragEnter and handleDragLeave for the hover effect.
      */}
      <div 
        className={`favorites ${isOver ? 'drag-over' : ''}`} 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className="fav-header">
          <h2>Favorites</h2>
          {favorites.length > 0 && <button onClick={onClearFav} className="clear-btn">Clear All</button>}
        </div>
        <div className="gallery">
          {favorites.length === 0 ? (
            <p className="drop-text">Drop properties here</p>
          ) : (
            favorites.map((item) => (
              <ImageCard key={item.id} property={item} onRemoveFav={onRemoveFav} isFav={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;