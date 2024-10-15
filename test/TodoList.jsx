// components/TodoList.js
import React from 'react';
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useTodos } from '../context/ToDoContext';

const TodoList = ({ groupId }) => {
	const { groups, addTodo, toggleTodo } = useTodos();
	const group = groups.find(g => g.id === groupId);

	if (!group) {
		return <Text>Група не знайдена</Text>;
	}

	const handleAddTodo = () => {
		const todoTitle = `Нове завдання ${group.tasks.length + 1}`;
		addTodo(todoTitle, groupId); // Передаємо groupId як параметр
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{group.name}</Text>
			<FlatList
				data={group.tasks}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.todo}
						onPress={() => toggleTodo(groupId, item.id)}
					>
						<Text style={item.completed ? styles.completed : null}>
							{item.title}
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={item => item.id}
			/>
			<Button title='Додати завдання' onPress={handleAddTodo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	todo: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#e0f7fa',
		borderRadius: 5,
	},
	completed: {
		textDecorationLine: 'line-through',
	},
});

export default TodoList;
