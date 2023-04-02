import ProfilePic from '../ProfilePic'
import Icon from '../Shared/Icon'
import Link from 'next/link'

export default function Team(props) {

    const {
        title = 'Meet Your Physicians',
        team = [
            {
                id: 0, 
                profilePic: '/profilePics/bryan_square.jpg', 
                name: 'Bryan Jarvis', 
                title: 'DO', 
                school: 'SUNY Upstate Medical University', 
                shortSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
                bulletPoints:[
                    {id: 0, icon: 'checkCircle', label: 'Board Certified', color: 'text-black', trigger: () => {}, url: ``},
                    {id: 1, icon: 'playCircle', label: 'Video Interview', color: 'text-arnotBrown', trigger: () => {}, url: ``},
                    {id: 2, icon: 'linkCircle', label: 'Learn More', color: 'text-arnotBlue', trigger: () => {}, url: `/team/[id]`},
                ]
            },
            {
                id: 1, 
                profilePic: '/profilePics/jae_square.jpg', 
                name: 'Jaewon Chang', 
                title: 'DO', 
                school: 'SUNY Upstate Medical University', 
                shortSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
                bulletPoints:[
                    {id: 0, icon: 'checkCircle', label: 'Board Certified', color: 'text-black', trigger: () => {}, url: ``},
                    {id: 1, icon: 'playCircle', label: 'Video Interview', color: 'text-arnotBrown', trigger: () => {}, url: ``},
                    {id: 2, icon: 'linkCircle', label: 'Learn More', color: 'text-arnotBlue', trigger: () => {}, url: `/team/[id]`},
                ]
            },
            {
                id: 2, 
                profilePic: '/profilePics/jared_square.jpg', 
                name: 'Jared Smith', 
                title: 'MD', 
                school: 'SUNY Upstate Medical University', 
                shortSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
                bulletPoints:[
                    {id: 0, icon: 'checkCircle', label: 'Board Certified', color: 'text-black', trigger: () => {}, url: ``},
                    {id: 1, icon: 'playCircle', label: 'Video Interview', color: 'text-arnotBrown', trigger: () => {}, url: ``},
                    {id: 2, icon: 'linkCircle', label: 'Learn More', color: 'text-arnotBlue', trigger: () => {}, url: `/team/[id]`},
                ]
            },
        ]
    } = props

    return (
        <div className='max-w-5xl mx-auto px-8 py-36'>
            <h1 className='mt-6 text-4xl font-bold text-center'>{title}</h1>
            <div className={`
                mt-8 grid grid-cols-1
                ${team.length % 2 === 0 
                    ? 'sm:grid-cols-2' 
                    : 'sm:grid-cols-2 lg:grid-cols-3'}
            `}>
                {
                    team.map(person => (
                        <div key={person.id} className='mt-16 w-2/3 mx-auto space-y-6 flex flex-col items-center sm:items-start'>
                            <ProfilePic url={person.profilePic} />
                            <div className='text-center sm:text-left'>
                                <h3 className='text-md font-bold'>{person.name + ', ' + person.title}</h3>
                                <p className='mt-1 text-sm font-light'>{person.school}</p>
                            </div>
                            <p className='text-sm text-center sm:text-left line-clamp-4'>{person.shortSummary}</p>
                            <div className='flex flex-col space-y-3'>
                                {
                                    person.bulletPoints.map(point => (
                                            <div key={point.id} className='inline-flex items-center space-x-2'>
                                                <Icon icon={point.icon} color={point.color} />
                                                <p className={`text-sm ${point.color}`}>{point.label}</p>
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <Link href={'/team'} className='mt-24 text-arnotBlue underline underline-offset-4 text-sm flex justify-center'>Meet the Whole Team</Link>
        </div>
    )
}
