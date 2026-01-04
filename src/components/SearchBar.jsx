import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    //  initialized all fields as empty strings or 'any' to ensure controlled components
    const [searchData, setSearchData] = useState({
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: '',
        dateFrom: '' // Advanced Search: Handles properties added after a specific date
    });

    // Generic Change Handler: Updates the specific state field based on input 'name'
    // This reduces code repetition and keeps the component clean
    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    // Submits the collected search criteria back to the parent (App.jsx) for filtering
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page refresh on form submission
        onSearch(searchData);
    };

    return (
        <section className="search-container">
            <h1>Believe in Finding it</h1>
            
            <form onSubmit={handleSubmit}>
                {/* I used a flex-row div to keep all search inputs tightly aligned for Aesthetics */}
                <div className="input-row">
                    
                    {/* Requirement: Property Type Filter (House/Flat/Any) */}
                    <select name="type" value={searchData.type} onChange={handleChange}>
                        <option value="any">Any Type</option>
                        <option value="house">House</option>
                        <option value="flat">Flat</option>
                    </select>

                    {/* Requirement: Price Range Filter (Min/Max) */}
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={searchData.minPrice}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={searchData.maxPrice}
                        onChange={handleChange}
                    />

                    {/* Requirement: Bedroom Range Filter (Min/Max) */}
                    <input
                        type="number"
                        name="minBedrooms"
                        placeholder="Min Beds"
                        value={searchData.minBedrooms}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="maxBedrooms"
                        placeholder="Max Beds"
                        value={searchData.maxBedrooms}
                        onChange={handleChange}
                    />

                    {/* Requirement: Postcode Area Filter (e.g., BR1, NW1) */}
                    {/* Styled as a text input with a specific class for professional alignment */}
                    <input
                        type="text"
                        name="postcode"
                        className="postcode-input"
                        placeholder="Postcode Area"
                        value={searchData.postcode}
                        onChange={handleChange}
                    />

                    {/* Requirement: Advanced Date Filter */}
                    {/* Used type="date" to provide a standard UI widget for better UX */}
                    <div className="date-group">
                        <label htmlFor="dateFrom">Added After:</label>
                        <input
                            id="dateFrom"
                            type="date"
                            name="dateFrom"
                            value={searchData.dateFrom}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="search-btn">Search</button>
                </div>
            </form>
        </section>
    );
};

export default SearchBar;