import Hero from '@/components/Homepage/Hero'
import Team from '@/components/Team/Team'
import VideoModal from '@/components/VideoModal'
import { useState } from 'react'
import { getStoryblokApi } from '@storyblok/react'
import Team2 from '@/components/Team/Team2'


export default function TeamHome(props) {

    const {
        doctors,
        notDoctors,
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
        <div className='relative z-0'>
            <Hero 
                title={'It\'s what we do'}
                subTitle={'Our team of experienced orthopedic physicians and advanced practice providers are here to help you every step of the way. Learn more about our team members below.'}
                buttonLabel={'Meet the Team'}
                image={'/our-team-2.jpg'}
                carousel={false}
                url={'/team#doctors'}
            />
            <div id='doctors' className='mt-12 -mb-12'>
                <Team 
                    team={doctors}  
                    // showTitle={false}
                    title={'Orthopedic Physicians'}
                    subTitle={''}
                    meetTheTeam={false} 
                    openModal={openModal} 
                />
            </div>
            <Team 
                team={notDoctors} 
                meetTheTeam={false} 
                title={'Advanced Practice Providers'} 
                subTitle={''}
            />
            { videoModal && <VideoModal url={videoModal} handleClick={closeModal} /> }
        </div>
    )
}

export async function getStaticProps() {

    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'team',
        page: 1, 
        per_page: 100, 
    });

    const team = data.stories.map(item => ({
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
            doctors: team.filter(item => item.doctor),
            notDoctors: team.filter(item => !item.doctor)
        },
        revalidate: 3600,
    }
}
