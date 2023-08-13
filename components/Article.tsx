import moment from "moment";
import { ArticleTypes } from "../types/article";
import { Text, View } from "react-native";
import { Link } from '@react-navigation/native';
import { sanitizeTitle, capitalize, slugifyText } from "../util/helper";
import ArticleStyles from "../styles/Article";

export default function (props: { isCategory: boolean, key: number, data: ArticleTypes, handleNavigation?: {(guid: string): void} }) {
	let title = sanitizeTitle(props.data.title);
	let source = capitalize(props.data.source);
	const realDate = moment(props.data.articleDate).format('ll');

	return (
		<View style={ArticleStyles.articleView}>
			{
				props.handleNavigation ?
					<Text style={ArticleStyles.articleTitle} onPress={() => props.handleNavigation ? props.handleNavigation(props.data.guid) : null}>
						{ title }
					</Text>
					:
					<Link style={ArticleStyles.articleTitle} to={{ screen: 'Article', params: { guid: props.data.guid }}}>
						{ title }
					</Link>
			}
			<View style={ArticleStyles.articleMeta}>
				<View style={{
					alignSelf: 'flex-start',
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					overflow: 'hidden'
				}}>
					<Link style={ArticleStyles.articleSource} to={{ screen: 'Publisher', params: { source: slugifyText(props.data.source), sourceTitle: source }}}>
						{ source }
					</Link>
				</View>
				<Text style={ArticleStyles.articleDate}>
					{ realDate }
				</Text>
			</View>
		</View>
	)
}