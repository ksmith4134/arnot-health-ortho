import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import Team2 from '@/components/Team/Team2';
import Body from '@/components/Homepage/Body';
import VideoModal from '@/components/VideoModal';
import { getStoryblokApi } from '@storyblok/react'
import TestimonialsHome from '@/components/Homepage/TestimonialsHome';
import InfoSection from '@/components/widgets/InfoSection';
import GridLayoutVideo from '@/components/widgets/GridLayoutVideo';
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
                    image={'/hero-home-1d.jpg'}
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
                    subTitle={'Find you condition below to learn about treatment options, pre- and post-operative care instructions, and much more.'}
                />
                <GridLayoutVideo 
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
                    subTitle={'Learn more about our joint health services - from conservative arthritis care to same-day, full joint replacements.'}
                    content={
                        [
                            { id: 0, title: 'Joint Services Overview', description: 'Members of the Arnot Health joint health team talk about their shared goal of treating joint pain and getting you back to doing the things you love.', videoUrl: 'https://www.youtube.com/embed/x69ivpdbqkI', image: '', asset: { component: 'Button', label: 'Find My Condition', url: '#body-diagram' } },
                            { id: 1, title: 'Who is a Candidate for Joint Replacement Surgery', description: 'Dr. Bryan Jarvis discusses who might be a candidate for joint replacement surgery, including risk factors that might affect outcomes.', videoUrl: 'https://www.youtube.com/embed/U1NhujGtwvs', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' } },
                            { id: 2, title: 'Same Day Total Joint Program', description: 'Arnot Health\'s own orthopedic surgeon, Dr. Bryan Jarvis, discusses same-day surgery options for total knee, hip, and shoulder replacement surgeries.', videoUrl: 'https://www.youtube.com/embed/REd-ow7z3rQ', image: '', asset: { component: 'Button', label: 'Find My Condition', url: '#body-diagram' } },
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
                    logos={['/logos/elmira_heights.png', '/logos/elmira_pioneers.png', '/logos/elmira_college.png', '/logos/campbell.png', '/logos/horseheads.png']}
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

    /* BODY PARTS & CONDITIONS */
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

    /* TESTIMONIALS */
    const testimonialsResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'testimonials',
        filter_query: { showOnHomepage: { is: true }},
        resolve_relations: ['testimonials.doctor',]
    });

    const testimonials = testimonialsResponse.data.stories.map((review) => {
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

    /* DOCTORS */
    const doctorsResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'team',
    });

    const doctors = doctorsResponse.data.stories.filter(item => item.content.doctor && item.content.homePage).map(item => ({
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
