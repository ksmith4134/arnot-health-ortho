import { BsBook } from 'react-icons/bs'


export default function Indexes(props) {

    const { indexes, selectIndex, selected } = props;

    return (
        <div>
            <div className='flex items-center space-x-3 mt-1 mb-6 -ml-[1.5px]'>
                <h4 className='font-semibold text-2xl text-arnotPeach'>Index</h4>
                {/* <BsBook className='mt-1 text-2xl text-arnotPeach -scale-x-100' /> */}
            </div>
            <ul className='border-l-2 border-arnotBrown/10'>
                {
                    indexes.map((item) => (
                        <li key={item.id} onClick={() => selectIndex(item.label)} 
                            className={`
                                block pl-3 hover:cursor-pointer mt-4 text-sm 
                                ${item.label === selected 
                                    ? 'text-arnotBlue font-bold border-l-2 border-arnotBlue md:-ml-[1.5px] md:pl-[12px] lg:-ml-px lg:pl-[11.5px]' 
                                    : 'text-gray-600 hover:border-l-2 hover:text-black hover:border-black md:hover:-ml-[1.5px] md:hover:pl-[12px] lg:hover:-ml-px lg:hover:pl-[11.5px]'}`}>
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
