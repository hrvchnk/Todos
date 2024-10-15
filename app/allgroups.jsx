import { Colors } from '@/constants/Colors';
import { useTodos } from '@/context/ToDoContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
	NestableDraggableFlatList,
	NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Імпортуємо GestureHandlerRootView
import GroupItem from '../components/GroupItem';

const AllGroups = () => {
	const { groups, setGroups } = useTodos(); // Використання груп з контексту
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor(
		{ light: Colors.light.background, dark: Colors.dark.background },
		'background'
	);

	// Перетворюємо об'єкт груп у масив
	const groupList = groups ? Object.values(groups) : [];

	// Функція для рендерингу кожного елемента списку
	const renderItem = ({ item, drag, isActive }) => (
		<View style={[styles.groupItem, isActive && styles.activeItem]}>
			<GroupItem
				groupName={item.name}
				groupId={item.id}
				gradientColors={['#ff7e5f', '#feb47b']}
				onLongPress={drag}
			/>
		</View>
	);

	const handleDragEnd = ({ data }) => {
		console.log('Dragged data:', data);
		setGroups(data);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={[styles.container, { backgroundColor }]}>
				<NestableScrollContainer>
					<NestableDraggableFlatList
						data={groupList}
						renderItem={renderItem}
						keyExtractor={item => item.id}
						onDragEnd={handleDragEnd}
						contentContainerStyle={styles.flatList}
					/>
				</NestableScrollContainer>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatList: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
	groupItem: {
		marginVertical: 10,
	},
	activeItem: {
		backgroundColor: '#e0e0e0',
	},
	addGroupContainer: {
		alignItems: 'center',
		marginVertical: 20,
	},
});

export default AllGroups;
