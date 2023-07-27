import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		backgroundColor: '#0f0f0f',
	},
	mainContainer: {
		padding: 10,
		marginTop: 40,
		width:windowWidth
	},
	textView: {
		// fontFamily: 'Poly-Sans-Neutral',
		fontSize: 16,
		color: 'white',
		textDecorationStyle: undefined
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		padding: 10,
	},
	headingText: {
		fontSize: 30,
		textAlign: 'center',
		// fontFamily: 'Poly-Sans-Median',
		color: 'black',
		marginBottom: 30
	}
})