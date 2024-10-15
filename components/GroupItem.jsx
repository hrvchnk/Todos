import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientIcon from './GradientIcon';
import TaskCount from './TaskCount';

const GroupItem = ({ groupName, groupId, drag }) => {
	const borderColor = useThemeColor({
		light: Colors.light.borderGroupsPrimary,
		dark: Colors.dark.borderGroupsPrimary,
	});
	const backgroundColor = useThemeColor({
		light: Colors.light.backgroundSecondary,
		dark: Colors.dark.backgroundSecondary,
	});
	// const gradientColors = useThemeColor({
	// 	light: ['#6a11cb', '#2575fc', '#6a11cb'],
	// 	dark: ['#303030', '#000000', '#1F1F1F'],
	// });
	// const gradientColors = useThemeColor({
	// 	light: Colors.gradients.background.light.gradient1,
	// 	dark: Colors.gradients.background.dark.gradient1,
	// });

	const gradientColors = useThemeColor({
		light: Colors.gradients.light.gradient1,
		dark: Colors.gradients.dark.gradient1,
	});
	const textGradientColors = useThemeColor({
		light: Colors.gradients.light.gradient1,
		dark: Colors.gradients.dark.gradient1,
	});
	const textColor = useThemeColor({
		light: Colors.light.textPrimary,
		dark: Colors.dark.textPrimary,
	});
	const textDescriptionColor = useThemeColor({
		light: Colors.light.textSecondary,
		dark: Colors.dark.textSecondary,
	});
	const handlePress = () => {
		setIsCompleted(!isCompleted);
		toggleCompleted(task.id);
	};

	console.log('groupId in GroupItem:', groupId);
	return (
		<View style={[styles.shadowContainer, { borderColor }]}>
			<View style={[styles.cardContainer, { borderColor, backgroundColor }]}>
				<View style={styles.iconContainer}>
					<GradientIcon
						name='home'
						// theme='gradient1'
						color='gradient1'
						size='lg'
					/>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.groupName}>
						<Text style={[styles.groupText, { color: textColor }]}>
							{groupName}
						</Text>
					</View>

					<View
						style={[styles.groupStatistics, { color: textDescriptionColor }]}
					>
						<TaskCount groupId={groupId} />
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	shadowContainer: {
		overflow: 'visible',
		borderRadius: 40,

		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 2,
		shadowColor: '#000000',
		elevation: 10,
		// backgroundColor: 'red',
		// borderWidth: 2,
	},
	cardContainer: {
		width: 250,
		height: 100,
		marginRight: 10,
		borderRadius: 40,
		overflow: 'hidden',
		borderWidth: 1,
		// backgroundColor: 'green',
		// flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 60,
		overflow: 'hidden',
		backgroundColor: 'green',
	},
	iconContainer: {
		// width: 60,
		// height: 60,
		paddingLeft: 24,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	contentContainer: {
		// flex: 1,
		paddingLeft: 20,
		paddingRight: 40,
		justifyContent: 'space-between',
	},
	groupText: {
		fontSize: 26,
		fontWeight: 'bold',
	},

	textTag: {
		fontSize: 16,
	},
});

export default GroupItem;
