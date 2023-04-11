import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import Team from '@/components/Homepage/Team';
import Body from '@/components/Homepage/Body';
import VideoModal from '@/components/VideoModal';
import { getStoryblokApi } from '@storyblok/react'

export default function Home({ accordion, data }) {

    // console.log('API response', accordion)

    const [ videoModal, setVideoModal ] = useState(null)

    // open full screen video modal
    const openModal = (url) => {
        setVideoModal(url)
    }

    const closeModal = () => {
        setVideoModal(null)
    }
    
    return (
        <>
            <Head>
                <title>Arnot Orthopedics</title>
                <meta name='description' content='Patient and Professional Resources' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='relative z-0'>
                <Hero />
                <Team />
                <Body accordion={accordion} />
                { videoModal && 
                    <VideoModal url={videoModal} handleClick={closeModal} />
                }
            </main>
        </>
    );
}

export async function getStaticProps() {
   
    const storyblokApi = getStoryblokApi();

    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'body',
        resolve_relations: 'body.conditions',
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
