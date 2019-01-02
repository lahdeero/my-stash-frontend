const filterReducer = (store = '', action) => {
  if (action.type === 'FILTER') {
    console.log('menee2 ' + action.filter)
    const filter = action.filter
    store = filter
  }

  return store
}

export const actionForFilter = (filter) => {
  console.log("menee " + filter)
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer
