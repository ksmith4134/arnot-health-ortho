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
                <>
                    <TitleBlock
                        alignBlock={'left'}
                        title={title}
                        subTitle={subTitle}
                    />
                    { meetTheTeam && 
                        <div className='flex mt-8 justify-start'>
                            <ButtonPrimary label={'Meet the Whole Team'} url={'/team'} type={'tertiary'} />
                        </div>
                    }
                    <span className='mb-16'></span>
                </>
            }
            <div className={`my-16 grid grid-cols-1 gap-8 max-w-sm sm:max-w-full sm:gap-28
                ${team.length % 2 === 0 
                    ? 'sm:grid-cols-2' 
                    : 'sm:grid-cols-2 lg:grid-cols-3'}
            `}>
                { 
                    team.map((profile) => (
                        <div key={profile.id} className={`${showTitle && 'mt-16'} mx-auto space-y-7 flex flex-col items-start`}>
                            <ProfilePic url={profile.profilePic} />
                            <div className='text-left'>
                                <h3 className='text-md font-bold'>{profile.name + ', ' + profile.title}</h3>
                                <p className='mt-1 text-sm font-light'>{profile.school}</p>
                            </div>
                            <p className='text-sm text-left line-clamp-4'>{profile.shortSummary}</p>
                            <div className='flex flex-col space-y-1'>
                                <IconList items={profile.infoLinks} profile={profile.slug} url={profile.videoUrl} playVideo={playVideo} goToProfile={goToProfile} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
