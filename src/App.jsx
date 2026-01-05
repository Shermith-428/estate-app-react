
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import PropertyPage from './components/PropertyPage';
import './App.css';

function App() {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Phase: Asset Hunt & Data Fetching (4% Marks) [cite: 34, 75]
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Updated path to relative for GitHub Pages compatibility [cite: 166]
        const response = await fetch('./properties.json');
        const data = await response.json();
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    fetchData();
  }, []);

  // Phase: Advanced Search Logic (10% Marks) [cite: 102, 106]
  const handleSearch = (criteria) => {
    const filtered = allProperties.filter(prop => {
      const matchType = criteria.type === 'any' || prop.type.toLowerCase() === criteria.type.toLowerCase();
      
      const matchPrice = (!criteria.minPrice || prop.price >= parseInt(criteria.minPrice)) &&
                         (!criteria.maxPrice || prop.price <= parseInt(criteria.maxPrice));
      
      const matchBeds = (!criteria.minBedrooms || prop.bedrooms >= parseInt(criteria.minBedrooms)) &&
                        (!criteria.maxBedrooms || prop.bedrooms <= parseInt(criteria.maxBedrooms));
      
      const matchPostcode = !criteria.postcode || 
                            prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());
      
      const propDate = new Date(`${prop.added.month} ${prop.added.day}, ${prop.added.year}`);
      const searchDate = criteria.dateFrom ? new Date(criteria.dateFrom) : null;
      const matchDate = !searchDate || propDate >= searchDate;

      return matchType && matchPrice && matchBeds && matchPostcode && matchDate;
    });
    setFilteredProperties(filtered);
  };

  // Phase: Favorites System Logic (18% Marks) [cite: 46, 126, 131]
  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    } else {
      alert("Property already in Favorites!");
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <main>
      {/* Requirement: Router removed from here to fix 'Router inside another Router' error */}
      <Routes>
        <Route path="/" element={
          <>
            <SearchBar onSearch={handleSearch} />
            <Gallery 
              properties={filteredProperties} 
              favorites={favorites} 
              onAddToFav={addToFavorites}
              onRemoveFav={removeFromFavorites}
              onClearFav={clearFavorites}
            />
          </>
        } />
        <Route path="/property/:id" element={<PropertyPage properties={allProperties} />} />
      </Routes>
    </main>
  );
}

export default App;