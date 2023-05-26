import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import Team from '@/components/Team/Team';
import Body from '@/components/Homepage/Body';
import VideoModal from '@/components/VideoModal';
import { getStoryblokApi } from '@storyblok/react'
import TestimonialsHome from '@/components/Homepage/TestimonialsHome';
import InfoSection from '@/components/widgets/InfoSection';
import CardSection from '@/components/widgets/CardSection';
import Card from '@/components/widgets/Card';

export default function Home(props) {

    const { 
        testimonials, 
        body, 
        doctors,
    } = props;

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
                    accordion={body} 
                    kicker={['Patient Resources']} 
                    title={'Learn About Your Condition'} 
                    subTitle={'Click on the dropdown menus below <span className=\'hidden md:inline\'>or the highlighted areas of the skeleton </span>to learn more about your orthopedic condition.'} 
                />
                <InfoSection 
                    card={true}
                    title={'Prepare for Surgery'}
                    subTitle={'You and your caregivers can review the resources below before your treatment so you feel prepared for the big day'}
                    content={
                        [
                            { id: 0, title: 'Same Day Surgery Tour', description: 'In this brief video, Arnot Health orthopedic surgeons Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.', videoUrl: 'https://www.youtube.com/embed/x_1UusZhMFM', image: '/Same Day Surgery Tour.jpg', asset: { component: 'Download', title: 'What to Expect', download: '/'}}
                        ]
                    }
                    downloads={[
                        {id: 0, title: 'Pre-Operative Preparation', url: '/'},
                        {id: 1, title: 'Pain Management Instructions', url: '/'},
                        {id: 2, title: 'Discharge Preparation Checklist', url: '/'},
                        {id: 3, title: '10 Joint Surgery Recovery Tips', url: '/'},
                    ]}
                    openModal={openModal}
                />
                {/* <CardSection 
                    background={'gray'} 
                    topMargin={'none'}
                    title={'Prepare for Surgery'}
                    subTitle={'You and your caregivers can review the resources below before your treatment so you feel prepared for the big day'}
                    videoUrl={'https://www.youtube.com/embed/x_1UusZhMFM'}
                    videoThumbnail={'/Same Day Surgery Tour.jpg'}
                    downloads={[
                        {id: 0, title: 'Pre-Op Preparation', url: '/'},
                        {id: 1, title: 'Pain Management', url: '/'},
                        {id: 2, title: 'Discharge Checklist', url: '/'},
                        {id: 3, title: 'Recovery Tips', url: '/'},
                    ]}
                    openModal={openModal}
                /> */}
                <InfoSection
                    card={true}
                    title={'Joint Health Services'}
                    subTitle={'Learn more about our joint health services - from conservative care to same-day, full joint replacements'}
                    content={
                        [
                            { id: 0, title: 'Joint Services Overview', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', videoUrl: 'https://www.youtube.com/embed/x69ivpdbqkI', image: '', },
                            { id: 1, title: 'Who is a Candidate for Joint Replacement Surgery', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', videoUrl: 'https://www.youtube.com/embed/U1NhujGtwvs', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' } },
                            { id: 2, title: 'Same Day Total Joint Program', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', videoUrl: 'https://www.youtube.com/embed/REd-ow7z3rQ', image: '', },
                        ]
                    }
                    body={body}
                    openModal={openModal}
                />
                <Card
                    kicker={'Sports Medicine'}
                    title={'This is a Sports Medicine Intro Video from Arnot'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    logos={[]}
                    videoUrl={'https://www.youtube.com/embed/6EKOCDdNjvg'}
                    videoThumbnail={'/sports_medicine_kayak.png'}
                    handleClick={openModal}
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

    const bodyResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'body',
        excluding_fields: 'indexes',
        resolve_relations: 'body.conditions',
    });

    const body = bodyResponse.data.stories.map((item) => {
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


    const { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'testimonials',
        filter_query: { showOnHomepage: { is: true }},
        resolve_relations: ['testimonials.doctor',]
    });

    const testimonials = data.stories.map((review) => {
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

    const doctors = data.rels.map(item => ({
        id: item.id,
        doctor: item.content.doctor,
        profilePic: item.content.profilePic.filename,
        name: item.content.fullName,
        title: item.content.degree,
        school: item.content.degreeUniversity,
        shortSummary: item.content.shortSummary,
        infoLinks: item.content.infoLinks.map((item, index) => ({
            id: index, label: item
        })).slice(0,3),
        slug: item.slug,
        videoUrl: item.content.videoUrl.url,
    }))


    return {
        props: {
            body: body ? body : [],
            testimonials: testimonials ? testimonials : [],
            doctors: doctors ? doctors : [],
        },
        revalidate: 3600,
    };
}
