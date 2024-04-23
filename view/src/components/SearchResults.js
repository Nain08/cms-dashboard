import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './SearchResults.css';

function SearchResults({ searchQuery, onClose }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [pageResponse, categoryResponse, userResponse] = await Promise.all([
          fetch('http://localhost:8080/page/getPages'),
          fetch('http://localhost:8080/category/getCategories'),
          fetch('http://localhost:8080/user/getUsers')
        ]);

        const [pageData, categoryData, userData] = await Promise.all([
          pageResponse.json(),
          categoryResponse.json(),
          userResponse.json()
        ]);

        const combinedResults = [
          ...pageData.map((page) => ({ type: 'Page', name: page.pageName })),
          ...categoryData.map((category) => ({ type: 'Category', name: category.categoryName })),
          ...userData.map((user) => ({ type: 'User', name: user.name })),
        ];

        setSearchResults(filterResults(combinedResults, searchQuery));
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Error fetching search results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const filterResults = (results, query) => {
    const lowerCaseQuery = query.toLowerCase();
    return results.filter((result) => {
      if (result && result.type) {
        switch (result.type) {
          case 'User':
            return result.name && result.name.toLowerCase().includes(lowerCaseQuery);
          case 'Page':
            return result.name && result.name.toLowerCase().includes(lowerCaseQuery);
          case 'Category':
            return result.name && result.name.toLowerCase().includes(lowerCaseQuery);
          default:
            return false;
        }
      }
      return false;
    });
  };

  const handleClose = () => {
    
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="search-results-container">
      
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && searchResults.length === 0 && <p>No results found.</p>}

      <ListGroup>
        {searchResults.map((result, index) => (
          <ListGroup.Item key={index}>
            {result.type === 'User' && (
              <div>
                User: {result.name}
              </div>
            )}
            {result.type === 'Page' && (
              <div>
                Page: {result.name}
              </div>
            )}
            {result.type === 'Category' && (
              <div>
                Category: {result.name}
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="outline-secondary" className="close-button" onClick={handleClose}>
        Close
      </Button>
    </div>
  );
}

export default SearchResults;
