import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';

function BlurredHeader() {
	const router = useRouter();

	return (
		<SafeAreaView>
			<BlurView tint='default' intensity={100} style={styles.headerContainer}>
				<Button
					onPress={() => router.back()} // Закрити модальне вікно
					title='Назад'
					iconName='arrow-left'
					iconTheme='secondaryIcon'
					iconSize='md'
					theme='icon'
					color={Colors.light.textPrimary}
				/>
				<Text style={styles.headerTitle}>Settings</Text>
			</BlurView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		// width: '100%',

		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,

		overflow: 'hidden',
		height: 60,
		// position: 'absolute',
		// top: 0,
		// left: 0,
		// right: 0,
	},
	headerTitle: {
		fontSize: 18,

		fontWeight: 'bold',
		color: Colors.light.textPrimary,
	},
});

export default BlurredHeader;
