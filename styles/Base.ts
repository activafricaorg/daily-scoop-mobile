import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	wrapper: {
		width: '100%',
		backgroundColor: '#0f0f0f'
	},
	container: {
		flex: 1,
		backgroundColor: '#0f0f0f'
	},
	mainContainer: {
		padding: 10,
		marginTop: 0,
		marginBottom: 50,
		width: windowWidth
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
	headingText: {
		color: '#dcdcdc',
		fontFamily: 'Moderat-Bold',
		marginBottom: 10,
		fontSize: 24
	},
	paragraphText: {
		fontFamily: 'Moderat-Regular',
		marginBottom: 10,
		fontSize: 17,
		lineHeight: 23,
		color: 'rgb(168, 168, 168)',
	},
	infoContainer: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10
	},
	button: {
		display: 'flex',
		alignSelf: "flex-start",
		fontFamily: 'Moderat-Regular',
		color: '#0f0f0f',
		backgroundColor: '#fdc006',
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	textLink: {
		color: '#fdc006'
	}
})