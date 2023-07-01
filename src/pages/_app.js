import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storyblokInit, apiPlugin } from "@storyblok/react";

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_CMS_STORYBLOK,
    use: [apiPlugin],
    apiOptions: { 
        region: 'us',
        cache: { type: "none" },
        // cache: {
        //     clear: 'auto',
        //     type: 'memory'
        // }
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
