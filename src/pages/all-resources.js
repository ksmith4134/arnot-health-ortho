import TitleBlock from '@/components/Shared/TitleBlock'
import { getStoryblokApi } from '@storyblok/react'


export default function ProfessionalResources(props) {

    const {
        response,
    } = props


    return (
        <div className='max-w-6xl mx-auto px-8 min-h-screen mt-12'>
            <TitleBlock alignBlock={'left'} title={'Professional Resources'} subTitle={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'} />
            <section>
                {/* FILTER */}
            </section>
            <section>

            </section>
        </div>
    )
}

export async function getStaticProps() {
   
    const storyblokApi = getStoryblokApi();

    const response = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'body',
        excluding_fields: '',
        resolve_relations: 'body.conditions',
    });

    const downloads = response.data.stories.map((item) => {
        return {
            id: item.id,
            name: item.name,

        }
    })


    return {
        props: {
            // response,
            // downloads: downloads ? downloads : [],
        },
        revalidate: 3600,
    };
}