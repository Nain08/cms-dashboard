import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import LatestPages from './LatestPages';
import LatestUsers from './LatestUsers';
function DashboardComponent() {
  return (
    <div className='dashboard'>
      <div className='dashboard-heading'>
        <FontAwesomeIcon icon={faGaugeHigh} size='2xl' className='heading-icon' />
        <h1 className='heading-text'>Dashboard</h1>  
      </div>
      
      <div className='dashboard-content'>
        <h2 className='dashboard-heading'> Latest Pages</h2>
        <LatestPages />
      </div>
      <div className='dashboard-content'>
        <h2 className='dashboard-heading'> Latest Users</h2>
        <LatestUsers />
      </div>
    </div>
  )
}

export default DashboardComponent
