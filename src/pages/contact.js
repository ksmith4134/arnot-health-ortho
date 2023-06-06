import InfoBox from '@/components/InfoBox'
import Link from 'next/link'
import GoogleMapDuex from '@/components/widgets/GoogleMapDuex'
import { getStoryblokApi } from '@storyblok/react'
import { AiFillPhone } from 'react-icons/ai'
import LinkWrapper from '@/components/LinkWrapper'

export default function Contact(props) {
    
    const {
        locations = []
    } = props


    return (
        <div className='max-w-6xl mx-auto px-8 min-h-screen mt-20'>
            <InfoBox textSize={'medium'} richText={'<p>In case of an emergency, pelase call <b>911</b> or the Posion Control Hotline at <b>1-800-222-1222</b></p>'} />

            <div className='mt-24 flex flex-col md:flex-row md:space-x-12 justify-center items-center'>
                <div className='order-1 basis-1/2 border rounded-lg px-8 py-12 hover:bg-slate-50/50'>
                    <h2 className='font-bold text-2xl'>Contact Your Provider</h2>
                    <p className='mt-4 text-sm'>If you have any questions regarding your care, appointment schedule, or test results, please contact your provider&apos;s office directly at:</p>
                    <div className='inline-flex items-center mt-6'>
                        <AiFillPhone className='text-lg' />
                        <p className='ml-2 text-sm'>(607) 734-4110</p>
                    </div>
                </div>
                <div className='order-1 basis-1/2 border rounded-lg px-8 py-12 mt-8 md:mt-0 hover:bg-slate-50/50'>
                    <h2 className='font-bold text-2xl'>Patient Portal</h2>
                    <p className='mt-4 text-sm'>If you have questions regarding the patient portal such as how to sign up or login, please visit the link at the main Arnot website:</p>
                    <div className='mt-6'>
                        <LinkWrapper title={'Patient Portal FAQ'} url={'https://www.arnothealth.org/myarnothealth'} target={'_blank'} />
                    </div>
                </div>
            </div>

            <div className='pt-24 pb-24'>
                <GoogleMapDuex locations={locations} />
            </div>
            
        </div>
    )
}

export async function getStaticProps() {

    const storyblokApi = getStoryblokApi();
    
    const locationResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'locations',
    });

    const locations = locationResponse.data.stories.map(item => ({
        id: item.id,
        city: item.content.city,
        state: item.content.state,
        url: item.content.googleMapsURL.url,
        image: item.content.mapImage.filename,
        name: item.content.name,
        street: item.content.street,
        zip: item.content.zip,
    }))

    return {
        props: {
            locations,
        },
        revalidate: 3600,
    }
}
