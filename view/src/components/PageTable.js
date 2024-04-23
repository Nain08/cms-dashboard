import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const PageTable = ({ headers, handleSort, sortOrder, sortedData,selectedPages, handleCheckboxChange,handleHeaderCheckboxChange }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <input type='checkbox'
            checked={selectedPages.length === sortedData.length}
            onChange={handleHeaderCheckboxChange} />
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
        {sortedData.map((page) => (
          <tr key={page._id}>
            <td>
              <input
                type='checkbox'
                checked={selectedPages.includes(page._id)}
                onChange={() => handleCheckboxChange(page._id)}
              />
            </td>
            <td className='cell-data-name'>{page.pageName}</td>
            <td className='cell-data'>{page.categoryName}</td>
            <td className='cell-data'>{page.author}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PageTable;
