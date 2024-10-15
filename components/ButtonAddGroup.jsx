import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import ButtonIcon from './ButtonIcon';

const ButtonAddGroup = ({ onPress }) => {
	const colorScheme = useColorScheme();
	const gradientColors = useThemeColor({
		light: Colors.gradients.light.gradient1,
		dark: Colors.gradients.dark.gradient1,
	});
	const textColor = useThemeColor({
		light: '#CCCCCC', // Light theme text color
		dark: '#626167', // Dark theme text color
	});
	return (
		<TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
			<ButtonIcon
				title='addGroup'
				iconName='plus-circle'
				iconSize='lg'
				iconTheme='secondaryIcon'
			/>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Add Group</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		// borderRadius: 50,
		// overflow: 'hidden',
		padding: 10,
		// width: 80,
		alignItems: 'center',
		justifyContent: 'center',
		// flex: 1,

		// backgroundColor: 'green',
	},
	textContainer: {
		paddingTop: 10,
	},

	text: {
		fontSize: 16,
		fontWeight: '600',

		justifyContent: 'center',
	},
	gradient: {
		flex: 1,
	},
});

export default ButtonAddGroup;
