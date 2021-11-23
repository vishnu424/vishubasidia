import {useState, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'

import {v4} from 'uuid'

import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Button,
  Select,
  Input,
  Upload,
  message,
  Radio,
} from 'antd'
import {
  PieChartOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import {bindActionCreators} from 'redux'

import TopicsTable from '../TopicsTable'

import {actionCreators} from '../../redux/index'

import './index.css'
import 'antd/dist/antd.css'

const {Header, Content, Footer, Sider} = Layout

const ControlPannel = () => {
  const [collapsed, setCollasped] = useState(false)
  const [title, setTitle] = useState('')
  const [sortnumber, setSortnumber] = useState('')
  const [subject, setSubject] = useState('Physics')
  const [isActive, setIsactive] = useState('Active')
  const [status, setStatus] = useState('Free')
  const [study, setStudy] = useState('NEET UG')
  const [thumbnail, setThumbnail] = useState('')

  const dispatch = useDispatch()

  const {addTopic, intialState} = bindActionCreators(actionCreators, dispatch)
  const listDetails = useSelector(state => state.TopicsList)

  useEffect(() => {
    if (listDetails.length === 0) {
      intialState()
    }
  })

  const onCollapse = () => {
    setCollasped(!collapsed)
  }

  const {Option} = Select

  const onSubmitTopic = event => {
    event.preventDefault()
    const newTopic = {
      key: v4(),
      id: v4(),
      title,
      sortnumber,
      subject,
      isActive,
      status,
      study,
      thumbnail,
    }
    addTopic(newTopic)
    setTitle('')
    setSortnumber('')
    setIsactive('')
    setStatus('')
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        setThumbnail(info.file.name)
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  // localStorage.removeItem('Topics')

  const getValidation = () => {
    if (title === '' && sortnumber === '') {
      return true
    }
    return false
  }

  const getFormDetails = () => (
    <form className="formContainer" onSubmit={onSubmitTopic}>
      <Col className="gutter-row" span={4}>
        <div style={{padding: '8px 0'}} className="inputContainer">
          <label htmlFor="subject">*Subject</label>
          <Select
            id="subject"
            value={subject}
            style={{width: 110}}
            onChange={value => setSubject(value)}
          >
            <Option key={v4()} value="Physics">
              Physics
            </Option>
            <Option key={v4()} value="Chesmistry">
              Chemistry
            </Option>
          </Select>
        </div>
      </Col>

      <Col className="gutter-row" span={4}>
        <div className="inputContainer">
          <label htmlFor="title">*Title</label>
          <Input
            onChange={event => setTitle(event.target.value)}
            className="inputElement"
            id="title"
            type="text"
            style={{width: 120}}
            placeholder="Title"
            value={title}
          />
        </div>
      </Col>

      <Col className="gutter-row" span={4}>
        <div className="inputContainer">
          <label htmlFor="sortnumber">*Sort Number</label>
          <Input
            onChange={event => setSortnumber(event.target.value)}
            className="inputElement"
            id="sortnumber"
            type="text"
            style={{width: 105}}
            value={sortnumber}
          />
        </div>
      </Col>

      <Col className="gutter-row" span={4}>
        <div className="inputContainer">
          <label htmlFor="thumbnail">*Thumbnail</label>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
      </Col>

      <Col className="gutter-row" span={3}>
        <div className="inputContainer">
          <label htmlFor="active">*Active</label>
          <Radio.Group
            value={isActive}
            id="active"
            onChange={event => setIsactive(event.target.value)}
            defaultValue=""
          >
            <Radio.Button value="Active">Active</Radio.Button>
            <Radio.Button value="Inactive">Inactive</Radio.Button>
          </Radio.Group>
        </div>
      </Col>

      <Col className="gutter-row" span={4}>
        <div className="inputContainer">
          <label htmlFor="status">*Status</label>
          <Radio.Group
            value={status}
            id="status"
            className="statusContainer"
            onChange={event => setStatus(event.target.value)}
            defaultValue=""
          >
            <Radio.Button value="Free">Free</Radio.Button>
            <Radio.Button value="Locked">Locked</Radio.Button>
          </Radio.Group>
        </div>
      </Col>
      <Col className="gutter-row" span={4}>
        <button
          disabled={getValidation()}
          style={{
            backgroundColor: 'black',
            height: '40px',
            color: 'white',
          }}
          type="submit"
        >
          Add Topic
        </button>
      </Col>
    </form>
  )

  return (
    <div>
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <div className="logo">
            <h1>Basidia</h1>
          </div>
          <Menu
            style={{overflowx: 'scroll'}}
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Topics
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{padding: 0}}>
            <div className="header">
              <Select
                value={study}
                onChange={value => setStudy(value)}
                style={{width: 120, margin: 15}}
              >
                <Option key={v4()} value="NEET UG">
                  NEET UG
                </Option>
                <Option key={v4()} value="Class 12">
                  Class 12
                </Option>
              </Select>

              <div className="profile">
                <p style={{marginRight: 80}}>Jackson</p>

                <Button
                  style={{marginLeft: 80, margin: 10, marginBottom: 20}}
                  className="logoutButton"
                  type="button"
                >
                  Logout
                </Button>
              </div>
            </div>
          </Header>
          <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <div className="topicsHeading">
                <Breadcrumb.Item>Topics</Breadcrumb.Item>
                <DeleteOutlined style={{fontSize: '24px', color: '#FF0000'}} />
              </div>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{padding: 24, height: 180, marginBottom: 15}}
            >
              <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {getFormDetails()}
              </Row>
            </div>
            <div
              className="site-layout-background"
              style={{padding: 24, minHeight: 360, marginBottom: 15}}
            >
              <TopicsTable />
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Basidia Learning Pvt Ltd @ 2020
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default ControlPannel
