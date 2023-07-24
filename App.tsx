import Layout from "./components/Layout";
import Article from "./components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import { ArticleTypes } from "./types/article";
import {StyleSheet, Text, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Base from "./styles/Base";

SplashScreen.preventAutoHideAsync().then(() => { return null; });

export default function App() {
    const [articles, setArticles] = useState<ArticleTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        'Poly-Sans-Slim': require('./assets/localWebFonts/polysans-slim.otf'),
        'Poly-Sans-Slim-Italic': require('./assets/localWebFonts/polysans-slim-italic.otf'),
        'Poly-Sans-Neutral': require('./assets/localWebFonts/polysans-neutral.otf'),
        'Poly-Sans-Median': require('./assets/localWebFonts/polysans-median.otf'),
        'Poly-Sans-Median-Italic': require('./assets/localWebFonts/polysans-median-italic.otf')
    });

    useEffect(() => {
        fetch('https://api.dailyscoop.africa/article')
            .then(async (res) => {
                const articles: ArticleTypes[] = await res.json();
                setArticles(articles);
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                }
            });
    }, [fontsLoaded]);

    return (
        <View>
            <Layout category={null} >
                <View>
                    <Text style={Base.headingText}>All articles</Text>
                </View>
                <View style={styles.wrapper}>
                    {
                        articles
                            .map((article: ArticleTypes, index: number) => (
                                <Article isCategory={ false } key={ index } data={ article } />
                            ))
                    }
                </View>
                <StatusBar style="auto" />
            </Layout>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
});
