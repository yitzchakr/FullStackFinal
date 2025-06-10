import React, { useEffect, useState } from 'react';
import Header from '../Header';
import api from '../../../api/axios';
import Requests from './Requests';

const Manager = () => {
  const [managerData, setManagerData] = useState({});

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await api.get('/manager/');
        setManagerData(response.data);
      } catch (error) {
        console.error('Error fetching manager data:', error);
      }
    };

    fetchManagerData();
  
  }, []);

  return (
    <div>
      <Header />
      <Requests requests={managerData.data.unassignedRequests || []} />
    </div>
  );
};

export default Manager;