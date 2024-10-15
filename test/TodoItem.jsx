import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated'; // Import Easing from react-native-reanimated
import Button from './Button';

const TodoItem = ({ task, toggleCompleted }) => {
	// const backgroundColor = useThemeColor({
	// 	light: Colors.light.backgroundItem,
	// 	dark: Colors.dark.backgroundItem,
	// });
	const shadowColor = useThemeColor({
		light: Colors.light.shadowColor,
		dark: Colors.dark.shadowColor,
	});

	const [isCompleted, setIsCompleted] = useState(task.completed);
	const borderColor = useThemeColor({
		light: isCompleted
			? Colors.light.borderItemCompleted
			: Colors.light.borderItem,
		dark: isCompleted
			? Colors.dark.borderItemCompleted
			: Colors.dark.borderItem,
	});
	const backgroundColor = useThemeColor({
		light: isCompleted
			? Colors.light.backgroundItemCompleted
			: Colors.light.backgroundItem,
		dark: isCompleted
			? Colors.dark.backgroundItemCompleted
			: Colors.dark.backgroundItem,
	});

	const textColor = useThemeColor({
		light: isCompleted
			? Colors.light.textPrimaryCompleted
			: Colors.light.textPrimary,
		dark: isCompleted
			? Colors.dark.textPrimaryCompleted
			: Colors.dark.textPrimary,
	});
	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(backgroundColor, {
				duration: 500,
				easing: Easing.out(Easing.ease),
			}),
		};
	}, [backgroundColor]);

	const handlePress = () => {
		setIsCompleted(!isCompleted);
		toggleCompleted(task.id);
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Animated.View
				style={[
					styles.item,
					task.completed && styles.itemCompleted,
					animatedStyle,
					{ shadowColor },
					{ borderColor },
				]}
			>
				<Button
					onPress={handlePress}
					iconName={isCompleted ? 'issue-closed' : 'circle'}
					iconSize={'lg'}
					// theme={isCompleted ? 'icon' : 'checkbox'}
					iconTheme={'tertiaryIcon'}
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

				<Button
					buttonText='Home'
					theme='tag'
					textTheme='textTertiary'
					textSize='xs'
				/>
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
		paddingHorizontal: 16,
		height: 60,
		marginBottom: 6,
		borderRadius: 120,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 1,
		shadowOpacity: 0.06,
		elevation: 12,
		borderWidth: 1,
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
	},
	description: {
		fontSize: 14,
	},
});

export default TodoItem;
