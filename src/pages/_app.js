import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storyblokInit, apiPlugin } from "@storyblok/react";

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
            <main>
                <Component {...pageProps} />
            </main>
        </Layout>
    );
}
