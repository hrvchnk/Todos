import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const ViewModal = ({ isVisible, onClose, onShow, children }) => {
	const navigation = useNavigation();

	useEffect(() => {
		if (isVisible && onShow) {
			onShow();
		}
	}, [isVisible, onShow]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			if (isVisible) {
				onClose();
			}
		});

		return unsubscribe;
	}, [isVisible, navigation, onClose]);

	const colorStick = useThemeColor({
		light: Colors.light.stick,
		dark: Colors.dark.stick,
	});
	const gradientColors = useThemeColor({
		light: ['#FFFFFF', '#FFDDC1', '#F7B8A3'],
		dark: ['#303030', '#000000', '#1F1F1F'],
	});
	return (
		<Modal
			isVisible={isVisible}
			animationIn='slideInUp'
			animationOut='slideOutDown'
			animationInTiming={300}
			onRequestClose={onClose}
			onBackdropPress={onClose}
			style={styles.container}
			backdropColor='transparent' // робить фон прозорим
			backdropOpacity={0}
		>
			<View style={styles.content}>
				<LinearGradient
					style={[styles.gradient, { opacity: 0.8 }]}
					colors={gradientColors}
				/>
				<BlurView tint='default' intensity={40} style={styles.blur} />

				<View style={styles.stickContainer}>
					<View style={[styles.stick, { backgroundColor: colorStick }]} />
				</View>
				<View style={styles.childrenContent}>{children}</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		// margin: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		// borderRadius: 42,
		// overflow: 'hidden',
		marginHorizontal: 16,
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.3,
		shadowRadius: 0.1,

		shadowColor: '#606060',
	},
	content: {
		borderRadius: 42,

		overflow: 'hidden',
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,

		height: '100%',
		// overflow: 'hidden',
	},
	blur: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,

		height: '100%',
		// overflow: 'hidden',
		// borderRadius: 42,
	},
	childrenContent: {
		padding: 20,
	},
	stickContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
		marginBottom: 16,
	},
	stick: {
		width: 50,
		height: 5,
		borderRadius: 10,
		// backgroundColor: 'black',
	},
});

export default ViewModal;
