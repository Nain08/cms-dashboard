import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash,faFolder } from '@fortawesome/free-solid-svg-icons';
import { Button, } from 'react-bootstrap';
import CategoryTable from './CategoryTable'
import PaginationComponent from './PaginationComponent';

import './Category.css'
import CategoryModal from './CategoryModal';
const CategoryComponent = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const initialSortBy = 'categoryName';
  const [sortBy, setSortBy] = useState({ field: initialSortBy, order: 'asc' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalData, setModalData] = useState({
    categoryName: '',
  });
 
  useEffect(() => {
    async function fetchData() {
      try {
        
        const categoriesResponse = await axios.get('http://localhost:8080/category/getCategories');
        setData(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    }
    fetchData();
  }, [showModal]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const headers = [
    { label: 'Category Title', field: 'categoryName' }
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

  const handleHeaderCheckboxChange = () => {
    if (selectedCategories.length === sortedData.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(sortedData.map((page) => page._id));
    }
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddClick = () => {
    setModalMode('add');
    setModalData({
      categoryName: '',
    });
    setShowModal(true);
  };

  const handleEditClick = () => {
    if (selectedCategories.length === 1) {
      const selectedCategory = data.find((category) => category._id === selectedCategories[0]);
      setModalMode('edit');
      setModalData({
        categoryName: selectedCategory.categoryName,
        
      });
      setShowModal(true);
      console.log(selectedCategory.categoryName);
    } else {
      alert('Please select exactly one category to edit.');
    }
  };

  const handleDeleteClick = async () => {
    if (selectedCategories.length > 0) {
      try {
        await axios.post('http://localhost:8080/category/deleteCategories', {
          categoryIds: selectedCategories,
        });
        const response = await axios.get('http://localhost:8080/category/getCategories');
        setData(response.data);
        setSelectedCategories([]);
      } catch (error) {
        console.error('Error deleting categories:', error);
      }
    } else {
      alert('Please select at least one category to delete.');
    }
  };

  const handleModalSubmit = async () => {
    if (!modalData.categoryName) {
      alert('Please enter category name.');
      return;
    }

    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/category/addCategory', modalData);
      } else if (modalMode === 'edit') {
        await axios.post(`http://localhost:8080/category/updateCategory/${selectedCategories[0]}`, {
          categoryName: modalData.categoryName
        });

        const updatedData = [...data];
        const editedCategoryIndex = updatedData.findIndex((category) => category._id === selectedCategories[0]);

        if (editedCategoryIndex !== -1) {
          updatedData[editedCategoryIndex] = {
            ...updatedData[editedCategoryIndex],
            
            categoryName: modalData.categoryName,
          };
        }

        setData(updatedData);
      }

      setShowModal(false);
    } catch (error) {
      console.error('Error adding/editing category:', error);

      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div className='category-container'>
      <div className='category-heading'>
        <FontAwesomeIcon icon={faFolder} size='xl' className='heading-icon' />
        <h2 className='heading-text'>Categories</h2>
        <div className='heading-buttons' style={{ float: 'right', marginLeft: '420px' }}>
          <Button variant='light' onClick={handleAddClick} style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faPlus} /> New
          </Button>
          <Button variant='light' onClick={handleEditClick} style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
          <Button variant='light' onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
        </div>
      </div>
      <div className='location'>
        <span style={{ color: '#2fa4e7' }}>Dashboard / </span>
        <span>Categories</span>
      </div>
      <CategoryTable
        headers={headers}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortedData={sortedData.slice(indexOfFirstRow, indexOfLastRow)}
        selectedCategories={selectedCategories}
        handleCheckboxChange={handleCheckboxChange}
        handleHeaderCheckboxChange={handleHeaderCheckboxChange}
      />
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <CategoryModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        modalMode={modalMode}
        modalData={modalData}
        handleModalSubmit={handleModalSubmit}
        setModalData={setModalData}
      />
    </div>
  );
}

export default CategoryComponent;
