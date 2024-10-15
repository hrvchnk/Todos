import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../context/ToDoContext';

const TaskCount = ({ groupId }) => {
	const textColor = useThemeColor({
		light: '#CCCCCC',
		dark: '#626167',
	});

	if (!groupId) {
		return <Text>Група не знайдена</Text>;
	}

	const { getTaskStatistics } = useTodos();
	const { totalTasks, completedTasks, uncompletedTasks } =
		getTaskStatistics(groupId);

	const fillPercentage =
		totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	const backgroundColor = useThemeColor({
		light: '#CCCCCC',
		dark: '#2C2C2C',
	});

	return (
		<View style={styles.container}>
			<Text style={[styles.text, { color: textColor }]}>
				{uncompletedTasks}/{totalTasks}
			</Text>
			<View style={[styles.progressContainer, { backgroundColor }]}>
				<LinearGradient
					colors={['#6a11cb', '#2575fc']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={[styles.progressBar, { width: `${fillPercentage}%` }]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	text: {
		fontSize: 12,
		marginBottom: 4,
	},
	progressContainer: {
		width: '100%',
		height: 8,
		borderRadius: 80,
		overflow: 'hidden',
	},
	progressBar: {
		margin: 1,

		height: 6,
		borderRadius: 80,
		shadowColor: 'rgba(0, 0, 0, 0.32)',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
	},
});

export default TaskCount;
