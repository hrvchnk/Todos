//../context/ToDoContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext();

const initialState = {
	addTodo: [],
	showCompleted: false,
	groups: [],
};

const ActionType = {
	ADD_GROUP: 'ADD_GROUP',
	EDIT_GROUP: 'EDIT_GROUP',
	DELETE_GROUP: 'DELETE_GROUP',
	ADD_TODO: 'ADD_TODO',
	DELETE_TODO: 'DELETE_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	TOGGLE_SHOW_COMPLETED: 'TOGGLE_SHOW_COMPLETED',
	CLEAR_COMPLETED: 'CLEAR_COMPLETED',
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case ActionType.ADD_GROUP:
			return {
				...state,
				groups: [
					...state.groups,
					{
						id: `${state.groups.length + 1}`,
						name: action.payload.name,
						color: action.payload.color,
						tag: action.payload.tag,
						tasks: [],
					},
				],
			};
		case ActionType.EDIT_GROUP:
			return {
				...state,
				groups: state.groups.map(group =>
					group.id === action.payload.id
						? {
								...group,
								name: action.payload.name,
								color: action.payload.color,
						  }
						: group
				),
			};
		case ActionType.DELETE_GROUP:
			return {
				...state,
				groups: state.groups.filter(group => group.id !== action.payload.id),
			};
		case ActionType.ADD_TODO:
			return {
				...state,
				groups: state.groups.map(group =>
					group.id === action.payload.groupId
						? {
								...group,
								tasks: [
									...group.tasks,
									{
										id: Date.now(),
										text: action.payload.text,
										completed: false,
									},
								],
						  }
						: group
				),
			};
		case ActionType.DELETE_TODO:
			return {
				...state,
				addTodo: state.addTodo.filter(todo => todo.id !== action.payload),
			};
		case ActionType.TOGGLE_TODO:
			return {
				...state,
				addTodo: state.addTodo.map(todo =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo
				),
			};
		case ActionType.TOGGLE_SHOW_COMPLETED:
			return {
				...state,
				showCompleted: !state.showCompleted,
			};
		case ActionType.CLEAR_COMPLETED:
			return {
				...state,
				addTodo: state.addTodo.filter(todo => !todo.completed),
			};
		default:
			return state;
	}
};

export const TodoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addGroup = (name, color, tag) => {
		dispatch({ type: ActionType.ADD_GROUP, payload: { name, color, tag } });
	};

	const editGroup = (id, name, color) => {
		dispatch({ type: ActionType.EDIT_GROUP, payload: { id, name, color } });
	};

	const deleteGroup = id => {
		dispatch({ type: ActionType.DELETE_GROUP, payload: { id } });
	};

	const addTodo = (text, groupId) => {
		dispatch({ type: ActionType.ADD_TODO, payload: { text, groupId } });
	};

	const deleteTodo = id => {
		dispatch({ type: ActionType.DELETE_TODO, payload: id });
	};

	const toggleTodo = id => {
		dispatch({ type: ActionType.TOGGLE_TODO, payload: id });
	};

	const toggleShowCompleted = () => {
		dispatch({ type: ActionType.TOGGLE_SHOW_COMPLETED });
	};

	const clearCompleted = () => {
		dispatch({ type: ActionType.CLEAR_COMPLETED });
	};

	return (
		<TodoContext.Provider
			value={{
				addTodo: state.addTodo,
				showCompleted: state.showCompleted,
				groups: state.groups,
				addGroup,
				editGroup,
				deleteGroup,
				addTodo,
				deleteTodo,
				toggleTodo,
				toggleShowCompleted,
				clearCompleted,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => useContext(TodoContext);
