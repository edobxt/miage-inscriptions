import { Space, Table, Tag } from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";

export default function StudentsPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/students")
            .then(response => setData(response.data))
    }, [])

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            sorter: (a, b) => a.full_name - b.full_name,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Birth Date',
            dataIndex: 'birth_date',
            key: 'birth_date'
        },
        {
            title: 'Birth Location',
            dataIndex: 'birth_location',
            key: 'birth_location'
        },
        {
            title: 'Original Degree',
            dataIndex: 'original_degree',
            key: 'original_degree'
        },
        {
            title: 'Date last degree',
            dataIndex: 'last_degree_date',
            key: 'last_degree_date'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
        },

        /*filters: [
            {
                text: <span>London</span>,
                value: 'London',
            },
            {
                text: <span>New York</span>,
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: false,
        width: '40%',
        */
    ];

    return (
        <div>
            <h1>Liste des étudiants</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}