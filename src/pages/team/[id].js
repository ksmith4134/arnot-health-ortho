import { getStoryblokApi, renderRichText } from '@storyblok/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import VideoModal from '@/components/VideoModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import Hero from '@/components/Homepage/Hero'
import About from '@/components/Team/About'
import Timeline from '@/components/Team/Timeline'
import Credentials from '@/components/Team/Credentials'
import LocationsWrapper from '@/components/widgets/LocationsWrapper'

export default function Person(props) {
    
    const {
        doctor, //delete
        hero,
        about,
        timeline,
        credentials,
        locations,
        reviews,
    } = props

    // console.log('Raw API Data', doctorResponse)
    console.log('Normalized Data', timeline)

    const [ loading, setLoading ] = useState(true)
    const [ videoModal, setVideoModal ] = useState(null)

    // open full screen video modal
    const openModal = (url) => {
        setVideoModal(url)
    }

    const closeModal = () => {
        setVideoModal(null)
    }

    // destructure
    // const { media, title, subTitle, icons, profile, videoUrl, } = hero;
    // const { fullName, biography, url, videoThumbnail, } = about;
    // const { achievement, focus, institution, url } = timeline;
    const {} = credentials;

    return (
        <div className='relative z-0 mb-40'>
            <Hero openModal={openModal} {...hero} />
            <About openModal={openModal} {...about} />
            <div className='flex flex-col lg:flex-row lg:justify-between max-w-5xl px-8 mx-auto'>
                <div className='order-1 py-12'>
                    <Timeline timeline={timeline} />
                </div>
                <div className='order-2 basis-6/12'>
                    <Credentials credentials={credentials} />
                </div>
            </div>
            {videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}

export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'team',
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
        })),
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
        doctor: doctor.fullName,
        profilePic: doctor.profilePic.filename,
        bodyPart: item.content.bodyPart,
        city: item.content.city,
        state: item.content.state,
        condition: item.content.condition,
        reviewerName: item.content.name,
        reviewBody: item.content.reviewBody,
        reviewTitle: item.content.reviewTitle,
        stars: item.content.stars,
    }))

    return {
        props: {
            doctor, // delete
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