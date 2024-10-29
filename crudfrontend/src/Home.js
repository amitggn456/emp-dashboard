import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './App.css'
const Home = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    // const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate()

    const [inputUser, setInputUser] = useState({
        employeeName: "",
        age: "",
        exprience: "",
        salary: "",
    });





    // data fetching all
    const [userData, setUserData] = useState([]);
    const fetchAllUser = async () => {
        const res = await axios.get("http://localhost:8080/readallemployee");
        console.log(res);
        setUserData(res.data);
        setEmployeeCount(res.data.length);

    };
    useEffect(() => {
        fetchAllUser();
    }, []);

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:8080/deleteemp/${id}`);
        if (res.status === 200) {
            fetchAllUser();
        }
    };

    const addbtn = () => {
        navigate('/addemployee')
    }


    //serch functionality

    // const filteredData = userData.filter((item) =>
    //   item.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    // );


    return (
        <div className="w-3/4 mx-auto mt-5 container">
            <h1 style={{ fontSize: "40px", fontWeight: "bold", position: "relative", top: "-50px" }}>Employee Details</h1>
            <div className="text-center mt-4 text-gray-600 countbtn"> {employeeCount}</div>
            {/* creating form */}



            {/* <input
        type="text"
        placeholder="Search by employee name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
      /> */}





            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SN.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exprience
                            </th>
                            <th scope="col" className="px-6 py-3">
                                salary
                            </th>
                            <th scope="col" className="px-3 py-0 readhead">
                                Read
                            </th>
                            <th scope="col" className="px-6 py-3 edithead">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3 deletethead">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((item, i) => (
                            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {i + 1}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item?.employeeName}
                                </th>
                                <td className="px-6 py-4"> {item?.age}</td>
                                <td className="px-6 py-4"> {item?.exprience}</td>
                                <td className="px-6 py-4"> {item?.salary}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-x-4 justify-center">
                                        <NavLink
                                            to={`/singleemp/${item._id}`}
                                            className=" readbtn font-medium text-green-600 dark:text-blue-500 hover:underline"
                                        >
                                            Read
                                        </NavLink>
                                        <NavLink
                                            to={`/updateemp/${item._id}`}
                                            className="font-medium text-yellow-400 dark:text-blue-500 hover:underline editbtn"
                                        >
                                            Edit
                                        </NavLink>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="font-medium text-red-500  hover:underline deletebtn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={addbtn} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Add Employee
                </button>
            </div>



        </div>
    );
};

export default Home;

