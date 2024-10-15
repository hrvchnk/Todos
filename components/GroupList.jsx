import { useTodos } from '@/context/ToDoContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
	Button,
	FlatList,
	Modal,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import ButtonAddGroup from './ButtonAddGroup';
import GroupItem from './GroupItem';
const GroupList = () => {
	const { groups, addGroup } = useTodos();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newGroupName, setNewGroupName] = useState('');

	const handleAddGroupPress = () => {
		setIsModalVisible(true);
	};

	const handleAddGroup = () => {
		if (newGroupName) {
			addGroup(newGroupName);
			setIsModalVisible(false);
			setNewGroupName('');
		}
	};

	const renderItem = ({ item }) => (
		<Link
			href={{
				pathname: 'group',
				params: { id: item.id },
			}}
		>
			<GroupItem
				groupName={item.name}
				groupId={item.id}
				gradientColors={['#ff7e5f', '#feb47b']}
			/>
		</Link>
	);

	const groupList = groups ? Object.values(groups) : [];
	return (
		<View style={styles.container}>
			<FlatList
				data={groupList}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatList}
				ListFooterComponent={
					<View style={[styles.addGroupContainer]}>
						<ButtonAddGroup onPress={handleAddGroupPress} />
					</View>
				}
			/>
			<Modal visible={isModalVisible} transparent={true}>
				<View style={styles.modalContainer}>
					<TextInput
						placeholder='Enter group name'
						value={newGroupName}
						onChangeText={setNewGroupName}
						style={styles.input}
					/>
					<Button title='Add Group' onPress={handleAddGroup} />
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		// flex: 1,
		// backgroundColor: 'blue',
	},

	flatList: {
		// flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 16,
		alignItems: 'center',
		// backgroundColor: 'red',
	},

	addGroupContainer: {
		flex: 1,

		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	modalContent: {
		width: 300,
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
	},

	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
});

export default GroupList;
