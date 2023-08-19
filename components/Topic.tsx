import { capitalize, slugifyText } from "../util/helper";
import { Link } from "@react-navigation/native";
import { View, ScrollView } from "react-native";

export default function Topic (props: {tags: string[]}) {
	return (
		<View style={{flexDirection: "row", flexWrap: "nowrap"}}>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				{
					props.tags
						.map((tag: string, index: number) => (
							<View key={index} style={{
								alignSelf: 'flex-start',
								borderTopRightRadius: 20,
								borderTopLeftRadius: 20,
								borderBottomLeftRadius: 20,
								borderBottomRightRadius: 20,
								marginRight: 10,
								overflow: 'hidden'
							}}>
								<Link style={{
									fontFamily: 'Moderat-Bold',
									color: '#fdc006',
									backgroundColor: '#1c1c1c',
									borderRadius: 10,
									paddingTop: 3,
									paddingBottom: 3,
									paddingLeft: 8,
									paddingRight: 8,
									fontSize: 13
								}} to={{ screen: 'Topic', params: { topic: slugifyText(tag), topicTitle: tag }}}>
									#{ capitalize(tag) }
								</Link>
							</View>
						))
				}
			</ScrollView>
		</View>

	)
}