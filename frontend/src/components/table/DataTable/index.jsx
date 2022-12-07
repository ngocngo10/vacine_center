import React, { useState } from 'react';
import { Table } from 'antd';
import useActionMenu from '../ActionMenu';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function useDataTable({ columns, dataSource, updateEntityPath, handleDelete, handleChangePage }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { actionColumnView } = useActionMenu({
    selectedRow,
    updateEntityPath,
    handleDelete
  });

  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: (select) => {
      setSelectedRowKeys(select);
    }
  };

  dataSource.content?.forEach((item) => (item.index = item.index + currentPage * 10));

  const updatedColumns = [
    ...columns,
    {
      title: 'Xóa/Cập nhật',
      key: 'action',
      render: () => actionColumnView
    }
  ];

  const resetPagination = () => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };

  const handleTableChange = (pagination) => {
    handleChangePage(pagination.current);
    setCurrentPage(pagination.current - 1);
  };

  const DataTable = () => (
    <Table
      bordered
      rowKey={(record) => record.key}
      rowSelection={rowSelection}
      columns={updatedColumns}
      dataSource={dataSource.content}
      onRow={(record) => {
        return {
          onClick: () => {
            setSelectedRow(record);
          }
        };
      }}
      onChange={handleTableChange}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        current: currentPage + 1,
        total: dataSource.totalElements,
        showTotal: (total, range) => {
          return `${range[0]}-${range[1]} of ${total} items`;
        }
      }}
    />
  );

  return {
    DataTable,
    hasSelected,
    selectedRow,
    selectedRowKeys,
    currentPage,
    pageSize,
    resetPagination
  };
}

export default useDataTable;
