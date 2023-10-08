import React from 'react';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'usar estados derivados', completed: true }
// ];

function useLocalStorage(itemName, initialState) {
    const [item, setItem] = React.useState(initialState);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    
    React.useEffect( () => {
        setTimeout( () => {
            try{
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem ;
                if(!localStorageItem){
                    localStorage.setItem(itemName, initialState)
                    parsedItem = initialState;
                } else {
                    parsedItem = JSON.parse(localStorageItem)
                    setItem(parsedItem)
                } 
                setLoading(false)
            } catch(error){
                setLoading(false)
                setError(true)
            }
        }, 2000)
    }, [])

   
    function saveItem (newItem) {
      localStorage.setItem(itemName, JSON.stringify(newItem))
      setItem(newItem);
    }
  
    return {item, saveItem, loading, error }
}

export {useLocalStorage}