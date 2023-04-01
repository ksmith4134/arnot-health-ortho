import Link from 'next/link'
import { RxArrowRight } from 'react-icons/rx'

export default function ButtonPrimary(props) {

    const {
        label = 'Learn More',
        url,
        // handleClick = () => console.log('Button clicked...')
    } = props

    return (
        <Link href={url}>
            <button className='bg-arnotBlue rounded-sm px-6 py-3 text-white text-md flex justify-center items-center group hover:shadow-lg transition ease-in-out duration-300'>
                <div>{label}</div>
                <RxArrowRight className='text-xl text-white ml-2 group-hover:translate-x-1 transition ease-in-out duration-300' />
            </button>
        </Link>
    )
}
