import IconImage from './IconImage'
import { useRouter } from 'next/router'

export default function IconList(props) {

    const {
        items = [],
        profile = '',
        url = '',
        playVideo,
        goToProfile
    } = props

    const router = useRouter()

    return (
        <>
            { items.map((item) => {

                let trigger = () => { goToProfile(profile) }
                let icon = 'linkCircle'
                let color = 'text-arnotBlue'

                switch (item.label) {
                    case 'Board Certified':
                        icon = 'checkCircle'
                        color = 'text-black'
                        break;
                    case 'Accepting Patients':
                        icon = 'plusCircle'
                        color = 'text-arnotLightBlue'
                        break;
                    case 'Video Interview':
                        trigger = () => { playVideo(url) }
                        icon = 'playCircle'
                        color = 'text-arnotBrown'
                        break;
                    case 'Contact Me':
                        trigger = () => { router.push('/contact') }
                        icon = 'telephone'
                        color = 'text-arnotTeal'
                        break;
                    case 'See Locations':
                        trigger = () => { goToProfile(profile+'#locations') }
                        icon = 'mapCircle'
                        color = 'text-arnotRed'
                        break;
                    case 'See Reviews':
                        trigger = () => { goToProfile(profile+'#reviews') }
                        icon = 'starCircle'
                        color = 'text-arnotYellow'
                        break;
                    default:
                        break;
                }

                return (
                    <div key={item.id} onClick={trigger} className='inline-flex items-center space-x-1 hover:cursor-pointer'>
                        <IconImage icon={icon} color={color} />
                        <p className={`text-sm ${color} px-2 py-2 hover:font-bold`}>
                            {item.label}
                        </p>
                    </div>
                )
            })}
        </>
    )
}
