import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import { Link, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import ColorSchemeSwitch from '../components/ColorSchemeSwitch';
const Modal = () => {
	const isPresented = router.canGoBack();
	// const router = useRouter();
	const colorScheme = useColorScheme();

	const textColor = useThemeColor(
		{
			light: Colors.light.textPrimary,
			dark: Colors.dark.textPrimary,
		},
		'color'
	);
	const backgroundColor = useThemeColor({
		light: Colors.light.background,
		dark: 'Colors.dark.backgroundSecondary',
	});

	return (
		// <View style={[styles.container, { backgroundColor: 'transparent' }]}>

		<BlurView tint='default' intensity={70} style={styles.blur}>
			{/* <SafeAreaView style={[styles.container, {}]}> */}
			<View style={styles.container}>
				<View style={styles.content}>
					<Text
						style={{
							color: textColor,
							fontSize: 24,
							fontWeight: 'bold',
							paddingVertical: 10,
						}}
					>
						Premium
					</Text>
					<Button
						iconName='feed-rocket'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Upgrade to Pro 7 days left in trial'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>
					<View style={styles.line}></View>
					{!isPresented && <Link href='../'>Dismiss modal</Link>}
					<Text
						style={{
							color: textColor,
							fontSize: 24,
							fontWeight: 'bold',
							paddingVertical: 10,
						}}
					>
						Theme
					</Text>
					<ColorSchemeSwitch />
					<Text style={{ color: 'red' }}> {colorScheme}</Text>
					<View style={styles.line}></View>
					<Button
						iconName='globe'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Language'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>

					<View style={styles.line}></View>
					<Button
						iconName='share'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Share the application'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>
					<Button
						iconName='heart'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Rate in the App Store'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>
					<View style={styles.line}></View>
					<Button
						iconName='mail'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Contact Us'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>

					<Button
						iconName='lock'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Privacy Policy'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>
					<Button
						iconName='log'
						iconTheme='primaryIcon'
						iconSize='lg'
						theme='text'
						buttonText={'Terms of Service'}
						// onPress={() => router.push({ pathname: '/PRO' })}
					/>
					<View style={styles.line}></View>
					<Text
						style={{
							color: textColor,
							fontSize: 14,
							// fontWeight: 'bold',
							paddingVertical: 10,
						}}
					>
						Tosos v1.0 (1)
					</Text>
				</View>
			</View>
			{/* </SafeAreaView> */}
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	blur: {
		// position: 'absolute',
		// left: 0,
		// right: 0,
		// top: 0,
		height: '100%',
		// overflow: 'hidden',
		// borderRadius: 42,
	},
	content: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 16,
		// marginBottom: 16,
	},
	line: {
		width: 300,
		borderWidth: 1,
		borderColor: 'grey',
		marginVertical: 20,
	},
});
export default Modal;
