import React, { createContext, useContext, useReducer } from 'react';
import uuid from 'react-native-uuid';

const TodoContext = createContext();

const initialState = {
	tasks: {
		task1: {
			id: 'task1',
			text: 'Task 1',
			isCompleted: false,
			groupIds: ['gr2', 'ALL'],
			tags: ['Group 2'],
		},
		task2: {
			id: 'task2',
			text: 'Task 2',
			isCompleted: false,
			groupIds: ['gr2', 'ALL'],
			tags: ['Group 2'],
		},
		task3: {
			id: 'task3',
			text: 'Task 3',
			isCompleted: false,
			groupIds: ['gr3', 'ALL'],
			tags: ['Group 3'],
		},
		task4: {
			id: 'task4',
			text: 'Task 4',
			isCompleted: false,
			groupIds: ['gr3', 'ALL'],
			tags: ['Group 3'],
		},
		task5: {
			id: 'task5',
			text: 'Task 5',
			isCompleted: false,
			groupIds: ['ALL'],
			tags: [''],
		},
		task6: {
			id: 'task6',
			text: 'Task 6',
			isCompleted: false,
			groupIds: ['ALL'],
			tags: [''],
		},
	},
	groups: {
		ALL: {
			id: 'ALL',
			test: 'test',
			name: 'All Tasks',
			taskIds: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
		},
		gr2: {
			id: 'gr2',
			name: 'Group 2',
			tag: 'Group 2',
			taskIds: ['task1', 'task2'],
		},
		gr3: {
			id: 'gr3',
			name: 'Group 3',
			tag: 'Group 3',
			taskIds: ['task3', 'task4'],
		},
	},
	showCompleted: false,
};

const ActionType = {
	ADD_TODO: 'ADD_TODO',
	DELETE_TODO: 'DELETE_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	TOGGLE_SHOW_COMPLETED: 'TOGGLE_SHOW_COMPLETED',
	CLEAR_COMPLETED: 'CLEAR_COMPLETED',
	ADD_GROUP: 'ADD_GROUP',
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case ActionType.ADD_TODO: {
			const { text, groupIds } = action.payload;
			const newId = uuid.v4();

			/// TEST TEST TEST TAGS
			const tags = groupIds
				.filter(groupId => groupId !== 'ALL')
				.map(
					groupId => state.groups[groupId]?.tag || state.groups[groupId]?.name
				);
			/// TEST TEST TEST TAGS

			const newTask = {
				id: newId,
				text,
				completed: false,
				groupIds,
				tags,
			};

			const groupTasksAssignment = { ...state.groups };

			const updatedIds = ['ALL', ...groupIds];
			const uniqueIds = [...new Set(updatedIds)];
			uniqueIds.forEach(groupId => {
				const group = groupTasksAssignment[groupId] || { taskIds: [] };

				groupTasksAssignment[groupId] = {
					...group,
					taskIds: [...new Set([...group.taskIds, newId])],
				};

				// console.log(`-context- Задача додана до групи: ${groupId}`);
				// console.log(`-context- updatedIds: ${updatedIds}`);
				// console.log(`-context- group: ${group}`);
			});

			return {
				...state,
				tasks: {
					...state.tasks,
					[newId]: newTask,
				},
				groups: groupTasksAssignment,
			};
		}
		case ActionType.DELETE_TODO: {
			const { [action.payload]: _, ...remainingTasks } = state.tasks;
			const updatedGroups = Object.keys(state.groups).reduce(
				(groups, groupId) => {
					const group = state.groups[groupId];
					return {
						...groups,
						[groupId]: {
							...group,
							taskIds: group.taskIds.filter(
								taskId => taskId !== action.payload
							),
						},
					};
				},
				{ ...state.groups }
			);

			return {
				...state,
				tasks: remainingTasks,
				groups: updatedGroups,
			};
		}
		case ActionType.TOGGLE_TODO: {
			const task = state.tasks[action.payload];
			if (!task) return state;

			const updatedTask = { ...task, isCompleted: !task.isCompleted };

			return {
				...state,
				tasks: {
					...state.tasks,
					[updatedTask.id]: updatedTask,
				},
			};
		}
		case ActionType.TOGGLE_SHOW_COMPLETED: {
			return {
				...state,
				showCompleted: !state.showCompleted,
			};
		}
		case ActionType.CLEAR_COMPLETED: {
			const remainingTasks = Object.keys(state.tasks).reduce(
				(tasks, taskId) => {
					if (!state.tasks[taskId].completed) {
						tasks[taskId] = state.tasks[taskId];
					}
					return tasks;
				},
				{}
			);

			const updatedGroups = Object.keys(state.groups).reduce(
				(groups, groupId) => {
					const group = state.groups[groupId];
					return {
						...groups,
						[groupId]: {
							...group,
							taskIds: group.taskIds.filter(
								taskId => !state.tasks[taskId].isCompleted
							),
						},
					};
				},
				{ ...state.groups }
			);

			return {
				...state,
				tasks: remainingTasks,
				groups: updatedGroups,
			};
		}
		case ActionType.ADD_GROUP: {
			const { name, tag } = action.payload;
			const newGroupId = uuid.v4();
			return {
				...state,
				groups: {
					...state.groups,
					[newGroupId]: {
						id: newGroupId,
						name,
						tag: tag || name,
						taskIds: [],
					},
				},
			};
		}
		default:
			return state;
	}
};

export const TodoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = (text, groupIds) => {
		// console.log('addTodo', groupIds);

		dispatch({
			type: ActionType.ADD_TODO,
			payload: { text, groupIds },
		});
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

	const addGroup = (name, tag) => {
		dispatch({ type: ActionType.ADD_GROUP, payload: { name, tag } });
	};

	const getTaskStatistics = groupId => {
		// console.log('-context- groupId:', groupId); // Додати логування для перевірки groupId

		const group = state.groups[groupId];

		if (!group) {
			return { totalTasks: 0, completedTasks: 0, uncompletedTasks: 0 };
		}

		const tasksInGroup = group.taskIds.map(taskId => state.tasks[taskId]);

		const totalTasks = tasksInGroup.length;
		const completedTasks = tasksInGroup.filter(
			task => task?.isCompleted
		).length;
		const uncompletedTasks = totalTasks - completedTasks;

		// console.log('-context- totalTasks:', totalTasks);
		// console.log('-context- completedTasks:', completedTasks);
		// console.log('-context- uncompletedTasks:', uncompletedTasks);

		return {
			totalTasks,
			completedTasks,
			uncompletedTasks,
		};
	};

	return (
		<TodoContext.Provider
			value={{
				tasks: state.tasks,
				groups: state.groups,
				showCompleted: state.showCompleted,
				addTodo,
				addGroup,
				deleteTodo,
				toggleTodo,
				toggleShowCompleted,
				clearCompleted,
				getTaskStatistics,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => useContext(TodoContext);
