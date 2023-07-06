import ProfilePic from '../ProfilePic'
import IconList from '../Shared/IconList'
import { useRouter } from 'next/router'
import ButtonPrimary from '../Shared/ButtonPrimary'
import TitleBlock from '../Shared/TitleBlock'
import Image from 'next/image'
import Link from 'next/link'
import IconImage from '../Shared/IconImage'
import { ICONS } from '../Theme'

export default function Team2(props) {

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
        <div className='max-w-6xl mx-auto px-8 py-24'>
            { showTitle && 
                <div className='mt-10 mb-16'>
                    <TitleBlock
                        alignBlock={'center'}
                        title={title}
                        subTitle={subTitle}
                        // kicker={['It\'s what we do']}
                        // icon={'stethoscope'}
                    />
                </div>
            }
            <div className={`my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
                { 
                    team.map((profile) => (
                        <div key={profile.id} className={`mx-auto space-y-7 flex flex-col items-start border rounded-md p-10 shadow-md shadow-slate-50 justify-self-stretch`}>
                            <ProfilePic url={profile.profilePic} />
                            <div className='text-left'>
                                <h3 className='text-md font-bold'>{profile.name + ', ' + profile.title}</h3>
                                <p className='h-8 mt-1 text-sm font-light'>{profile.school}</p>
                            </div>
                            <p className='text-sm text-left line-clamp-4'>{profile.shortSummary}</p>
                            <div className='flex flex-col space-y-1'>
                                <IconList items={profile.infoLinks} profile={profile.slug} url={profile.videoUrl} playVideo={playVideo} goToProfile={goToProfile} />
                            </div>
                        </div>
                    ))
                }
            </div>
                { meetTheTeam && 
                    <div className='mt-16 flex justify-center'>
                        <ButtonPrimary label={'Meet the Whole Team'} url={'/team'} type={'secondary'} />
                    </div>
                }
        </div>
    )
}
