import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {bindActionCreators} from 'redux'

import {v4} from 'uuid'

import {Modal, Button, Table, Input, Space, Select} from 'antd'

import {SearchOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

import {actionCreators} from '../../redux/index'

import UpdateTopic from '../UpdateTopic'

import store from '../../redux/store'

import './index.css'

const {Option} = Select

const TopicsTable = () => {
  const [checkBoxCount, setCheckBoxCount] = useState([])
  const [isCheckBox, setisCheckBox] = useState(false)
  const [activeStatus, SetActive] = useState('Active')

  // const listDetails = useSelector(state => state.TopicsList)

  const listDetails = store.getState().TopicsList

  console.log(listDetails, 'list')

  const dispatch = useDispatch()

  const {deleteTopic, updateTopic, setActiveStatus} = bindActionCreators(
    actionCreators,
    dispatch,
  )

  const handleReset = clearFilters => {
    clearFilters()
  }

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
  }

  let searchInput = ''

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({closeDropdown: false})
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: prop => {
      if (prop) {
        setTimeout(() => searchInput.select(), 100)
      }
    },
    render: text => text,
  })

  const showDeleteConfirm = record => {
    const {confirm} = Modal
    confirm({
      title: 'Are you sure want to delete this Topic?',
      icon: <ExclamationCircleOutlined />,
      content: record.title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const updateList = listDetails.filter(each => each.id !== record.id)
        localStorage.setItem('Topics', JSON.stringify(updateList))

        deleteTopic(updateList)
      },
      onCancel() {},
    })
  }

  const onSucessEdit = data => {
    updateTopic(data)
  }

  const showEdit = record => {
    const {confirm} = Modal
    confirm({
      title: 'Edit Topic',
      icon: <ExclamationCircleOutlined />,
      content: (
        <UpdateTopic
          setTopic={onSucessEdit}
          record={record}
          topicList={listDetails}
        />
      ),
      okText: 'ok',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {},
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const columns = [
    {
      title: 'Sort By',
      dataIndex: 'sortnumber',
      key: v4(),
      sorter: {
        compare: (a, b) => a.sortnumber - b.sortnumber,
        multiple: 3,
      },
      width: '10%',
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: v4(),
      width: '12%',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('title'),
    },

    {
      title: 'Subject',
      dataIndex: 'subject',
      key: v4(),
      filters: [
        {
          text: 'Chesmistry',
          value: 'Chesmistry',
        },
        {
          text: 'Physics',
          value: 'Physics',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.subject.startsWith(value),
      width: '12%',
    },

    {
      title: 'Class',
      dataIndex: 'study',
      key: v4(),
      filters: [
        {
          text: 'NEET UG',
          value: 'NEET UG',
        },
        {
          text: 'Class 12',
          value: 'Class 12',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.study.startsWith(value),
      width: '12%',
    },

    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: v4(),
    },

    {
      title: 'Isactive',
      dataIndex: 'isActive',
      key: v4(),
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Inactive',
          value: 'Inactive',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.isActive.startsWith(value),
      width: '13%',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: v4(),
      filters: [
        {
          text: 'Free',
          value: 'Free',
        },
        {
          text: 'Locked',
          value: 'Locked',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
      width: '13%',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: v4(),
      width: '16%',
      render: (_, record) => (
        <div>
          <Space size="middle">
            <Button
              style={{color: 'blue'}}
              onClick={() => showEdit(record)}
              type="dashed"
            >
              Edit
            </Button>
          </Space>

          <Space size="middle">
            <Button
              style={{color: 'red'}}
              onClick={() => showDeleteConfirm(record)}
              type="dashed"
            >
              Delete
            </Button>
          </Space>
        </div>
      ),
    },
  ]

  const rowSelection = {
    onSelect: (record, selectedRowKeys, selected) => {
      setCheckBoxCount(selected)
      setisCheckBox(true)
    },
    onSelectAll: (selected, selectedRowKeys) => {
      setCheckBoxCount(selectedRowKeys)
      setisCheckBox(true)
    },
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  const onClickGoButton = () => {
    const ids = checkBoxCount.map(each => each.id)

    const updatedList = listDetails.map(each => {
      if (ids.includes(each.id)) {
        return {...each, isActive: activeStatus}
      }
      return each
    })

    localStorage.setItem('Topics', JSON.stringify(updatedList))

    setActiveStatus(updatedList)
    SetActive('Active')
  }

  return (
    <div>
      {isCheckBox && (
        <div style={{margin: 15}}>
          <h1 style={{textAlign: 'center'}}>Change Active Status of Topics</h1>
          <Space>
            <Select
              value={activeStatus}
              style={{
                width: 500,
              }}
              onChange={event => SetActive(event.target.value)}
            >
              <Option key={v4()} value="Active">
                Active
              </Option>
              <Option key={v4()} value="InActive">
                InActive
              </Option>
            </Select>
            <Button
              type="primary"
              style={{
                width: 500,
                marginLeft: '25px',
                backgroundColor: 'black',
              }}
              onClick={onClickGoButton}
            >
              GO
            </Button>
          </Space>
        </div>
      )}
      <Table
        rowSelection={{...rowSelection}}
        columns={columns}
        onChange={onChange}
        dataSource={listDetails}
      />
    </div>
  )
}

export default TopicsTable
