import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
};

export default PaginationComponent;
