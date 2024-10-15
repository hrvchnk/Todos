import BottomMenu from '@/components/BottomMenu';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React from 'react';
import {
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
} from 'react-native';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import GroupList from '../components/GroupList';
import TodoList from '../components/TodoList';

export default function HomeScreen({ groupId }) {
	const backgroundColor = useThemeColor(
		{ light: Colors.light.background, dark: Colors.dark.background },
		'background'
	);
	const colorScheme = useColorScheme();
	const textColor = useThemeColor({
		light: Colors.light.textPrimary,
		dark: Colors.dark.textPrimary,
	});
	const router = useRouter();
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={[styles.container, { backgroundColor }]}>
				<View>
					<View>
						<Text
							style={{
								color: textColor,
								fontSize: 24,
								fontWeight: 'bold',
								// marginTop: 20,
								marginHorizontal: 16,
								// marginBottom: 10,
							}}
						>
							Groups
						</Text>
						<Button
							onPress={() => router.push('/allgroups')}
							buttonText='All Groups'
						/>
					</View>

					<GroupList />
				</View>
				<View style={styles.tasksContainer}>
					<View style={styles.tasksMenu}>
						<Text style={styles.sectionNameText}>All</Text>
						<ButtonIcon
							title='filter tasks'
							iconName='filter'
							iconSize='sm'
							iconTheme='secondaryIcon'
						/>
					</View>
					<TodoList place={'index'} groupId={groupId} />
				</View>
				<BottomMenu />
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tasksContainer: {
		flex: 1,
		marginHorizontal: 16,
	},
	tasksMenu: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		// alignItems: 'center',
	},
	sectionNameText: {
		paddingVertical: 20,
		fontSize: 24,
		fontWeight: 'bold',
	},
	groupList: {},
});
