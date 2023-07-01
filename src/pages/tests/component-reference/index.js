import { useState, useEffect } from 'react'
import { getStoryblokApi, renderRichText } from '@storyblok/react'
import ConditionHeader from '@/components/ConditionHeader'
import VideoModal from '@/components/VideoModal'
import { COMPONENTS } from '@/components/Theme'
import LoadingSpinner from '@/components/LoadingSpinner'

// THIS IS A TEST PAGE THAT IS
// USED TO VIEW ALL POSSIBLE COMPONENTS ON A CONDITION PAGE

export default function ComponentReference(props) {

    const { 
        condition,
        conditionHeader, 
        page = null 
    } = props

    // console.log('API Response', condition)
    // console.log('Normalized Response', page)

    const [ loading, setLoading ] = useState(true)
    const [ videoModal, setVideoModal ] = useState(null)

    useEffect(() => {
        setLoading(false)
    }, [])

    // open full screen video modal
    const openModal = (url) => {
        setVideoModal(url)
    }

    const closeModal = () => {
        setVideoModal(null)
    }

    const getComponent = (item) => {
        if(typeof COMPONENTS[item.component] !== 'undefined') {
            const Component = COMPONENTS[item.component]
            if(item.component === 'Video'){ 
                return <Component {...item} handleClick={openModal} />
            } else {
                return <Component {...item} />
            }
        } else {
            return (<div></div>)
        }
    }

    const layout = page.map((item) => {
        return {
            components: item.content.map((comp) => {
                return getComponent(comp)
            })
        }
    })

    return (
        <div className='relative z-0 mb-40'>
            <div className='max-w-6xl min-h-screen my-16 mx-auto px-8'>
                <div className='w-full lg:w-4/5 md:mr-auto'>
                    <ConditionHeader bodyPart={null} label={'Components'} title={conditionHeader.title} description={conditionHeader.description} />
                    {
                        layout[0].components.map((component, i) => (
                            <div key={i} className={`flex flex-col mt-16`}>
                                {component}
                            </div>
                        ))
                    }
                </div>
            </div>
            {videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}

export async function getStaticProps() {

    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories/index-components/components`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        resolve_relations: 'body.conditions',
    });

    let condition = data.story.content.conditions[0].content

    let conditionHeader = {
        title: condition.title,
        description: condition.shortDescription,
    }

    let page = condition.indexes.map((component) => {
        return {
            index: component.component,
            content: component.page.map((item) => {
                switch (item.component) {
                    case 'Paragraph':
                        return {
                            component: 'Paragraph',
                            id: item._uid,
                            title: item.title ? item.title : null,
                            media: item.media[0] ? item.media.map(img => img.filename) : null,
                            richText: renderRichText(item.text)
                        }
                    case 'ImageCarousel':
                        return {
                            component: 'ImageCarousel',
                            id: item._uid,
                            media: item.media[0] ? item.media.map(img => img.filename) : null,
                            title: item.title ? item.title : null,
                        }
                    case 'Resource':
                        return {
                            component: 'Resource',
                            id: item._uid,
                            label: item.title,
                            content: item.info.map((component) => {
                                switch (component.component) {
                                    case 'LinkList':
                                        return {
                                            component: 'LinkList',
                                            id: component._uid,
                                            links: component.links.map((link) => {
                                                return {
                                                    component: 'Link',
                                                    id: link._uid,
                                                    title: link.title,
                                                    url: link.url.url,
                                                    target: link.url.target ? link.url.target : "_blank"
                                                }
                                            })
                                        }
                                    case 'DownloadList': 
                                        return {
                                            component: 'DownloadList',
                                            id: component._uid,
                                            downloads: component.asset.map((download) => {
                                                return {
                                                    component: 'Download',
                                                    id: download._uid,
                                                    title: download.title,
                                                    download: download.document.filename,
                                                }
                                            })
                                        }
                                    default: return {} 
                                }
                            })

                        }
                    case 'DropdownCard': 
                        return {
                            component: 'DropdownCard',
                            id: item._uid,
                            defaultOpen: item.defaultOpen,
                            title: item.title,
                            richText: renderRichText(item.contents)
                        }
                    case 'InfoBox': 
                        return {
                            component: 'InfoBox',
                            id: item._uid,
                            richText: renderRichText(item.message)
                        }
                    case 'Video': 
                        return {
                            component: 'Video',
                            orientation: item.layout,
                            title: item.title,
                            description: renderRichText(item.description),
                            videoUrl: item.videoUrl.url,
                            image: item.Thumbnail.filename ? item.Thumbnail.filename : null,
                            asset: item.asset[0] ? {
                                component: item.asset[0].component, // Download, Link
                                title: item.asset[0].title,
                                download: item.asset[0].document ? item.asset[0].document.filename : null,
                                link: item.asset[0].url ? {
                                        url: item.asset[0].url.url ? item.asset[0].url.url : null,
                                        target: item.asset[0].url.target ? item.asset[0].url.target : "_blank"
                                }: null,
                            } : null
                        }
                    case 'Accordion':
                        return {
                            component: 'Accordion2',
                            id: item._uid,
                            title: item.title ? item.title : null,
                            contents: item.content.map((drop) => {
                                return {
                                    component: 'Dropdown',
                                    id: drop._uid,
                                    label: drop.label ? drop.label : null,
                                    content: drop.content.map((j) => {
                                        switch(j.component){
                                            case 'Paragraph':
                                                return {
                                                    component: 'Paragraph',
                                                    id: j._uid,
                                                    accordion: true,
                                                    title: j.title ? j.title : null,
                                                    media: j.media[0] ? j.media.map(img => img.filename) : null,
                                                    richText: renderRichText(j.text)
                                                }
                                            case 'DownloadList':
                                                return {
                                                    component: 'DownloadList',
                                                    id: j._uid,
                                                    accordion: true,
                                                    downloads: j.asset.map((listItem) => {
                                                        return {
                                                            component: 'Download',
                                                            id: listItem._uid,
                                                            title: listItem.title,
                                                            download: listItem.document.filename,
                                                        }
                                                    })
                                                }
                                            case 'LinkList':
                                                return {
                                                    component: 'LinkList',
                                                    id: j._uid,
                                                    accordion: true,
                                                    links: j.links.map((listItem) => {
                                                        return {
                                                            component: 'Link',
                                                            id: listItem._uid,
                                                            title: listItem.title,
                                                            url: listItem.url.url,
                                                            target: listItem.url.target ? listItem.url.target : "_blank"
                                                        }
                                                    })
                                                }
                                            default: return []
                                        }
                                    })
                                }
                            })
                        }
                    default: return [];
                }
            })
        }
    })

    return {
        props: {
            condition,
            conditionHeader,
            page
        },
        revalidate: 3600,
    }
}