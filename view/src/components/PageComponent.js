import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button} from 'react-bootstrap';
import PageTable from './PageTable';
import PaginationComponent from './PaginationComponent';
import PageModal from './PageModal';
import './Page.css'
const PageComponent = () => {
  const [data, setData] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const initialSortBy = 'pageName';
  const [sortBy, setSortBy] = useState({ field: initialSortBy, order: 'asc' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalData, setModalData] = useState({
    pageName: '',
    categoryName: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/page/getPages');
        setData(response.data);
        const categoriesResponse = await axios.get('http://localhost:8080/category/getCategories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    }
    fetchData();
  }, [showModal]);

  const handleCheckboxChange = (pageId) => {
    setSelectedPages((prevSelected) => {
      if (prevSelected.includes(pageId)) {
        return prevSelected.filter((id) => id !== pageId);
      } else {
        return [...prevSelected, pageId];
      }
    });
  };
  const handleHeaderCheckboxChange = () => {
    if (selectedPages.length === sortedData.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(sortedData.map((page) => page._id));
    }
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const headers = [
    { label: 'Page Title', field: 'pageName' },
    { label: 'Category', field: 'categoryName' },
    { label: 'Author', field: 'author' },
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

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddClick = () => {
    setModalMode('add');
    setModalData({
      pageName: '',
      categoryName: '',
    });
    setShowModal(true);
  };

  const handleEditClick = () => {
    if (selectedPages.length === 1) {
      const selectedPage = data.find((page) => page._id === selectedPages[0]);
      setModalMode('edit');
      setModalData({
        pageName: selectedPage.pageName,
        categoryName: selectedPage.categoryName,
      });
      setShowModal(true);
    } else {
      alert('Please select exactly one page to edit.');
    }
  };

  const handleDeleteClick = async () => {
    if (selectedPages.length > 0) {
      try {
        const username = localStorage.getItem("userName");
  
        if (!username) {
          alert('User not authenticated');
          return;
        }
  
       await axios.post('http://localhost:8080/page/deletePages', {
          pageIds: selectedPages,
          username: username,
        });
        
        
        const response = await axios.get('http://localhost:8080/page/getPages');
        setData(response.data);
        setSelectedPages([]);
       
      } catch (error) {
        console.error('Error deleting pages:', error);
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert('An error occurred while processing your request.');
        }
      }
    } else {
      alert('Please select at least one page to delete.');
    }
  };
  

  const handleModalSubmit = async () => {
    if (!modalData.pageName || !modalData.categoryName) {
      alert('Please enter page name and select a category.');
      return;
    }
  
    try {
      const username = localStorage.getItem("userName");
  
      if (!username) {
        alert('User not authenticated');
        return;
      }
  
      const requestData = {
        ...modalData,
        username: username,
      };
  
      if (modalMode === 'add') {
        await axios.post('http://localhost:8080/page/addPage', requestData);
      } else if (modalMode === 'edit') {
        await axios.post(`http://localhost:8080/page/updatePage/${selectedPages[0]}`, {
          updatedData: requestData,
        });
  
        const updatedData = [...data];
        const editedPageIndex = updatedData.findIndex((page) => page._id === selectedPages[0]);
  
        if (editedPageIndex !== -1) {
          updatedData[editedPageIndex] = {
            ...updatedData[editedPageIndex],
            pageName: modalData.pageName,
            categoryName: modalData.categoryName,
          };
        }
  
        setData(updatedData);
      }
  
      setShowModal(false);
    } catch (error) {
      console.error('Error adding/editing page:', error);
  
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert('An error occurred while processing your request.');
      }
    }
  };
  

  return (
    <div className='page-container'>
      <div className='page-heading'>
        <FontAwesomeIcon icon={faFile} size='xl' className='heading-icon' />
        <h2 className='heading-text'>Pages</h2>
        <div className='heading-buttons' style={{ float: 'right', marginLeft: '500px' }}>
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
        <span>Pages</span>
      </div>
      <PageTable
        headers={headers}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortedData={sortedData.slice(indexOfFirstRow, indexOfLastRow)}
        selectedPages={selectedPages}
        handleCheckboxChange={handleCheckboxChange}
        handleHeaderCheckboxChange={handleHeaderCheckboxChange}
      />
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <PageModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        modalMode={modalMode}
        modalData={modalData}
        handleModalSubmit={handleModalSubmit}
        setModalData={setModalData}
        categories={categories}
      />
    </div>
  );
}

export default PageComponent;
