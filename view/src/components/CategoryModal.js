import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = ({ showModal, closeModal, modalMode, modalData, handleModalSubmit,setModalData}) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === 'add' ? 'Add Category' : 'Edit Category'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formCategoryName'>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category name'
              value={modalData.categoryName}
              onChange={(e) => setModalData({ ...modalData, categoryName: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
        <Button variant='primary' onClick={handleModalSubmit}>
          {modalMode === 'add' ? 'Add' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
