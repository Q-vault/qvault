import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import FirebaseProvider from "@/lib/authContext";
import "@/lib/firebaseConfig/init";
import '@/styles/globals.css'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/src/theme';
import createEmotionCache from '@/src/createEmotionCache';
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}


function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	return (
		<FirebaseProvider>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</CacheProvider>
		</FirebaseProvider>
	);
}
export default App;