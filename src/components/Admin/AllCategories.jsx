import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { server } from "../../server";

const Category = ({ categorydata = [], delete_category, update_category, toggle_status }) => {
    const [editId, setEditId] = useState(null);  
    const [editName, setEditName] = useState(""); 

    const handleSave = async (id) => {
        await update_category(id, editName);
        setEditId(null); 
    };

    return (
        <>
            {categorydata.length > 0 ? (
                <div className="w-full mx-8 pt-1 mt-10 bg-white category-table">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorydata.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {editId === item._id ? (
                                            <TextField 
                                                size="small"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                        ) : (
                                            item.categoryname
                                        )}
                                    </td>
                                    <td>
                                        <button 
                                            style={{ 
                                                backgroundColor: item.status === "Active" ? "green" : "red", 
                                                color: "white" 
                                            }} 
                                            onClick={() => toggle_status(item._id, item.status)}
                                        >
                                            {item.status === "Active" ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td>
                                        {editId === item._id ? (
                                            <>
                                                <button onClick={() => handleSave(item._id)}>Save</button>
                                                <button onClick={() => setEditId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => { setEditId(item._id); setEditName(item.categoryname); }}>Edit</button>
                                                <button onClick={() => delete_category(item._id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/admin-Subcategories/${item.categoryname}/${item._id}`} > Add Sub Category </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
};

const AllCategories = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const get_category = async () => {
            try {
                const response = await axios.get(`${server}/category/admin-all-category`);
                if (response.data.success) {
                    setData(response.data.category);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        get_category();
    }, []);

    const save_category = async () => {
        if (!name.trim()) {
            setError(true);
            return;
        }

        try {
            const response = await axios.post(
                `${server}/category/admin-create-category`,
                { categoryname: name, status: "Active" }  
            );

            if (response.data.success) {
                setData((prevData) => [...prevData, response.data.category]);
                setName("");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const delete_category = async (id) => {
        const confirmDelete = window.confirm("Are you sure? This will also delete all subcategories.");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${server}/category/admin-delete-category/${id}`);
            if (response.data.success) {
                setData((prevData) => prevData.filter(category => category._id !== id));
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const update_category = async (id, newName) => {
        if (!newName.trim()) return; 

        try {
            const response = await axios.put(`${server}/category/admin-update-category/${id}`, { categoryname: newName });

            if (response.data.success) {
                setData((prevData) =>
                    prevData.map((category) =>
                        category._id === id ? { ...category, categoryname: newName } : category
                    )
                );
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const toggle_status = async (id, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        try {
            const response = await axios.put(`${server}/category/admin-update-category/${id}`, { status: newStatus });

            if (response.data.success) {
                setData((prevData) =>
                    prevData.map((category) =>
                        category._id === id ? { ...category, status: newStatus } : category
                    )
                );
            }
        } catch (error) {
            console.error("Error updating category status:", error);
        }
    };

    return (
        <>
            <Category categorydata={data} delete_category={delete_category} update_category={update_category} toggle_status={toggle_status} />
            <Stack direction="row" spacing={2}>
                <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-controlled"
                        label="Enter Category Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setError(false);
                        }}
                        error={error}
                        helperText={error ? "Category name cannot be empty" : ""}
                    />
                </Box>
                <Button onClick={save_category} variant="contained" color="success">
                    ADD
                </Button>
            </Stack>
        </>
    );
};

export default AllCategories;
