import { VscBookmark } from 'react-icons/vsc'
import { BiHome, BiCloudDownload } from 'react-icons/bi'
import { useRouter } from 'next/router';


export default function Indexes(props) {

    const { indexes, selectIndex, selected } = props;

    const router = useRouter()

    return (
        <div className='w-[80%]'>
            <div className='flex justify-start items-center gap-2 mt-1'>
                <VscBookmark className='text-2xl text-arnotPeach' />
                <h4 className='font-bold text-xl text-arnotPeach'>Index</h4>
            </div>
            <ul className='ml-1.5 mt-10 border-l-2 border-arnotBrown/10'>
                {
                    indexes.map((item) => (
                        <li key={item.id} onClick={() => selectIndex(item.label)} 
                            className={`
                                block pl-3 hover:cursor-pointer my-2 py-2 text-sm 
                                ${item.label === selected 
                                    ? 'text-arnotBlue font-bold border-l-2 border-arnotBlue md:-ml-[1.5px] md:pl-[12px] lg:-ml-[2px] lg:pl-[12px]' 
                                    : 'text-gray-600 hover:font-bold hover:border-l-2 hover:border-gray-300 md:hover:-ml-[1.5px] md:hover:pl-[12px] lg:hover:-ml-[2px] lg:hover:pl-[12px]'}
                            `}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>

            <div className='mt-10 border-t'>

                <button onClick={() => router.push('/#body-diagram')} className='ml-1.5 mt-10 text-gray-600 inline-flex gap-3 items-center hover:text-arnotBlue'>
                    <BiHome className='text-2xl' />
                    <p className='text-sm'>Back to Conditions</p>
                </button>

                <button onClick={() => router.push('/all-resources')} className='ml-1.5 mt-4 text-gray-600 inline-flex gap-3 items-center hover:text-arnotBlue'>
                    <BiCloudDownload className='text-2xl' />
                    <p className='text-sm'>All Downloads</p>
                </button>
                
            </div>
        </div>
    )
}
