import BottomMenu from '@/components/BottomMenu';
import { ThemeProvider } from '@/context/ThemeContext'; //
import { TodoProvider } from '@/context/ToDoContext';
import { VibrationProvider } from '@/context/VibrationContext';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
	Button,
	FlatList,
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { useTodos } from '../context/ToDoContext';
const TaskList = () => {
	const { groupId, groupName } = useLocalSearchParams(); // Отримуємо параметри групи
	const { groups, addTodo, toggleTodo } = useTodos(); // Використовуємо контекст для завдань
	const group = groups.find(g => g.id === groupId); // Знаходимо потрібну групу за groupId

	if (!group) {
		return <Text>Група не знайдена</Text>; // Якщо група не знайдена
	}

	const handleAddTodo = () => {
		const todoTitle = `Нове завдання ${group.tasks.length + 1}`;
		addTodo(todoTitle, groupId); // Додаємо завдання до поточної групи
	};
	const backgroundColor = useThemeColor(
		{ light: Colors.light.background, dark: Colors.dark.background },
		'background'
	);
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider>
			<VibrationProvider>
				<TodoProvider>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						accessible={false}
					>
						<SafeAreaView style={[styles.container, { backgroundColor }]}>
							<View style={styles.container}>
								<Text style={styles.title}>{groupName}</Text>{' '}
								{/* Відображаємо ім'я групи */}
								<FlatList
									data={group.tasks} // Виводимо завдання конкретної групи
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
								<Button title='Додати завдання' onPress={handleAddTodo} />{' '}
								{/* Кнопка для додавання завдання */}
								<BottomMenu />
							</View>
						</SafeAreaView>
					</TouchableWithoutFeedback>
				</TodoProvider>
			</VibrationProvider>
		</ThemeProvider>
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

export default TaskList;
