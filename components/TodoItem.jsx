import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTodos } from '../context/ToDoContext';
import ButtonIcon from './ButtonIcon';

const TodoItem = ({ id, groupName }) => {
	const { tasks, toggleTodo } = useTodos();

	const task = tasks[id] || {};
	const isCompleted = task?.isCompleted;

	const textColor = useThemeColor({
		light: isCompleted
			? Colors.light.textPrimaryCompleted
			: Colors.light.textPrimary,
		dark: isCompleted
			? Colors.dark.textPrimaryCompleted
			: Colors.dark.textPrimary,
	});
	const iconName = isCompleted ? 'check-circle' : 'circle';
	const iconColor = isCompleted
		? Colors.light.tertiaryIcon
		: Colors.light.secondaryIcon; // Define your colors accordingly

	const handlePress = () => {
		toggleTodo(id);
	};

	return (
		<TouchableOpacity>
			<Animated.View
				style={[styles.item, task.completed && styles.itemCompleted]}
			>
				<ButtonIcon
					iconName={iconName} // Keep original prop name
					iconColor={iconColor}
					onPress={handlePress}
					iconSize='lg'
				/>

				<View style={styles.taskTextContainer}>
					<Text style={[styles.taskText, { color: textColor }]}>
						{task.text}
						{task.description && (
							<Text
								style={[
									styles.description,
									{ color: Colors.light.textSecondary },
								]}
							>
								{task.description}
							</Text>
						)}
					</Text>
				</View>
				<Text
					style={[styles.description, { color: Colors.light.textSecondary }]}
				>
					{groupName}
				</Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingHorizontal: 20,
		// height: 60,
		marginBottom: 20,
		// borderRadius: 120,
		// shadowOffset: { width: 0, height: 1 },
		// shadowRadius: 1,
		// shadowOpacity: 0.06,
		// elevation: 12,
		// borderWidth: 1,
	},
	appTitle: {
		marginVertical: 16,
		fontWeight: 'bold',
		fontSize: 24,
	},
	itemCompleted: {
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 0,
		shadowOpacity: 0,
		elevation: 0,
	},
	taskTextContainer: {
		flex: 1,
		marginHorizontal: 16,
	},
	taskText: {
		fontSize: 16,
		fontWeight: 'bold',
		// backgroundColor: 'black',
	},
	description: {
		fontSize: 14,
	},
});

export default TodoItem;
