import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './LatestPage.css';

function LatestPages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPages() {
      try {
        const response = await axios.get('http://localhost:8080/page/getPages');
        const sortedPages = response.data.sort((a, b) => {
          return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
        const latestPages = sortedPages.slice(0, 5);
        setData(latestPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setError(error.message || 'An error occurred while fetching pages');
        setLoading(false);
      }
    }

    getPages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='cell-heading'>Page Title</th>
            <th className='cell-heading'>Category</th>
            <th className='cell-heading'>Author</th>
          </tr>
        </thead>
        <tbody>
          {data.map((page) => (
            <tr key={page._id}>
              <td className='cell-data-name'>{page.pageName}</td>
              <td className='cell-data'>{page.categoryName}</td>
              <td className='cell-data'>{page.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to='/pages'>
        <Button variant='light'>View all pages</Button>
      </Link>
    </div>
  );
}

export default LatestPages;
