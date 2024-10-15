import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import Button from './Button';
const Input = ({ value, onSubmit, onChangeText }) => {
	// const inputRef = useRef(null);

	const handleTextChange = text => {
		if (onChangeText) {
			onChangeText(text);
		}
	};
	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit(value);
			console.log('-Input- inputText', value);
		}
	};

	//style
	const backgroundColor = useThemeColor({
		light: Colors.light.backgroundSecondary,
		dark: Colors.dark.backgroundSecondary,
	});
	const shadowColor = useThemeColor({
		light: Colors.light.shadowColor,
		dark: Colors.dark.shadowColor,
	});
	const placeholderColor = useThemeColor({
		light: Colors.light.textSecondary,
		dark: Colors.dark.textSecondary,
	});
	const textColor = useThemeColor({
		light: Colors.light.textPrimary,
		dark: Colors.dark.textPrimary,
	});
	const borderColor = useThemeColor({
		light: Colors.light.borderInput,
		dark: Colors.dark.borderInput,
	});

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[styles.shadowContainer, { shadowColor }]}
		>
			<BlurView
				tint='default'
				intensity={20}
				style={[styles.inputContainer, { borderColor }]}
			>
				<TextInput
					// ref={inputRef}
					style={[styles.input, { color: textColor }]}
					value={value}
					onChangeText={handleTextChange}
					placeholder='Add task'
					placeholderTextColor='#888'
					// onSubmitEditing={handleButtonPress}
				/>
				{value.length ? (
					<View style={styles.button}>
						<Button
							iconName='paper-airplane'
							iconTheme='primaryIcon'
							iconSize='md'
							onPress={handleSubmit}
							theme='primary'
						/>
					</View>
				) : null}
			</BlurView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	shadowContainer: {
		flex: 1,
		// shadowOffset: { width: 0, height: 4 },
		// shadowRadius: 10,
		// shadowOpacity: 0.2,
		// elevation: 12,
		// shadowOffset: { width: 0, height: 0 },
		// shadowRadius: 5,
		// shadowOpacity: 0.1,

		shadowOffset: { width: -2, height: 0 },
		shadowRadius: 6,
		shadowOpacity: 0.06,
		elevation: 12,
	},
	inputContainer: {
		borderRadius: Sizes.radius.lg,
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden',
	},
	input: {
		flex: 1,
		paddingLeft: Sizes.gaps.md,
		height: 44,
		fontSize: Sizes.textSizes.lg,
	},
	button: {
		padding: 5,
	},
});

export default Input;
