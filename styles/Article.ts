import { StyleSheet } from "react-native";

export default StyleSheet.create({
	articleView: {
		flex: 1,
		backgroundColor: '#151515',
		marginBottom: 8,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 50,
	},
	articleTitle: {
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		fontSize: 23,
		lineHeight: 28,
		color: '#adadad'
	},
	articleMeta: {
		flexDirection: 'row',
		// paddingTop: 20,
		paddingBottom: 10,
		// borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: 'rgba(241,154,61,0.04)',
	},
	articleSource: {
		marginLeft: 5,
		alignItems: 'center',
		fontFamily: 'Aeonik-Medium',
		color: '#f28d28',
		letterSpacing: 0.5,
		fontSize: 15
	},
	articleDate: {
		marginLeft: 5,
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#989898',
		fontSize: 15
	},
	content: {
		padding: 15,
		overflow: "hidden",
	},
	readMoreSection: {
		height: 150,
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 0
	}
});