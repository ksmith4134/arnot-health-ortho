import { ICONS } from '../Theme'

export default function Credentials(props) {
    
    const {
        credentials
    } = props

    // category, entries = []

    const Award = ICONS['award']
    
    return (
        <div className='w-full px-8 py-12 lg:p-16 rounded-md relative z-0 min-h-[500px]
            bg-gradient-to-br from-arnotBlue/10 from-10% to-arnotBlue/20 to-80%'
        >
            <h2 className='font-bold text-2xl'>Credentials</h2>
            <Award className='z-20 absolute top-8 right-4 w-40 h-40 fill-arnotBlue/10' />
            <div className='mt-10'>
                { credentials.map((item, index) => (
                    <div key={index} className='mt-6'>
                        <div className='font-bold'>{item.category}</div>
                        { item.entries.map((item, index) => (
                            <div key={index}>{ item }</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
