import { ThemeProvider } from '@/context/ThemeContext';
import { useTodos } from '@/context/ToDoContext';
import { VibrationProvider } from '@/context/VibrationContext';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import GroupItem from '../components/GroupItem';
import TodoList from '../components/TodoList';

const Group = ({ item }) => {
	const { groups } = useTodos();
	const params = useLocalSearchParams();
	const id = params?.id?.trim(); // Ensure id is trimmed and a string

	if (!id || !groups) {
		console.error('ID or Groups are undefined');
		return null;
	}

	// Знайти групу за id
	const group = groups[id] || null;
	const groupName = group ? group.name : 'Unknown Group';

	// Log to verify
	// console.log('-Group- GroupName', groupName);
	// console.log('-Group- Processed ID', id);
	// console.log('-Group- Params', params);
	// console.log('-Group- Group', group);
	// console.log('-Group- Groups', groups);

	return (
		<ThemeProvider>
			<VibrationProvider>
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.container}>
						<GroupItem groupName={groupName} />
						<TodoList place={'group'} groupId={id} />

						<BottomMenu groupId={id} />
					</View>
				</SafeAreaView>
			</VibrationProvider>
		</ThemeProvider>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	groupName: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 16,
	},
});

export default Group;
