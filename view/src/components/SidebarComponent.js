import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faFile, faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

function SidebarComponent() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className='sidebar' >
      <ListGroup as="ul">
        <ListGroup.Item as="li" className={isActive('/') || isActive('/dashboard') ? 'active' : ''}>
          <FontAwesomeIcon icon={faGaugeHigh} className='li-icon'/>
          <Link to="/dashboard">Dashboard</Link>
        </ListGroup.Item>
        <ListGroup.Item as="li" className={isActive('/pages') ? 'active' : ''}>
          <FontAwesomeIcon icon={faFile} className='li-icon'/>
          <Link to="/pages">Pages</Link>
        </ListGroup.Item>
        <ListGroup.Item as="li" className={isActive('/categories') ? 'active' : ''}>
          <FontAwesomeIcon icon={faFolderOpen} className='li-icon'/>
          <Link to="/categories">Categories</Link>
        </ListGroup.Item>
        <ListGroup.Item as="li" className={isActive('/users') ? 'active' : ''}>
          <FontAwesomeIcon icon={faUser} className='li-icon'/>
          <Link to="/users">User Accounts</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default SidebarComponent;
