import { useRouter } from 'next/router';
import { TfiAngleDown } from 'react-icons/tfi'
import { BiHome, BiCloudDownload } from 'react-icons/bi'

export default function IndexesMobile(props) {

    const { 
        indexes, 
        selectIndex, 
        selected,
        title,
        openDropdownClick,
        opened
    } = props;

    const router = useRouter()

    return (
        <div className='w-full bg-arnotBlue text-white'>
            <div className={`relative z-20 px-8 py-4 hover:cursor-pointer `} onClick={openDropdownClick}>
                <div className='text-xs font-light'>{title}</div>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold'>{selected}</div>
                    <TfiAngleDown className={`text-white text-lg ${opened ? '-rotate-180' : 'rotate-0'} transition ease-in-out duration-500`} />
                </div>
            </div>
            {
                opened && (
                    <>
                        <div className='px-8 pb-4 pt-20 absolute top-0 z-10 bg-arnotBlue w-full'>
                            <ul className='divide-y divide-white/40'>
                                {
                                    indexes.map((item) => (
                                        <li key={item.id} onClick={() => selectIndex(item.label)} className={`py-4 text-sm hover:cursor-pointer ${selected === item.label ? 'font-bold' : 'hover:font-bold'}`}>
                                            {item.label}
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className='my-4 flex flex-col'>

                                <button onClick={() => router.push('/#body-diagram')} className='mt-4 inline-flex gap-3 items-center text-white'>
                                    <BiHome className='text-2xl' />
                                    <p className='text-sm'>Back to Conditions</p>
                                </button>

                                <button onClick={() => router.push('/all-resources')} className='mt-4 inline-flex gap-3 items-center text-white'>
                                    <BiCloudDownload className='text-2xl' />
                                    <p className='text-sm'>All Downloads</p>
                                </button>
                                
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
