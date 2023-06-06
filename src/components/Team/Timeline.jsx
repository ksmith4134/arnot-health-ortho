import Link from "next/link"

export default function Timeline(props) {

    const {
        timeline
    } = props

    return (
        <>
            <h2 className='lg:mt-4 font-bold text-2xl'>Education</h2>
            <ol className='relative ml-1 border-l-2 mt-10'>
                { timeline.map((item, index) => (
                    <li key={index} className='mb-10 ml-6'>
                        <div className='absolute flex items-center justify-center w-2 h-2 bg-gray-800 rounded-full mt-2 -left-[4px] ring-8 ring-white'></div>
                        <div className='inline-flex items-center'>
                            <div>{item.achievement}</div>
                            { item.focus && <div>, {item.focus}</div> }
                        </div>
                        <div className='text-arnotBlue hover:underline hover:underline-offset-4'>
                            <Link className='mt-0' target='_blank' href={item.url}>
                                {item.institution}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    )
}

// return (
    //     <div>
    //         <h2 className='font-bold text-2xl'>Education</h2>
    //         <div className='border-l-2 mt-6'>
    //             <div className='pl-6'>
    //                 { timeline.map((item, index) => (
    //                     <div key={index} className='first:pt-0 pt-8'>
    //                         <div className='inline-flex items-center relative'>
    //                             <div className='absolute -left-[28px] w-2 h-2 rounded-full bg-black'></div>
    //                             <div>{item.achievement}</div>
    //                             { item.focus && <div>, {item.focus}</div> }
    //                         </div>
    //                         <div className='text-arnotBlue hover:underline hover:underline-offset-4'>
    //                             <Link className='mt-0' target='_blank' href={item.url}>
    //                                 {item.institution}
    //                             </Link>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )