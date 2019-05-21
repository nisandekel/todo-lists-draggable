import React from 'react';
import {InputGroup ,FormControl,Button} from 'react-bootstrap';
import './TodoList.css';

const TodoList = (props) => {

    const inputRef = React.createRef();

    const list = props.list.map(todo => {
        const classes = todo.isDone ? "finished" : "unfinished";
        return (<li id={todo.id} key={todo.id} className={classes} onDragStart={handleDraggingTodo}
            onClick={() => props.changeTodoStatus("list" + props.id, todo.id)} draggable> 
            {todo.value}
        </li >);
    });

    function addTodo() {
        const newTodo = inputRef.current.value;
        if (newTodo !== "") {
            props.addTodo("list" + props.id, newTodo);
        }
    }

    function handleDraggingTodo(event) {
        event.dataTransfer.setData("todoID", event.target.id);
        event.dataTransfer.setData("dragListID", "list" + props.id);
    }

    return (
        <div className="todo-list-component" id={"list" + props.id} onDrop={props.handleDroppingTodo} onDragOver={event => event.preventDefault()}>
            <h3 className="list-title">List {props.id}</h3>
            <FormControl className="add-todo-input" ref={inputRef} type="text" placeholder="todo.." />
            <Button className="add-btn" variant="outline-info" onClick={addTodo}>Add</Button>
            <div className="status">{props.status.remains} out of {props.status.total} left</div>
            <ul className="todo-list">
                {list}
            </ul>
        </div>
    );
}

export default TodoList;