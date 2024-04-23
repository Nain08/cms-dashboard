import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button} from 'react-bootstrap';
import UserTable from './UserTable';
import PaginationComponent from './PaginationComponent';
import './Page.css'
const PageComponent = () => {
  const [data, setData] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const initialSortBy = 'name';
  const [sortBy, setSortBy] = useState({ field: initialSortBy, order: 'asc' });
  const [sortOrder, setSortOrder] = useState('asc');
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/user/getUsers');
        setData(response.data);
        
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    }
    fetchData();
  });

  

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const headers = [
    { label: 'Full Name', field: 'name' },
    { label: 'Email', field: 'email' },
    { label: 'Group', field: 'group' },
  ];

  const sortedData = useMemo(() => {
    if (sortBy) {
      const sorted = [...data].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue !== undefined && bValue !== undefined) {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return 0;
        }
      });

      return sorted;
    }

    return data;
  }, [data, sortBy, sortOrder]);

  const renderTableHeader = () => {
    return (
      <tr>
       
        {headers.map((header) => (
          <th
            key={header.field}
            className='cell-heading'
            onClick={() => handleSort(header.field)}
            style={{ cursor: 'pointer' }}
          >
            {header.label}{' '}
            <FontAwesomeIcon
              icon={sortOrder === 'asc' ? faSortUp : faSortDown}
              className={`sort-icon visible`}
            />
          </th>
        ))}
      </tr>
    );
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='page-container'>
      <div className='page-heading'>
        <FontAwesomeIcon icon={faUser} size='xl' className='heading-icon' />
        <h2 className='heading-text'>Users</h2>
      </div>
      <div className='location'>
        <span style={{ color: '#2fa4e7' }}>Dashboard / </span>
        <span>Users</span>
      </div>
      <UserTable
        headers={headers}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortedData={sortedData.slice(indexOfFirstRow, indexOfLastRow)}
        
      />
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default PageComponent;
