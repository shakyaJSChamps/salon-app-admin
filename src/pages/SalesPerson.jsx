import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sales from "../Component/Sales";
import Profile from "../assets/image/dummy-profile.jpg";
import SalesDetails from "../Component/salesManagement/salesEditDetails/salesDetails/SaleDetail";

const SalesPerson = () => {
  const [data, setData] = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState(null);

  useEffect(() => {
    // Generate dynamic fake data
    const generateFakeData = () => {
      const fakeData = [];
      for (let i = 1; i <= 10; i++) {
        fakeData.push({
          id: i,
          name: `Person ${i}`,
          firstName: `First ${i}`,
          lastName: `Last ${i}`,
          email: `person${i}@example.com`,
          active: i % 2 === 0, // Alternate active and inactive
          phoneNumber: `12345678${i}`,
          address: `Address ${i}`,
          createdAt: new Date().toISOString(),
          profileImageUrl: "https://example.com/profile.jpg",
          salesPersonId: randomSalesPersonId(), // Generate random Sales Person ID
        });
      }
      return fakeData;
    };

    // Function to generate random Sales Person ID
    const randomSalesPersonId = () => {
      return Math.floor(Math.random() * 10000000000).toString(); // Generate a 10-digit random number
    };

    // Set dynamic fake data
    setData(generateFakeData());
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="d-flex ">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={Profile}
              alt="Profile"
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <div
              className="ps-2"
              style={{ fontWeight: "500" }}
            >{`${row.firstName} ${row.lastName}`}</div>
            <div className="ps-2" style={{ fontSize: "13px" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Mobile Num",
      cell: (row) => <div>{row.phoneNumber}</div>,
      sortable: true,
    },
    {
      name: "Joined On",
      cell: (row) => <div>{new Date(row.createdAt).toLocaleDateString()}</div>,
      sortable: true,
    },
    {
      name: "Sales Person Id",
      selector: (row) => row.salesPersonId,
      sortable: true,
    },
    {
      name: "Total Sales",
      cell: () => <div>1100</div>,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        color: "#6F6B7D",
        fontFamily: "Poppins",
        cursor: "pointer",
      },
    },
  };


  const handleRowClick = (row) => {
    setSelectedSalesPerson(row);
  };

  

  return (
    <>
      <h6>Sales Person</h6>
      <DataTable
        title={<Sales />}
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        onRowClicked={handleRowClick}
        customStyles={customStyles}
      />
      {selectedSalesPerson && (
        <>
          <pre>{JSON.stringify(selectedSalesPerson, null, 2)}</pre>
          <SalesDetails
            salesPersonName={selectedSalesPerson.name}
            email={selectedSalesPerson.email}
            phoneNumber={selectedSalesPerson.phoneNumber}
            address={selectedSalesPerson.address}
            gstNumber={selectedSalesPerson.gstNumber}
            pincode={selectedSalesPerson.pincode}
            serviceType={selectedSalesPerson.serviceType}
            state={selectedSalesPerson.state}
          />
        </>
      )}
    </>
  );
};

export default SalesPerson;

