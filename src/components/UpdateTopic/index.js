import {useState} from 'react'
import {v4} from 'uuid'

import {Select, Input, Radio} from 'antd'

import './index.css'

const {Option} = Select

const UpdateTopic = props => {
  const {record, setTopic} = props
  const {
    id,
    title,
    sortnumber,
    subject,
    isActive,
    study,
    status,
    thumbnail,
  } = record

  const [updateTitle, setUpdateTitle] = useState(title)
  const [updateSortnumber, setUpdateSortnumber] = useState(sortnumber)
  const [updateSubject, setUpdateSubject] = useState(subject)
  const [updateIsactive, setUpdateIsactive] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')
  const [updateStudy, setUpdateStudy] = useState(study)
  const [updateThumbnail, setUpdateThumbnail] = useState(thumbnail)

  const onClickUpdate = event => {
    event.preventDefault()
    //  const localData = JSON.parse(localStorage.getItem('Topics'))

    const updatedTopic = {
      key: v4(),
      id,
      title: updateTitle,
      sortnumber: updateSortnumber,
      subject: updateSubject,
      isActive: updateIsactive,
      study: updateStudy,
      status: updateStatus,
      thumbnail: updateThumbnail,
    }
    setTopic(updatedTopic, record)
  }

  return (
    <form onSubmit={onClickUpdate} className="editFormContainer">
      <div className="UpdateInputContainer">
        <Select
          defaultValue={study}
          onChange={event => setUpdateStudy(event.target.value)}
        >
          <Option key={v4()} value="NEET UG">
            NEET UG
          </Option>
          <Option key={v4()} value="Class 12">
            Class 12
          </Option>
        </Select>
      </div>
      <div className="UpdateInputContainer">
        <label htmlFor="subject">*Subject</label>
        <Select
          defaultValue={updateSubject}
          id="subject"
          onChange={event => setUpdateSubject(event.target.value)}
        >
          <Option key={v4()} value="Physics">
            Physics
          </Option>
          <Option key={v4()} value="Chesmistry">
            Chemistry
          </Option>
        </Select>
      </div>
      <div className="UpdateInputContainer">
        <label htmlFor="title">*Title</label>
        <Input
          style={{width: 120}}
          defaultValue={updateTitle}
          id="title"
          type="text"
          onChange={event => setUpdateTitle(event.target.value)}
        />
      </div>
      <div className="UpdateInputContainer">
        <label htmlFor="sortnumber">*Sort Number</label>
        <Input
          defaultValue={updateSortnumber}
          style={{width: 100}}
          id="sortnumber"
          type="text"
          onChange={event => setUpdateSortnumber(event.target.value)}
        />
      </div>
      <div className="UpdateInputContainer">
        <label htmlFor="active">*Active</label>
        <Radio.Group
          id="active"
          onChange={event => setUpdateIsactive(event.target.value)}
          defaultValue={isActive}
        >
          <Radio.Button value="Active" key={v4()}>
            Active
          </Radio.Button>
          <Radio.Button value="Free" key={v4()} className="listItem">
            Inactive
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className="UpdateInputContainer">
        <label htmlFor="status">*Status</label>
        <Radio.Group
          id="status"
          onChange={event => setUpdateStatus(event.target.value)}
          defaultValue={status}
        >
          <Radio.Button value="Free">Free</Radio.Button>
          <Radio.Button value="Locked">Locked</Radio.Button>
        </Radio.Group>
      </div>

      <div className="UpdateInputContainer">
        <label htmlFor="thumbnail">*Thumbnail</label>
        <Input
          value={thumbnail}
          style={{width: 100}}
          onChange={event => setUpdateThumbnail(event.target.value)}
          id="thumbnail"
          type="file"
        />
      </div>
      <button
        style={{width: 120, margin: 15}}
        className="addTopicButton"
        type="submit"
      >
        Update
      </button>
    </form>
  )
}

export default UpdateTopic
