import InfoBox from '@/components/InfoBox'
import { getStoryblokApi } from '@storyblok/react'
import { AiFillPhone } from 'react-icons/ai'
import LinkWrapper from '@/components/LinkWrapper'
import Section from '@/components/Shared/Section'
import Locations from '@/components/widgets/Locations'

export default function Contact(props) {
    
    const {
        locations = []
    } = props


    return (
        <Section page={true}>
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='basis-1/2 flex flex-col gap-8'>
                    <InfoBox textSize={'small'} richText={'<p>In case of an emergency, pelase call <b>911</b> or the Posion Control Hotline at <b>1-800-222-1222</b></p>'} />
                    <div className='border rounded-md px-8 py-12 bg-slate-50 shadow-md shadow-slate-50'>
                        <h2 className='font-bold text-2xl'>Contact Your Provider</h2>
                        <p className='mt-4 text-sm'>If you have any questions regarding your care, appointment schedule, or test results, please contact your provider&apos;s office directly at:</p>
                        <div className='inline-flex items-center mt-6'>
                            <AiFillPhone className='text-lg' />
                            <p className='ml-2 text-sm'>(607) 734-4110</p>
                        </div>
                    </div>
                </div>
                <div className='basis-1/2 border rounded-md px-8 py-12 flex flex-col justify-center shadow-md shadow-slate-50'>
                        <h2 className='font-bold text-2xl'>Patient Portal</h2>
                        <p className='mt-4 text-sm'>If you have questions regarding the patient portal such as how to sign up or login, please visit the link at the main Arnot Health website:</p>
                        <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-3'>
                            <div className='order-2 sm:order-1 mt-2 sm:mt-0'>
                                <LinkWrapper title={'Login'} url={'https://mycw87.ecwcloud.com/portal11583/jsp/100mp/login_otp.jsp'} target={'_blank'} />
                            </div>
                            <div className='order-1 sm:order-2 text-sm bg-slate-100 px-2 py-1 rounded'>Practice Code: <span className='font-bold'>ADGJCA</span></div>
                        </div>
                        <div className='mt-6'>
                            <LinkWrapper title={'Frequently Asked Questions'} url={'https://www.arnothealth.org/myarnothealth'} target={'_blank'} />
                        </div>
                    </div>
            </div>
            <div id='all-locations' className='mt-24 pb-24'>
                <Locations locations={locations} showContact={false} />
            </div>
        </Section>
    )
}

export async function getStaticProps() {

    const storyblokApi = getStoryblokApi();
    
    // #region FETCH Locations
    const locationResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'locations',
        sort_by: 'content.city',
    });

    const locations = locationResponse.data.stories.map(item => ({
        id: item.id,
        name: item.content.name,
        street: item.content.street,
        city: item.content.city,
        state: item.content.state,
        zip: item.content.zip,
        services: item.content.services,
    }))
    // #endregion

    return {
        props: {
            locations,
        },
        revalidate: 3600,
    }
}
