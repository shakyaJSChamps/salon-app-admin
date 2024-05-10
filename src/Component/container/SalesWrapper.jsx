import React from 'react';
import { Outlet } from 'react-router-dom';
import SalesDetails from '../salesManagement/salesEditDetails/salesDetails/SaleDetail';

const SalesWrapper = () => {
  return (
    <Outlet />
    // <SalesDetails/>
  )
};

export default SalesWrapper;