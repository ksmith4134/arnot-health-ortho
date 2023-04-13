import ProfilePic from '../ProfilePic'
import IconList from '../Shared/IconList'
import TitleBlock from '../Shared/TitleBlock'
import { useRouter } from 'next/router'
import ButtonPrimary from '../Shared/ButtonPrimary'

export default function Team(props) {

    const {
        title = 'Meet Your Physicians',
        subTitle = 'Click below to learn more about our team of experienced orthopedic physicians and advanced practice providers.',
        showTitle = true,
        meetTheTeam = true,
        team,
        openModal
    } = props

    const router = useRouter()

    const playVideo = (url) => {
        openModal(url)
    }

    const goToProfile = (id) => {
        router.push(`/team/${id}`)
    }

    return (
        <div className='max-w-5xl mx-auto px-8 py-36'>
            { showTitle && <TitleBlock title={title} subTitle={subTitle} /> }
            <div className={`mt-16 grid grid-cols-1
                ${team.length % 2 === 0 
                    ? 'sm:grid-cols-2' 
                    : 'sm:grid-cols-2 lg:grid-cols-3'}
            `}>
                {
                    team.map((profile) => (
                        <div key={profile.id} className={`${showTitle && 'mt-16'} w-2/3 mx-auto space-y-6 flex flex-col items-center sm:items-start`}>
                            <ProfilePic url={profile.profilePic} />
                            <div className='text-center sm:text-left'>
                                <h3 className='text-md font-bold -mt-2'>{profile.name + ', ' + profile.title}</h3>
                                <p className='mt-1 text-sm font-light'>{profile.school}</p>
                            </div>
                            <p className='text-sm text-center sm:text-left line-clamp-4'>{profile.shortSummary}</p>
                            <IconList items={profile.infoLinks} profile={profile.id} url={profile.videoUrl} playVideo={playVideo} goToProfile={goToProfile} />
                        </div>
                    ))
                }
            </div>
            { meetTheTeam && 
                <div className='mt-24 flex justify-center'>
                    <ButtonPrimary label={'Meet the Whole Team'} url={'/team'} invert={true} />
                </div>
            }
        </div>
    )
}
