import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import Team from '@/components/Team/Team';
import Team2 from '@/components/Team/Team2';
import Body from '@/components/Homepage/Body';
import VideoModal from '@/components/VideoModal';
import { getStoryblokApi } from '@storyblok/react'
import TestimonialsHome from '@/components/Homepage/TestimonialsHome';
import InfoSection from '@/components/widgets/InfoSection';
import InfoSection2 from '@/components/widgets/InfoSection2';
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
                <Team2 
                    team={doctors} 
                    openModal={openModal}
                />
                <Body 
                    accordion={body}
                    kicker={['Patient Resources']}
                    title={'Learn About Your Condition'}
                    subTitle={'Use the diagram below to find your condition page where we list everything from symptoms and causes, to pre- and post-operative care information, and more.'}
                />
                {/* <InfoSection 
                    card={true}
                    titleSize={'large'}
                    content={
                        [
                            { id: 0, title: 'Prepare for Surgery', description: 'You and your caregivers can review the resources below before your treatment so you feel prepared for the big day. In this video, Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.', videoUrl: 'https://www.youtube.com/embed/x_1UusZhMFM', image: '', asset: { component: 'Link', title: 'See All Downloads', link: {url: '/all-resources', target: ''}}}
                        ]
                    }
                    downloads={[
                        {id: 0, title: 'Pre-Operative Preparation', url: '/'},
                        {id: 1, title: 'Pain Management Instructions', url: '/'},
                        {id: 2, title: 'Discharge Preparation Checklist', url: '/'},
                        {id: 3, title: '10 Joint Surgery Recovery Tips', url: '/'},
                    ]}
                    openModal={openModal}
                /> */}
                <InfoSection2 
                    title={'Prepare for Surgery'}
                    subTitle={'You and your caregivers can review the resources below before your treatment so you feel prepared for the big day.'}
                    downloads={[
                        {id: 0, title: 'Pre-Operative Preparation', url: '/'},
                        {id: 1, title: 'Pain Management Instructions', url: '/'},
                        {id: 2, title: 'Discharge Preparation Checklist', url: '/'},
                        {id: 3, title: '10 Joint Surgery Recovery Tips', url: '/'},
                    ]}
                    openModal={openModal}
                />
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
                    body={true}
                    openModal={openModal}
                />
                <Card
                    icon={'football'}
                    kicker={['Get back in the game']}
                    title={'Sports Medicine'}
                    description={'While the seasons may change - being an athlete is a lifelong designation. We care for athletes in all phases of life - from recreational leagues and weekend warriors to collegiate and professional athletes. Let us help you get back to the activity that you love.'}
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
