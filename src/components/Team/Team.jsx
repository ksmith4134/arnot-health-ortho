import ProfilePic from '../ProfilePic'
import IconList from '../Shared/IconList'
import { useRouter } from 'next/router'
import ButtonPrimary from '../Shared/ButtonPrimary'
import TitleBlock from '../Shared/TitleBlock'

export default function Team(props) {

    const {
        showTitle = true,
        meetTheTeam = true,
        team,
        openModal,
        icon = '',
        kicker = [],
        title = 'Meet Your Physicians',
        subTitle = 'Click below to learn more about our team of experienced orthopedic physicians and advanced practice providers.'
    } = props

    const router = useRouter()

    const playVideo = (url) => {
        openModal(url)
    }

    const goToProfile = (id) => {
        router.push(`/team/${id}`)
    }

    return (
        <div className='max-w-5xl mx-auto px-8 py-24'>
            { showTitle &&  
                <TitleBlock
                    title={title}
                    subTitle={subTitle}
                />
            }
            <div className={`mt-16 grid grid-cols-1
                ${team.length % 2 === 0 
                    ? 'sm:grid-cols-2' 
                    : 'sm:grid-cols-2 lg:grid-cols-3'}
            `}>
                { 
                    team.map((profile) => (
                        <div key={profile.id} className={`${showTitle && 'mt-16'} w-9/12 mx-auto space-y-7 flex flex-col items-center sm:items-start`}>
                            <ProfilePic url={profile.profilePic} />
                            <div className='text-center sm:text-left'>
                                <h3 className='text-md font-bold'>{profile.name + ', ' + profile.title}</h3>
                                <p className='mt-1 text-sm font-light'>{profile.school}</p>
                            </div>
                            <p className='text-sm text-center sm:text-left line-clamp-4'>{profile.shortSummary}</p>
                            <div className='space-y-1'>
                                <IconList items={profile.infoLinks} profile={profile.slug} url={profile.videoUrl} playVideo={playVideo} goToProfile={goToProfile} />
                            </div>
                        </div>
                    ))
                }
            </div>
            { meetTheTeam && 
                <div className='flex mt-16 justify-center'>
                    <ButtonPrimary label={'Meet the Whole Team'} url={'/team'} invert={true} />
                </div>
            }
        </div>
    )
}
