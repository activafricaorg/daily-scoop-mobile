import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		backgroundColor: '#0f0f0f',
	},
	mainContainer: {
		padding: 10,
		marginTop: 20,
		width:windowWidth
	},
	textView: {
		fontFamily: 'Moderat-Regular',
		fontSize: 16,
		color: 'white',
		textDecorationStyle: undefined
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		padding: 10,
	},
	wrapper: {
		width: '100%',
		backgroundColor: '#0f0f0f'
	},
	headingText: {
		color: 'white',
		fontFamily: 'Moderat-Bold',
		textAlign: 'center',
		marginBottom: 20,
		fontSize: 34
	}
})