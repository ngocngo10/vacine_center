import { Table } from 'antd';
import React, { useState } from 'react';
import { Tag } from 'antd';
import Header from '../../components/table/Header';
import useDataTable from '../../components/table/DataTable';
import './index.css';

const AdminVaccinePage = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty'
    },
    {
      title: 'owner',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = 'blue';
            if (tag === 'accessory') {
              color = 'volcano';
            } else if (tag === 'clothing') {
              color = 'geekblue';
            } else if (tag === 'jewellery') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    }
  ];

  const data = {
    totalElements: 8,
    content: [
      {
        key: '1',
        name: 'Personalized Bar Bracelet',
        description: 'This is a metal bracelet',
        qty: 32,
        owner: 'John Brown',
        category: ['jewellery', 'accessory']
      },
      {
        key: '2',
        name: 'Handcraft Boots',
        description: 'Vegan-friendly leather',
        qty: 12,
        owner: 'John Green',
        category: ['clothing', 'living']
      },
      {
        key: '3',
        name: 'Personalized Bar Bracelet',
        description: 'This is a metal bracelet',
        qty: 32,
        owner: 'John Brown',
        category: ['jewellery', 'clothing']
      }
      // ...
    ]
  };

  const { DataTable, hasSelected, currentPage, pageSize, resetPagination } = useDataTable({
    columns: columns,
    dataSource: data,
    updateEntityPath: 'update-product'
  });

  return (
    <div className="vaccines-card">
      <>
        <Header addNewPath="add-product" hasSelected={hasSelected} />
        <DataTable />
      </>
    </div>
  );
};

export default AdminVaccinePage;
