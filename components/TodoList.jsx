import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTodos } from '../context/ToDoContext'; // Переконайтесь, що цей компонент імпортований коректно
import TodoItem from './TodoItem'; // Переконайтесь, що цей компонент імпортований коректно

const TodoList = ({ groupId = 'ALL' }) => {
	const { groups } = useTodos();

	if (!groups) {
		console.error('Tasks or Groups are undefined');
		return null;
	}

	const selectedTasksIds = groups[groupId]?.taskIds;

	return (
		<View style={styles.container}>
			<FlatList
				data={selectedTasksIds}
				renderItem={({ item }) => <TodoItem id={item} />}
				keyExtractor={item => item}
				contentContainerStyle={styles.flatListContent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'yellow',
	},
	flatListContent: {
		paddingHorizontal: 16,
		paddingBottom: 100,
	},
});

export default TodoList;
