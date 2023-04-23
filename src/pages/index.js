import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import Team from '@/components/Team/Team';
import Body from '@/components/Homepage/Body';
import VideoModal from '@/components/VideoModal';
import { getStoryblokApi } from '@storyblok/react'
import { team } from '@/data/schema';
import TestimonialsHome from '@/components/Homepage/TestimonialsHome';

export default function Home(props) {

    const { testimonialsResponse, testimonials, accordion, doctors } = props;

    // console.log(testimonialsResponse)

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
                <Hero 
                    kicker={['Joint surgery', 'Sports medicine', 'Physical therapy']}
                    title={'Arnot Health Orthopedics'}
                    subTitle={'Our archive of resources will help guide you through your treament. Find everything from preventative care videos to pre- and post-operative educational content.'}
                    buttonLabel={'Find My Condition'}
                    image={'/HeroTest.jpg'}
                    url={'#body-diagram'}
                />
                <Team 
                    team={doctors} 
                    openModal={openModal}
                />
                <Body 
                    accordion={accordion} 
                    kicker={['Patient Resources']} 
                    title={'Learn About Your Condition'} 
                    subTitle={'Click on the dropdown menus below <span className=\'hidden md:inline\'>or the highlighted areas of the skeleton </span>to learn more about your orthopedic condition.'} 
                />
                <TestimonialsHome 
                    testimonials={testimonials} 
                    title={'Patient Testimonials'}
                />
                { videoModal && <VideoModal url={videoModal} handleClick={closeModal} /> }
            </main>
        </>
    );
}

export async function getStaticProps() {
   
    const storyblokApi = getStoryblokApi();

    let accordionResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'body',
        excluding_fields: 'indexes',
        resolve_relations: 'body.conditions',
    });

    const accordion = accordionResponse.data.stories.map((item) => {
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

    let testimonialsResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'testimonials',
        excluding_fields: 'indexes',
        filter_query: { showOnHomepage: { is: true }},
        resolve_relations: ['testimonials.doctor',]
    });

    let testimonials = testimonialsResponse.data.stories.map((review) => {
        return {
            id: review.id,
            doctor: review.content.doctor.name,
            profilePic: review.content.doctor.content.profilePic.filename,
            bodyPart: review.content.bodyPart,
            condition: review.content.condition,
            city: review.content.city,
            state: review.content.state,
            reviewerName: review.content.name,
            stars: review.content.stars,
            reviewBody: review.content.reviewBody,
            reviewTitle: review.content.reviewTitle,
        }
    })


    return {
        props: {
            testimonialsResponse,
            testimonials: testimonials ? testimonials : [],
            accordion: accordion ? accordion : [],
            doctors: team ? team.filter(item => item.doctor) : []
        },
        revalidate: 3600,
    };
}
