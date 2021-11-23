export const setData = newTopic => {
  const localData = JSON.parse(localStorage.getItem('Topics'))
  if (localData !== null) {
    const newdata = [...localData, newTopic]
    localStorage.setItem('Topics', JSON.stringify(newdata))
    return newdata
  }
  const newdata1 = []
  newdata1.push(newTopic)
  localStorage.setItem('Topics', JSON.stringify(newdata1))

  return newdata1
}

export const deleteData = record => {
  const localData = JSON.parse(localStorage.getItem('Topics'))
  const updateList = localData.filter(each => each.id !== record.id)
  localStorage.setItem('Topics', JSON.stringify(updateList))
  return updateList
}

export const updateData = (updatedTopic, record) => {
  const localData = JSON.parse(localStorage.getItem('Topics'))
  const filteredList = localData.filter(each => each.id !== record.id)
  const updatedList = [...filteredList, updatedTopic]
  localStorage.setItem('Topics', JSON.stringify(updatedList))

  return updatedList
}

export const setActiveData = (ids, activeStatus) => {
  const localData = JSON.parse(localStorage.getItem('Topics'))
  const updatedList = localData.map(each => {
    if (ids.includes(each.id)) {
      return {...each, isActive: activeStatus}
    }
    return each
  })

  localStorage.setItem('Topics', JSON.stringify(updatedList))

  return updatedList
}

export const setState = () => {
  const data = JSON.parse(localStorage.getItem('Topics'))
  return data
}
