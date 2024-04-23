import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const CategoryTable = ({ headers, handleSort, sortOrder, sortedData,selectedCategories, handleCheckboxChange,handleHeaderCheckboxChange }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <input type='checkbox' checked={selectedCategories.length === sortedData.length}
              onChange={handleHeaderCheckboxChange}/>
          </th>
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
      </thead>
      <tbody>
        {sortedData.map((category) => (
          <tr key={category._id}>
            <td>
              <input
                type='checkbox'
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCheckboxChange(category._id)}
              />
            </td>
            <td className='cell-data-name'>{category.categoryName}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
