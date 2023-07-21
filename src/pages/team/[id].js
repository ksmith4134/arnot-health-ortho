import { getStoryblokApi, renderRichText } from '@storyblok/react'
import { useState } from 'react'
import VideoModal from '@/components/VideoModal'
import Hero from '@/components/Homepage/Hero'
import About from '@/components/Team/About'
import Timeline from '@/components/Team/Timeline'
import Credentials from '@/components/Team/Credentials'
import Testimonials from '@/components/widgets/Testimonials'
import GoogleMapDuex from '@/components/widgets/GoogleMapDuex'
import VideoFullWidth from '@/components/VideoFullWidth'
import Section from '@/components/Shared/Section'

export default function Person(props) {
    
    const {
        hero = null,
        about = null,
        timeline = null,
        credentials = null,
        locations = null,
        reviews = null,
    } = props

    const [ videoModal, setVideoModal ] = useState(null)

    // open full screen video modal
    const openModal = (url) => {
        setVideoModal(url)
    }

    const closeModal = () => {
        setVideoModal(null)
    }

    return (
        <div className='relative z-0 mb-40'>

            { hero && <Hero openModal={openModal} {...hero} /> }
            
            <Section>

                { about && reviews && 
                    <div id='reviews'>
                        <About {...about} reviews={reviews} openModal={openModal}> 
                            { reviews.length > 0 ? <Testimonials reviews={reviews} /> : null }
                        </About>
                    </div>
                }

                { timeline && credentials &&
                    <div className='mt-12 flex flex-col md:flex-row md:justify-between'>
                        <div className='order-1 pt-24 pb-12'>
                            <Timeline timeline={timeline} />
                        </div>
                        <div className='order-2 basis-7/12 pt-12 pb-12'>
                            <Credentials credentials={credentials} />
                        </div>
                    </div>
                }

                { about && 
                    <div className='pt-24 pb-12'>
                        <VideoFullWidth {...about} openModal={openModal} />
                    </div>
                }

                { locations && 
                    <div className='pt-24 pb-12'>
                        <GoogleMapDuex locations={locations} /> 
                    </div>
                }
            </Section>
            { videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}

export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'team',
        filter_query: { doctor: { is: true }, homePage: { is: true }},
    });

    let paths = data.stories.map((team) => ({
        params: {
            id: team.slug
        }
    }))

    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const storyblokApi = getStoryblokApi();
    
    const { data } = await storyblokApi.get(`cdn/stories/team/${params.id}`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        resolve_relations: ['team.locations','team.testimonials',]
    });

    const doctor = data.story.content;

    const hero = {
        images: doctor.heroImages.map(item => item.filename),
        title: 'Dr. '+doctor.fullName,
        subTitle: doctor.shortSummary,
        icons: doctor.infoLinks.map((item, index) => ({
            id: index, label: item
        })).filter(item => item.label !== 'Learn More'),
        profile: data.story.slug,
        videoUrl: doctor.videoUrl.url,
    }

    const about = {
        fullName: doctor.fullName,
        biography: renderRichText(doctor.biography),
        url: doctor.videoUrl.url,
        videoThumbnail: doctor.videoThumbnail.filename,
    }

    const timeline = doctor.educationTimeline.map(item => ({
        achievement: item.Achievement,
        focus: item.Focus,
        institution: item.Institution,
        url: item.InstitutionUrl.url,
    }))

    const credentials = doctor.credentials.map(item => ({
        category: item.Category,
        entries: item.entry.map((item) => item.entry)
    }))

    const locations = doctor.locations.map(item => ({
        id: item.id,
        name: item.content.name,
        street: item.content.street,
        city: item.content.city,
        state: item.content.state,
        zip: item.content.zip,
    }))

    const reviews = doctor.testimonials.map(item => ({
        id: item.id,
        bodyPart: item.content.bodyPart,
        city: item.content.city,
        state: item.content.state,
        reviewerName: item.content.name,
        reviewBody: item.content.reviewBody,
        reviewTitle: item.content.reviewTitle,
        stars: item.content.stars,
    }))

    return {
        props: {
            hero,
            about,
            timeline,
            credentials,
            locations,
            reviews,
        },
        revalidate: 3600,
    }
}