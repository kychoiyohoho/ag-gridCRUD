import logo from "./logo.svg";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import FormDialog from "./components/dialog";

function App() {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
  };
  const [gridAip, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialData);

  //addUser Button 시 실행
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   // setFormData(initialData);
  };
  const url = `http://localhost:4000/users`;
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob" },
    {
      headerName: "Action",
      field: "id",
      cellRendererFramework: (params) => (
     //
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  //데이터를 불러오다
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const onChange = (e) => {

    const { value, id } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [id]: value });
    console.log("formData", formData);
  };
  const handleDelete = (id) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?", id);
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

 
  const handleFormSubmit = () => {
    if (formData.id) {
      fetch(url+`/${formData.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
       
        });
    }
    else{
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
       
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h3>CRUD Operation With Json-server on ag-grid</h3>
      <div className="ag-theme-alpine" style={{ height: "400px" }}>
        <Grid align="right">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add User
          </Button>
        </Grid>
        {/* 데이터가 보여지는 부분 rowData 데이터, columnDefs header ,defaultColDef 환결설정 모든 데이터가 받는 */}
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <FormDialog
        open={open}
        onChange={onChange}
        handleClose={handleClose}
        data={formData}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
