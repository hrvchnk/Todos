import { useTodos } from '@/context/ToDoContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import ViewModal from './NOT USE - ViewModal';
const Menu = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const inputRef = useRef(null);

	const openModal = () => setIsModalVisible(true);
	const closeModal = () => setIsModalVisible(false);

	const handleModalShow = () => {
		setTimeout(() => {
			inputRef.current?.focus();
		}, 300);
	};
	const {
		todos,
		toggleTodo,
		showCompleted,
		toggleShowCompleted,
		clearCompleted,
	} = useTodos();

	const textColor = useThemeColor({}, 'primary');
	return (
		<View>
			<Button
				iconName='three-bars'
				iconTheme='secondaryIcon'
				iconSize='md'
				onPress={openModal}
				theme='icon'
			/>

			<ViewModal
				isVisible={isModalVisible}
				onClose={closeModal}
				onShow={handleModalShow}
			>
				<View style={styles.menuContainer}>
					<TouchableOpacity style={styles.menuItem}>
						<Button
							iconName='archive'
							iconTheme='primaryIcon'
							iconSize='lg'
							buttonText={showCompleted ? 'Hide Completed' : 'Show Completed'}
							onPress={toggleShowCompleted}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem}>
						<Button
							iconName='trash'
							iconTheme='textQuaternary'
							iconSize='lg'
							buttonText={'Delete Completed'}
							theme='text'
							onPress={clearCompleted}
							textTheme='textQuaternary'
							style={styles.menuItem}
						/>
					</TouchableOpacity>

					<View style={styles.line}></View>

					<TouchableOpacity style={styles.menuItem}>
						<Button
							iconName='gear'
							iconTheme='primaryIcon'
							iconSize='lg'
							theme='text'
							buttonText={'Settings'}
							onPress={() => router.push({ pathname: '/settings' })}
						/>
					</TouchableOpacity>
				</View>
			</ViewModal>
		</View>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 16,
		marginBottom: 16,
	},

	line: {
		width: 300,
		borderWidth: 1,
		borderColor: 'grey',
	},
	menuItem: {
		padding: 10,
	},
});

export default Menu;
