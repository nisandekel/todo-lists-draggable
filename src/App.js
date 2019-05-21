import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import './App.css';

class App extends React.Component {

  state = { listA: { todos: [], status: { total: 0, remains: 0 } }, listB: { todos: [], status: { total: 0, remains: 0 } }, listC: { todos: [], status: { total: 0, remains: 0 } } };
  title = "Dragable  Todo Lists";

  addTodo = (listID, todo) => {
    const list = { ...this.getListByID(listID) };
    const todos = [...list.todos];
    const status = { ...list.status };
    const id = Math.random().toString(32).split(".")[1];
    todos.push({ id, value: todo, isDone: false });
    list.todos = todos;
    status.remains += 1;
    status.total += 1;
    list.status = status;
    this.updateList(list, listID);
  }

  changeTodoStatus = (listID, todoID) => {
    const list = { ...this.getListByID(listID) };
    const todos = [...list.todos];
    const status = { ...list.status };
    const todoIndex = todos.findIndex(todo => todo.id === todoID);
    const currentTodo = { ...todos[todoIndex] };
    currentTodo.isDone = !currentTodo.isDone;
    todos[todoIndex] = currentTodo;
    list.todos = todos;
    status.remains = currentTodo.isDone ? status.remains - 1 : status.remains + 1;
    list.status = status;
    this.updateList(list, listID);
  }

  handleDroppingTodo = (event) => {
    event.preventDefault();
    const todoID = event.dataTransfer.getData("todoID");
    const dragListID = event.dataTransfer.getData("dragListID");
    const dropListID = event.target.id;
    if (dragListID !== dropListID && this.isList(dropListID) && todoID !== "") {
      const dragList = { ...this.getListByID(dragListID) };
      const dropList = { ...this.getListByID(dropListID) };
      const dragListTodos = [...dragList.todos];
      const dropListTodos = [...dropList.todos];
      const dragListStatus = { ...dragList.status };
      const dropListStatus = { ...dropList.status };
      const todoIndex = dragListTodos.findIndex(todo => todo.id === todoID);
      const todo = dragListTodos[todoIndex];
      dragListTodos.splice(todoIndex, 1);
      dragList.todos = dragListTodos;
      dropListTodos.push(todo);
      dropList.todos = dropListTodos;
      console.log(todoID);
      if (todo.isDone === false) {
        dragListStatus.remains -= 1;
        dragListStatus.total -= 1;
        dropListStatus.remains += 1;
        dropListStatus.total += 1;
      }
      else {
        dragListStatus.total -= 1;
        dropListStatus.total += 1;
      }
      dragList.status = dragListStatus;
      dropList.status = dropListStatus;
      this.updateList(dragList, dragListID);
      this.updateList(dropList, dropListID);
    }
  }

  updateList = (newList, listID) => {
    if (listID === "listA") {
      this.setState({ listA: newList });
    }

    else if (listID === "listB") {
      this.setState({ listB: newList });
    }

    else {
      this.setState({ listC: newList });
    }
  }

  getListByID = (id) => {
    if (id === "listA") {
      return this.state.listA;
    }
    else if (id === "listB") {
      return this.state.listB;
    }
    else {
      return this.state.listC;
    }
  }

  isList = (elementID) => {
    if (elementID === "listA" || elementID === "listB" || elementID === "listC") {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="App">
        <Header title={this.title} />
        <div className="all-lists">
          <TodoList id="A" list={this.state.listA.todos} status={this.state.listA.status} addTodo={this.addTodo}
            changeTodoStatus={this.changeTodoStatus}
            handleDroppingTodo={this.handleDroppingTodo}
          />
          <TodoList id="B" list={this.state.listB.todos} status={this.state.listB.status} addTodo={this.addTodo}
            changeTodoStatus={this.changeTodoStatus}
            handleDroppingTodo={this.handleDroppingTodo}
          />
          <TodoList id="C" list={this.state.listC.todos} status={this.state.listC.status} addTodo={this.addTodo}
            changeTodoStatus={this.changeTodoStatus}
            handleDroppingTodo={this.handleDroppingTodo}
          />
        </div>
      </div>
    );
  }

}

export default App;
