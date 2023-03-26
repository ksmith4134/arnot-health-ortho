import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-openSans',
  })

storyblokInit({
    accessToken: "wVZA9BrOYAJXl3MVXh8BOQtt",
    use: [apiPlugin],
    apiOptions: { 
        region: 'us',
        cache: { type: "none" },
    }
});

export default function App({ Component, pageProps }) {

    return (
        <Layout>
            <main className={`${openSans.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </Layout>
    );
}
