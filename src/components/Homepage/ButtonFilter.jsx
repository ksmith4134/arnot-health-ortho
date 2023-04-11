import { BG_COLORS } from '../Theme'

export default function ButtonFilter(props) {

    const {
        conditionCategories,
        category,
        handleClick
    } = props

    return (
        <div className='mt-16 w-full md:w-[400px]'>
            <label className='text-sm font-semibold block md:hidden'>Filter</label>
            <div className='rounded-lg mt-1 md:mt-0 md:rounded-full border border-gray-300 p-1 bg-gray-100 md:bg-none'>
                <div className='flex flex-col md:flex-row justify-between'>
                    {
                        conditionCategories.map((item) => (
                            <div key={item.id} onClick={() => handleClick(item.id)} className={
                                `text-sm mx-px px-6 py-3 rounded-md md:rounded-full hover:cursor-pointer text-center 
                                transition ease-in duration-300
                                ${category === item.id 
                                    ? `${BG_COLORS[item.theme]} text-white` 
                                    : 'hover:bg-slate-200'}`}
                            >
                                {item.label}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
