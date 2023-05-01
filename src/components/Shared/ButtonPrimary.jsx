import Link from 'next/link'
import { RxArrowRight } from 'react-icons/rx'

export default function ButtonPrimary(props) {

    const {
        label = 'Learn More',
        url,
        invert = false,
        // handleClick = () => console.log('Button clicked...')
    } = props

    return (
        <div className='mt-10'>
            <Link href={url}>
                <button className={`
                    ${ invert 
                        ? 'bg-none text-arnotBlue hover:rounded hover:bg-arnotBlue/10' 
                        : 'bg-arnotBlue text-white hover:shadow-lg hover:shadow-arnotBlue/20'
                    }
                    rounded-sm px-6 py-4 text-md flex justify-center items-center 
                    group 
                    transition ease-in-out duration-300
                `}>
                    <div>{label}</div>
                    <RxArrowRight className={`
                        ${invert 
                            ? 'text-arnotBlue' 
                            : 'text-white'
                        }
                        text-xl ml-2 
                        group-hover:translate-x-1 transition ease-in-out duration-300
                    `} />
                </button>
            </Link>
        </div>
    )
}
