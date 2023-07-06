import Link from "next/link"
import IconImage from "../Shared/IconImage"
import { RxArrowRight } from 'react-icons/rx'
import { FONT_COLORS } from "../Theme"

export default function InfoCardLinks(props) {

    const {
        cards = [
            {
                id: 0,
                url: '/contact',
                icon: 'telephone',
                title: 'Contact',
                titleColor: 'teal',
                body: 'For questions regarding your condition, treatment, appointment, or test results.',
            },
            {
                id: 1,
                url: '/contact#all-locations',
                icon: 'mapCircle',
                title: 'Locations',
                titleColor: 'red',
                body: 'Each physician sees patients in one of several facilities throughout central NY.',
            },
            {
                id: 2,
                url: '#highlight-reviews',
                icon: 'starCircle',
                title: 'Reviews',
                titleColor: 'yellow',
                body: 'Check out patient testimonials for each of our orthopedic physicians.',
            }
        ]
    } = props

    return (
        <div className='border border-slate-100'>
            <div className='max-w-6xl px-8 mx-auto grid grid-cols-1 md:grid-cols-3'>
                { cards.map((item) => (
                    <Link key={item.id} href={item.url} className='py-8 md:p-12 flex flex-col justify-center hover:bg-slate-50 group'>
                        <div className='flex items-center space-x-2'>
                            <IconImage icon={item.icon} alt='icon' className='w-8'/>
                            <h4 className={`font-semibold ${FONT_COLORS[item.titleColor]}`}>{item.title}</h4>
                        </div>
                        <p className='mt-4 text-sm'>{item.body}</p>
                        <button className={`mt-4 text-sm inline-flex items-center group-hover:text-arnotBlue`}>
                            <div>Learn More</div>
                            <RxArrowRight className={`text-lg ml-2 group-hover:translate-x-1 transition ease-in-out duration-300`} />
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}
