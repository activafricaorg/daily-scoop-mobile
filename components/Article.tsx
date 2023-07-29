import moment from "moment";
import { ArticleTypes } from "../types/article";
import { StyleSheet, Text, View } from "react-native";
import { sanitizeTitle, capitalize, slugifyText } from "../util/helper";
import * as WebBrowser from 'expo-web-browser';

export default function Article (props: { isCategory: boolean, key: number, data: ArticleTypes }) {
	const realDate = moment(props.data.articleDate).format('ll');
	let title = sanitizeTitle(props.data.title);
	let source = capitalize(props.data.source);
	let sourceUrl = `/sources/${slugifyText(props.data.source)}`;

	return (
		<View style={styles.articleView}>
			<Text
				style={styles.articleTitle}
				onPress={() => WebBrowser.openBrowserAsync(props.data.url)}
			>
				{title}
			</Text>
			<View style={styles.articleMeta}>
				<Text style={styles.articleSource}>{source}</Text>
				<Text style={styles.articleDate}>{realDate}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	articleView: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 15,
		borderColor: 'rgba(243, 245, 247, 0.1)',
		marginBottom: 10,
	},
	articleTitle: {
		fontFamily: 'Moderat-Regular',
		fontSize: 19,
		color: '#dcdcdc',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15
	},
	articleMeta: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: 'rgba(243, 245, 247, 0.1)',
	},
	articleSource: {
		fontFamily: 'Moderat-Bold',
		color: '#fdc006',
		backgroundColor: '#1c1c1c',
		borderRadius: 10,
		marginRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 8,
		fontSize: 12
	},
	articleDate: {
		width: '50%',
		fontFamily: 'Moderat-Bold',
		color: '#707070',
		fontSize: 12
	}
})