import { useTodos } from '@/context/ToDoContext';

import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import Button from './Button';
import Input from './Input';

const BottomMenu = ({ groupId = 'ALL' }) => {
	const insets = useSafeAreaInsets();
	const keyboardHeight = useSharedValue(insets.bottom);
	const [newTodo, setNewTodo] = useState('');
	const [keyboardVisible, setKeyboardVisible] = useState(false);

	const { addTodo } = useTodos();

	const handleAddTodo = () => {
		console.log('-BottomMenu- groupId', groupId);
		if (newTodo) {
			const task = {
				text: newTodo,
				groupIds: [groupId],
			};

			addTodo(task.text, task.groupIds);

			console.log('-BottomMenu- addTodo', task);

			setNewTodo('');

			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		}
	};

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			event => {
				keyboardHeight.value = withSpring(event.endCoordinates.height + 10, {
					// duration: 150,
					stiffness: 300,
					damping: 20,
				});
				setKeyboardVisible(true);
			}
		);

		const keyboardDidHideListener = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			() => {
				keyboardHeight.value = withSpring(insets.bottom, {
					stiffness: 300,
					damping: 15,
				});
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, [insets.bottom, keyboardHeight]);

	const animatedStyle = useAnimatedStyle(() => ({
		paddingBottom: keyboardHeight.value,
	}));

	const shadowColor = useThemeColor({
		light: Colors.light.shadowColor,
		dark: Colors.dark.shadowColor,
	});

	return (
		<Animated.View
			style={[
				styles.container,
				animatedStyle,
				{
					shadowColor,
				},
			]}
		>
			<View style={styles.innerBorder}>
				<BlurView tint='default' intensity={80} style={[styles.blurContent]}>
					{/* {!keyboardVisible && (
						<View style={styles.openMenuButton}>
							<Menu />
						</View>
					)} */}
					{keyboardVisible && (
						<View style={styles.openMenuButton}>
							<Button
								iconName='tag'
								iconTheme='secondaryIcon'
								iconSize='md'
								theme='icon'
							/>
						</View>
					)}

					<Input
						// groupId={groupId}
						value={newTodo}
						onChangeText={setNewTodo}
						onSubmit={() => handleAddTodo()}
					/>
				</BlurView>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: Sizes.gaps.md,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 10,
	},
	blurContent: {
		overflow: 'hidden',
		borderRadius: Sizes.radius.xxl,
		flexDirection: 'row',
		alignItems: 'center',
		padding: Sizes.gaps.md,
	},

	innerBorder: {
		flex: 1,
		borderRadius: Sizes.radius.xxl,
	},
	// openMenuButton: {
	// 	paddingLeft: Sizes.gaps.xss,
	// 	paddingRight: Sizes.gaps.md,
	// },
});

export default BottomMenu;
