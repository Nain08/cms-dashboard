import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PageModal = ({ showModal, closeModal, modalMode, modalData, handleModalSubmit,setModalData,categories }) => {
  
console.log({modalMode});
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === 'add' ? 'Add Page' : 'Edit Page'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formPageName'>
            <Form.Label>Page Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter page name'
              value={modalData.pageName}
              onChange={(e) => setModalData({ ...modalData, pageName: e.target.value })}
            />
          </Form.Group>
          
          {modalMode === 'add' && (<Form.Group controlId='formCategory'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              value={modalData.categoryName}
              onChange={(e) => setModalData({ ...modalData, categoryName: e.target.value })}
            >
              <option value=''>Select category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group> )}

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

export default PageModal;
