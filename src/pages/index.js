import Head from "next/head";
import Accordion from "@/components/Accordion";
import { getStoryblokApi } from "@storyblok/react"

export default function Home({ accordion, data }) {

    // console.log('API response', accordion)
    
    return (
        <>
            <Head>
                <title>Arnot Orthopedics</title>
                <meta name="description" content="Patient and Professional Resources" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="max-w-5xl mx-auto px-8 mt-12 min-h-screen">
                <Accordion accordion={accordion} title={"All Treatments"} />
            </main>
        </>
    );
}

export async function getStaticProps() {
   
    const storyblokApi = getStoryblokApi();

    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        starts_with: "body",
        resolve_relations: "body.conditions",
    });

    const accordion = data.stories.map((item) => {
        return {
            id: item?.id,
            label: item?.name,
            contents: item?.content?.conditions.map((condition) => {
                return {
                    id: condition?.id,
                    entry: condition?.name,
                    filter: condition?.content?.arthritis,
                    link: `/${item.slug}/${condition.slug}`,
                }
            })
        }
    })


    return {
        props: {
            data, 
            accordion,
        },
        revalidate: 3600,
    };
}
