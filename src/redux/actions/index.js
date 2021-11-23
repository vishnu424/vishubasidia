import {
  setData,
  updateData,
  deleteData,
  setActiveData,
  setState,
} from '../topicServices'

import {
  ADD_TOPIC,
  UPDATE_TOPIC,
  DELETE_TOPIC,
  SET_ACTIVESTATUS,
} from './actionTypes'

export const addTopic = newTopic => dispatch => {
  const result = setData(newTopic)
  console.log(result, 'ok')
  dispatch({
    type: ADD_TOPIC,
    payload: result,
  })
}

export const updateTopic = (updatedTopic, record) => dispatch => {
  const result = updateData(updatedTopic, record)
  dispatch({
    type: UPDATE_TOPIC,
    payload: result,
  })
}

export const deleteTopic = record => dispatch => {
  const data = deleteData(record)
  dispatch({
    type: DELETE_TOPIC,
    payload: data,
  })
}

export const setActiveStatus = (ids, activeStatus) => dispatch => {
  const activeData = setActiveData(ids, activeStatus)
  dispatch({
    type: SET_ACTIVESTATUS,
    payload: activeData,
  })
}

export const intialState = () => dispatch => {
  const result = setState()

  dispatch({
    type: 'INTIAL_STATE',
    payload: result,
  })
}
