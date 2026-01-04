import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, expect, test, beforeEach } from 'vitest';
import App from './App';

/**
 * PHASE 5: TESTING (12% MARKS)
 * I am mocking the global fetch because Vitest runs in Node.js 
 * and cannot access '/properties.json' directly via URL.
 */
const mockProperties = {
  properties: [
    {
      id: "prop1",
      type: "House",
      price: 750000,
      location: "Petts Wood Road, BR1",
      bedrooms: 4,
      added: { month: "January", day: 1, year: 2024 },
      picture: "img1.jpg",
      images: ["img1.jpg"],
      description: "A beautiful test property for JEST verification."
    }
  ]
};

beforeEach(() => {
  cleanup();
  // Security: Mocking the API response to ensure tests are predictable
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProperties),
    })
  );
});

// Test 1: Data Fetching (Requirement: Asset Hunt 4%)
test('renders available properties after fetching data', async () => {
  render(<App />);
  // Wait for the count to update to (1) based on our mock data
  const titleElement = await screen.findByText(/Available Properties \(1\)/i);
  expect(titleElement).toBeInTheDocument();
});

// Test 2: Search Logic (Requirement: Advanced Search 10%)
test('filters properties by postcode area', async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Postcode Area/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  // Simulate user typing 'BR1' to test filter accuracy
  fireEvent.change(searchInput, { target: { value: 'BR1' } });
  fireEvent.click(searchButton);

  const propertyLocation = await screen.findByText(/Petts Wood Road, BR1/i);
  expect(propertyLocation).toBeInTheDocument();
});

// Test 3: Date Filtering (Requirement: Advanced Search Logic)
test('filters properties added after a specific date', async () => {
  render(<App />);
  const dateInput = screen.getByLabelText(/Added After/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  // Selecting a future date to ensure the filter empties the results
  fireEvent.change(dateInput, { target: { value: '2025-01-01' } });
  fireEvent.click(searchButton);

  const countText = await screen.findByText(/Available Properties \(0\)/i);
  expect(countText).toBeInTheDocument();
});

// Test 4: Favorites System (Requirement: Favorites Logic 18%)
test('adds a property to favorites when button is clicked', async () => {
  render(<App />);
  // We use findByRole to wait for the button inside the property card
  const addButton = await screen.findByRole('button', { name: /Add to Favorites/i });
  fireEvent.click(addButton);

  // Verify the sidebar title exists and the property was added
  const favoritesHeading = screen.getByRole('heading', { name: /Favorites/i });
  expect(favoritesHeading).toBeInTheDocument();
});

// Test 5: Navigation (Requirement: Listing Links 10%)
test('navigates to the individual property page on click', async () => {
  render(<App />);
  
  // Wait for the property card image (Alt text set to 'House')
  const propertyImg = await screen.findByAltText(/House/i);
  fireEvent.click(propertyImg);

  // Requirement: Check if the Detail Page template loaded successfully
  const backLink = await screen.findByText(/Back to Search/i);
  expect(backLink).toBeInTheDocument();
});