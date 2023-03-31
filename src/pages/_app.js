import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storyblokInit, apiPlugin } from "@storyblok/react";

storyblokInit({
    accessToken: process.env.CMS_STORYBLOK,
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
