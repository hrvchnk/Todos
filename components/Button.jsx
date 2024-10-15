import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import SvgIcon from './SvgIcon';
// const colorScheme = useColorScheme();
const Button = ({
	iconName,
	iconSize,
	iconTheme,

	onPress,

	textSize,
	buttonText,

	textTheme,

	theme,
}) => {
	const colorScheme = useColorScheme();
	const buttonTheme = [styles.button, styles[`${colorScheme}_${theme}_button`]];

	const textColor = useThemeColor(
		{ light: Colors.light[textTheme], dark: Colors.dark[textTheme] },
		'text'
	);

	return (
		<TouchableOpacity onPress={onPress} style={buttonTheme}>
			<View style={styles.innerContainer}>
				{iconName && (
					<SvgIcon name={iconName} size={iconSize} theme={iconTheme} />
				)}

				{buttonText && (
					<Text
						style={[
							styles.text,
							{
								color: textColor,
								fontSize: Sizes.textSizes[textSize],
							},
						]}
					>
						{buttonText}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: { justifyContent: 'center', alignItems: 'center' },
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
	},

	text: {},

	light_icon_button: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// marginLeft: 20,
	},
	dark_icon_button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		// marginLeft: 20,
	},

	//add send toto button
	light_primary_button: {
		backgroundColor: Colors.light.primaryBtn,
		borderRadius: Sizes.radius.lg,
		width: 46,
		height: 34,
	},
	dark_primary_button: {
		backgroundColor: Colors.dark.primaryBtn,
		borderRadius: Sizes.radius.lg,
		width: 46,
		height: 34,
	},

	//item - check box button
	light_checkbox_button: {
		borderRadius: Sizes.radius.sm,
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: Colors.light.secondaryBtn,
	},
	dark_checkbox_button: {
		borderRadius: Sizes.radius.sm,
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: Colors.dark.secondaryBtn,
	},

	// tag
	light_tag_button: {
		borderRadius: Sizes.radius.sm,
		backgroundColor: Colors.light.tag7,
		paddingHorizontal: Sizes.gaps.xs,
		// paddingVertical: Sizes.gaps.xs,
		maxWidth: 70,
		width: 'auto',
		height: 24,

		// maxWidth: 70,
	},
	dark_tag_button: {
		borderRadius: Sizes.radius.sm,
		backgroundColor: Colors.light.tag7,
		paddingHorizontal: Sizes.gaps.xs,
		paddingVertical: Sizes.gaps.xs,
		maxWidth: 70,
		width: 'auto',
		height: 24,
	},

	light_text_button: {
		borderRadius: Sizes.radius.sm,
		// backgroundColor: Colors.light.tag7,
		paddingHorizontal: Sizes.gaps.xs,
		// paddingVertical: Sizes.gaps.xs,
		// backgroundColor: 'red',
		height: 24,

		// textColor: '#FF5E5E',
		// maxWidth: 70,
	},
	dark_text_button: {
		borderRadius: Sizes.radius.sm,
		// backgroundColor: Colors.light.tag7,
		paddingHorizontal: Sizes.gaps.xs,
		// paddingVertical: Sizes.gaps.xs,

		height: 24,
		// color: '#FF5E5E',
		// maxWidth: 70,
	},

	sm_button: {
		width: 200,
		height: 200,
		borderRadius: Sizes.radius.xs,
		backgroundColor: 'red',
	},
	md_button: {
		width: 100,
		height: 50,
		borderRadius: Sizes.radius.lg,
	},
	lg_button: {
		width: 60,
		height: 60,
		borderRadius: Sizes.radius.lg,
	},
});

export default Button;
