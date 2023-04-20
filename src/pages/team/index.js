import { team } from '@/data/schema'
import Hero from '@/components/Homepage/Hero'
import Team from '@/components/Team/Team'
import TitleBlock from '@/components/Shared/TitleBlock'
import VideoModal from '@/components/VideoModal'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function TeamHome(props) {

    const {
        team,
        doctor,
        advancedPP
    } = props

    const router = useRouter()

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
                image={''}
                carousel={false}
                url={'#'}
            />
            <Team 
                team={doctor}  
                meetTheTeam={false} 
                openModal={openModal} 
            />
            <Team 
                team={advancedPP} 
                meetTheTeam={false} 
                title={'Advanced Practice Providers'} 
                subTitle={''}
            />
            { videoModal && <VideoModal url={videoModal} handleClick={closeModal} /> }
        </div>
    )
}

export async function getStaticProps() {

    return {
        props: {
            team,
            doctor: team.filter(item => item.doctor),
            advancedPP: team.filter(item => !item.doctor)
        }
    }
}
