import {
  ADD_TOPIC,
  DELETE_TOPIC,
  SET_ACTIVESTATUS,
  UPDATE_TOPIC,
  INTIAL_STATE,
} from '../actions/actionTypes'

export const initialState = {
  TopicsList: [],
}

export function topicReducer(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case INTIAL_STATE:
      return {...state, TopicsList: action.payload}
    case ADD_TOPIC:
      return {TopicsList: action.payload}
    case DELETE_TOPIC:
      return {...state, TopicsList: action.payload}
    case UPDATE_TOPIC:
      return {...state, TopicsList: action.payload}
    case SET_ACTIVESTATUS:
      return {...state, TopicsList: action.payload}

    default:
      return state
  }
}
