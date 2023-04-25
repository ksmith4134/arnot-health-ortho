import Link from "next/link"

export default function Timeline(props) {

    const {
        timeline
    } = props

    return (
        <div>
            <h2 className='font-bold text-2xl'>Education</h2>
            <div className='border-l-2 mt-6'>
                <div className='pl-6'>
                    { timeline.map((item, index) => (
                        <div key={index} className='first:pt-0 pt-8'>
                            <div className='inline-flex items-center relative'>
                                <div className='absolute -left-[28px] w-2 h-2 rounded-full bg-black'></div>
                                <div>{item.achievement}</div>
                                { item.focus && <div>, {item.focus}</div> }
                            </div>
                            <div className='text-arnotBlue hover:underline hover:underline-offset-4'>
                                <Link className='mt-0' target='_blank' href={item.url}>
                                    {item.institution}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
