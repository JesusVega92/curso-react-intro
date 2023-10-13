import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import { TodoHeader } from '../TodoHeader';
import { useTodos } from './useTodos';

function App() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    completedTodos,
    totalTodos,
    searchValue,
    setSearchValue,
    addTodo
  } = useTodos()
  return (
    <>
    <TodoHeader>
      <TodoCounter 
       completedTodos= {completedTodos}
       totalTodos={totalTodos} />
      <TodoSearch
         searchValue = {searchValue}
         setSearchValue = {setSearchValue} />
    </TodoHeader>
  
    <TodoList>
      {loading && (
        <>
          <TodosLoading />
          <TodosLoading />
          <TodosLoading />
        </>
      )}
      {error && <TodosError/>}
      {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

      {searchedTodos.map(todo => (
        <TodoItem
          key={todo.text}
          text={todo.text}
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)}
          onDelete={() => deleteTodo(todo.text)}
        />
      ))}
    </TodoList>
    
    <CreateTodoButton
      setOpenModal={setOpenModal}
    />

    {openModal && (
      <Modal>
        <TodoForm
         addTodo = {addTodo}
         setOpenModal = {setOpenModal} />
      </Modal>
    )}
  </>
  );
}

export default App;
