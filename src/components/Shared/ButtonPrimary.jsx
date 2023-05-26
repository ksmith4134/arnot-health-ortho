import Link from 'next/link'
import { PRIMARY_BUTTON } from '../Theme'
import { RxArrowRight } from 'react-icons/rx'

export default function ButtonPrimary(props) {

    const {
        label = 'Learn More',
        url,
        type = 'primary',
    } = props

    const buttonType = PRIMARY_BUTTON[type]

    return (
        <Link href={url}>
            <button className={`
                ${ buttonType }
                text-md flex justify-center items-center 
                group 
                transition ease-in-out duration-300
            `}>
                <div>{label}</div>
                <RxArrowRight className={`
                    text-xl ml-2 
                    group-hover:translate-x-1 transition ease-in-out duration-300
                `} />
            </button>
        </Link>
    )
}
