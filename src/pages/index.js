import { getStoryblokApi } from '@storyblok/react'
import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Homepage/Hero';
import InfoCardLinks from '@/components/sections/InfoCardLinks';
import Team from '@/components/Team/Team';
import Body from '@/components/Homepage/Body';
import CardGrid from '@/components/widgets/CardGrid';
import TestimonialsHome from '@/components/Homepage/TestimonialsHome';
import VideoModal from '@/components/VideoModal';

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
                    // Make sure we select images[0] for homepage
                    // Cannot pass more than one in this array
                    // otherwise carousel controls will interfere with the InfoCardLinks component
                    images={['/hero-home-1d.jpg']} 
                    url={'#body-diagram'}
                />
                <InfoCardLinks
                    cards={[
                        { id: 0, url: '/contact', icon: 'telephone', title: 'Contact', titleColor: 'teal', body: 'For questions regarding your condition, treatment, appointment, or test results.', buttonLabel: 'Learn more'},
                        { id: 1, url: '/contact#all-locations', icon: 'mapCircle', title: 'Locations', titleColor: 'red', body: 'Each physician sees patients in one of several facilities throughout central NY.', buttonLabel: 'Learn more'},
                        { id: 2, url: '#highlight-reviews', icon: 'starCircle', title: 'Reviews', titleColor: 'yellow', body: 'Check out patient testimonials for each of our orthopedic physicians.', buttonLabel: 'Learn more'}
                    ]} 
                />
                <Team
                    team={doctors} 
                    openModal={openModal}
                />
                <Body 
                    accordion={body}
                    kicker={['Patient Resources']}
                    title={'Learn About Your Condition'}
                    subTitle={'Find you condition below to learn about treatment options, pre- and post-operative care instructions, and much more.'}
                />
                <CardGrid 
                    title={'Prepare for Surgery'}
                    subTitle={'You and your caregivers can review the resources below before your treatment so you feel prepared for the big day.'}
                    cardIcon={'hospital'}
                    cardKicker={['Hospital Tour Video']}
                    cardSubTitle={'In this video, Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.'}
                    buttonLabel={'Watch Video'}
                    videoUrl={'https://www.youtube.com/embed/Nz98Ve-KL3s'}
                    image={'/AOMC-2.jpg'}
                    downloads={[
                        {id: 0, title: 'Pre-Operative Preparation', url: '/pdf/Before Joint Surgery.pdf'},
                        {id: 1, title: 'What to Expect the Day of Surgery', url: '/pdf/What to Expect.pdf'},
                        {id: 2, title: 'Discharge Preparation Checklist', url: '/pdf/Prepare for Discharge.pdf'},
                        {id: 3, title: '10 Joint Surgery Recovery Tips', url: '/pdf/Joint Surgery Recovery.pdf'},
                    ]}
                    openModal={openModal}
                />
                <CardGrid
                    title={'Arthritis & Joint Health'}
                    subTitle={'Learn more about our joint health services - from conservative arthritis care to same-day, full joint replacements.'}
                    carousel={[
                        { id: 0, title: 'Joint Services Overview', description: 'Members of the Arnot Health joint health team talk about their shared goal of treating joint pain and getting you back to doing the things you love.', videoUrl: 'https://www.youtube.com/embed/qCfei2nAeV4', image: '/thumb-prof-1.jpg', asset: { component: 'Button', label: 'Find My Condition', url: '#body-diagram' } },
                        { id: 1, title: 'Who is a Candidate for Joint Replacement Surgery', description: 'Dr. Bryan Jarvis discusses who might be a candidate for joint replacement surgery, including risk factors that might affect outcomes.', videoUrl: 'https://www.youtube.com/embed/F_6ZiIzQ6qE', image: '/thumb-prof-2.jpg', asset: { component: 'Button', label: 'Contact Us', url: '/contact' } },
                        { id: 2, title: 'Same Day Total Joint Program', description: 'Arnot Health\'s own orthopedic surgeon, Dr. Bryan Jarvis, discusses same-day surgery options for total knee, hip, and shoulder replacement surgeries.', videoUrl: 'https://www.youtube.com/embed/VHE7hS8NSAo', image: '/team-prof-5.jpg', asset: { component: 'Button', label: 'Find My Condition', url: '#body-diagram' } },
                    ]}
                    bodyLinks={true}
                    openModal={openModal}
                />
                <CardGrid 
                    cardIcon={'football'}
                    cardKicker={['Get back in the game']}
                    cardTitle={'Sports Medicine'}
                    cardSubTitle={'While the seasons may change - being an athlete is a lifelong designation. We care for athletes in all phases of life - from recreational leagues and weekend warriors to collegiate and professional athletes. Let us help you get back to the activity that you love.'}
                    buttonLabel={'Watch Video'}
                    videoUrl={'https://www.youtube.com/embed/6nEnyI6mHAs'}
                    image={'/sports_medicine_kayak.png'}
                    logos={['/logos/elmira_heights.png', '/logos/elmira_pioneers.png', '/logos/elmira_college.png', '/logos/campbell.png', '/logos/horseheads.png']}
                    openModal={openModal}
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

    // #region FETCH Body Parts and Conditions
    const bodyResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
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
    // #endregion

    // #region FETCH Testimonials
    const testimonialsResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
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
    // #endregion

    // #region FETCH Doctors
    const doctorsResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'team',
    });

    // filter by doctor = true and showOnHomepage = true
    const doctors = doctorsResponse.data.stories.filter(item => item.content.doctor).map(item => ({
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
    // #endregion

    return {
        props: {
            body,
            testimonials,
            doctors,
        },
        revalidate: 3600,
    };
}
