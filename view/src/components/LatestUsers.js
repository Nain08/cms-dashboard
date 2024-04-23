import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './LatestUsers.css'
import { Link } from 'react-router-dom';

function LatestUsers() {
    const [data,setData]=useState([]);
    useEffect(()=>{
        async function getUsers(){
            try {
                const response = await axios.get('http://localhost:8080/user/getUsers');
                const sortedUsers = response.data.sort((a, b) => {
                  return new Date(b.dateCreated) - new Date(a.dateCreated);
              });
              
                console.log('Sorted data:', sortedUsers);
                console.log(response.data.map(page => page.dateCreated));
                const latestUsers = sortedUsers.slice(0, 5);
                setData(latestUsers);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getUsers();
    },[])
  return (
    <div>
      <Table striped bordered hover>
      <thead >
        <tr>
          <th className='cell-heading'>Name</th>
          <th className='cell-heading'>Email</th>
          <th className='cell-heading'>Group</th>
        </tr>
      </thead>
        <tbody>
            {data.map((user)=>(
            <tr key={user._id}>
                <td className='cell-data-name'>{user.name}</td>
                <td className='cell-data'>{user.email}</td>
                <td className='cell-data'>{user.group}</td>
            </tr>
            ))}
        </tbody>
    </Table>
    <Link to='/users'>
      <Button variant="light">View all users</Button>
    </Link>
   

    </div>
  )
}

export default LatestUsers;
