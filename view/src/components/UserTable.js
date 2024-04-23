import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const UserTable = ({ headers, handleSort, sortOrder, sortedData}) => {
  return (
    <Table striped bordered hover>
      <thead>
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
      </thead>
      <tbody>
        {sortedData.map((user) => (
          <tr key={user._id}>
           
            <td className='cell-data-name'>{user.name}</td>
            <td className='cell-data'>{user.email}</td>
            <td className='cell-data'>{user.group}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
