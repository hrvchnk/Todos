import BottomMenu from '@/components/BottomMenu';
import { useRouter } from 'expo-router'; // імпортуємо useRouter
import React, { useState } from 'react';
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useTodos } from '../context/ToDoContext';
const TaskGroups = () => {
	const { groups, addGroup, deleteGroup } = useTodos();
	const [newGroupName, setNewGroupName] = useState('');
	const router = useRouter(); // використовуємо useRouter для навігації

	const handleAddGroup = () => {
		const groupColor = '#ccc'; // можна додати логіку вибору кольору
		addGroup(newGroupName, groupColor);
		setNewGroupName('');
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={groups}
				renderItem={({ item }) => (
					<View style={[styles.groupCard, { backgroundColor: item.color }]}>
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
								Виконано: {item.tasks.filter(task => task.completed).length}
							</Text>
						</TouchableOpacity>
						<Button
							title='Видалити'
							onPress={() => deleteGroup(item.id)}
							color='red'
						/>
					</View>
				)}
				keyExtractor={item => item.id}
			/>

			<BottomMenu />
			<Button title='Додати групу' onPress={handleAddGroup} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
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

export default TaskGroups;
