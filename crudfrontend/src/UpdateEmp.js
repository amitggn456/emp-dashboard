import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateEmp = () => {
    const [inputUser, setInputUser] = useState({
        employeeName: "",
        age: "",
        exprience: "",
        salary: "",
    });

    const { id } = useParams();
    // data fetching single
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:8080/singleread/${id}`);
        console.log(res);
        setInputUser({
            employeeName: res.data.employeeName,
            age: res.data.age,
            exprience: res.data.exprience,
            salary: res.data.salary,
        });
    };
    useEffect(() => {
        fetchSingleUser();
    }, []);

    const handleChnage = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputUser);
        const res = await axios.put(
            `http://localhost:8080/updateemp/${id}`,
            inputUser
        );
        console.log(res);
        if (res.status === 200) {
            window.location = "/";
        }
        // fetchAllUser();
    };
    return (
        <div className="w-2/3 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
                <h1>Update Employee</h1>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Employee Name</label>
                    <input
                        type="text"
                        name="employeeName"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter EmployeeName"
                        required
                        value={inputUser.employeeName}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Age "
                        required
                        value={inputUser.age}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Exprience</label>
                    <input
                        type="text"
                        name="exprience"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter exprience "
                        required
                        value={inputUser.exprience}
                        onChange={handleChnage}
                    />
                </div>

                <div className="">
                    <label className=" text-sm text-gray-500 ">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter exprience "
                        required
                        value={inputUser.salary}
                        onChange={handleChnage}
                    />
                </div>

                <div className="flex justify-center my-4">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                        Update Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmp;