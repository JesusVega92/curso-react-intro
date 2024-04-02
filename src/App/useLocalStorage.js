import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({initialValue}))
  const {
    error, 
    loading, 
    item
  } = state

  //action creators
  const onError = (error) => dispatch({ type: actionTypes.error, payload: error})
  const onSuccess = () => dispatch({ type: actionTypes.success})
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item})

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        onSave(parsedItem)
        onSuccess()

      } catch(error) {
        onError(error)
      }
    }, 3000);
  }, []);
  
  const saveItem = (newItem) => {
    try {

      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem)

    } catch(error) {
      onError(error)
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS', 
  save: 'SAVE'
}

const initialState = ({initialValue}) => ({
  error: false, 
  loading: true, 
  item: initialValue
})

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state, 
    error: true
  }, 
  [actionTypes.success]: {
    ...state, 
    loading: false
  }, 
  [actionTypes.save]: {
    ...state, 
    item: payload
  }
})

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

export { useLocalStorage };
