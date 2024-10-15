import BottomMenu from '@/components/BottomMenu';
import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@/context/ThemeContext'; //
import { TodoProvider } from '@/context/ToDoContext';
import { VibrationProvider } from '@/context/VibrationContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Button,
	FlatList,
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
} from 'react-native';
const TaskGroupsScreen = () => {
	const [taskGroups, setTaskGroups] = useState([
		{
			id: '1',
			name: 'Особисті',
			color: '#f9c2ff',
			tasks: [{ completed: true }, { completed: false }],
		},
		{
			id: '2',
			name: 'Робота',
			color: '#f0c2ff',
			tasks: [{ completed: true }],
		},
	]);

	const router = useRouter();

	const handleAddGroup = () => {
		const newGroup = {
			id: `${taskGroups.length + 1}`,
			name: 'Нова група',
			color: '#ccc',
			tasks: [],
		};
		setTaskGroups([...taskGroups, newGroup]);
	};

	const handleDeleteGroup = id => {
		setTaskGroups(taskGroups.filter(group => group.id !== id));
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
							<View style={styles.content}>
								<FlatList
									data={taskGroups}
									renderItem={({ item }) => (
										<View
											style={[
												styles.groupCard,
												{ backgroundColor: item.color },
											]}
										>
											<TouchableOpacity
												onPress={() =>
													router.push({
														pathname: '/task-list',
														params: { groupId: item.id, groupName: item.name },
													})
												}
											>
												<Text style={styles.groupName}>{item.name}</Text>
												<Text>Завдань: {item.tasks.length}</Text>
												<Text>
													Виконано:{' '}
													{item.tasks.filter(task => task.completed).length}
												</Text>
											</TouchableOpacity>
											<Button
												title='Редагувати'
												onPress={() =>
													router.push({
														pathname: '/task-group',
														params: { groupId: item.id, groupName: item.name },
													})
												}
											/>
											<Button
												title='Видалити'
												onPress={() => handleDeleteGroup(item.id)}
												color='red'
											/>
										</View>
									)}
									keyExtractor={item => item.id}
								/>
								<Button title='Додати групу' onPress={handleAddGroup} />
							</View>
							<BottomMenu />
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
	content: {
		flex: 1, // Забезпечує, що контент займає весь доступний простір, залишаючи місце для меню
	},
	groupCard: {
		padding: 20,
		marginVertical: 10,
		borderRadius: 5,
	},
	groupName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default TaskGroupsScreen;
