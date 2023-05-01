import { getStoryblokApi, renderRichText } from '@storyblok/react'
import { useState } from 'react'
import VideoModal from '@/components/VideoModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import Hero from '@/components/Homepage/Hero'
import About from '@/components/Team/About'
import Timeline from '@/components/Team/Timeline'
import Credentials from '@/components/Team/Credentials'
import Locations from '@/components/widgets/Locations'
import TestimonialsTeam from '@/components/widgets/TestimonialsTeam'
import GoogleMapDuex from '@/components/widgets/GoogleMapDuex'

export default function Person(props) {
    
    const {
        hero,
        about,
        timeline,
        credentials,
        locations,
        reviews,
    } = props

    const [ loading, setLoading ] = useState(true)
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
            <div className='max-w-5xl px-8 mx-auto'>
                { about && <About openModal={openModal} {...about} /> }
                { timeline[0]&& credentials[0] &&
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <div className='order-1 pt-36 pb-12'>
                            <Timeline timeline={timeline} />
                        </div>
                        <div className='order-2 max-w-xl pt-24 pb-12'>
                            <Credentials credentials={credentials} />
                        </div>
                    </div>
                }
                { reviews[0] && <TestimonialsTeam reviews={reviews} /> }
                { locations[0] && <GoogleMapDuex locations={locations} /> }
            </div>
            { videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}

export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'team',
        filter_query: { doctor: { is: true }},
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
    
    const doctorResponse = await storyblokApi.get(`cdn/stories/team/${params.id}`, {
        version: 'draft',
        resolve_relations: ['team.locations','team.testimonials',]
    });

    const doctor = doctorResponse.data.story.content;

    const hero = {
        media: doctor.heroImages.map((img) => ({
            id: img.id, url: img.filename
        })),
        title: 'Dr. '+doctor.fullName,
        subTitle: doctor.shortSummary,
        icons: doctor.infoLinks.map((item, index) => ({
            id: index, label: item
        })).filter(item => item.label !== 'Learn More'),
        profile: doctorResponse.data.story.slug,
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
        city: item.content.city,
        state: item.content.state,
        url: item.content.googleMapsURL.url,
        image: item.content.mapImage.filename,
        name: item.content.name,
        street: item.content.street,
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