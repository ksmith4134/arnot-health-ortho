import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getStoryblokApi, renderRichText } from '@storyblok/react'
import IndexesDesktop from '@/components/IndexesDesktop'
import IndexesMobile from '@/components/IndexesMobile'
import ConditionHeader from '@/components/ConditionHeader'
import VideoModal from '@/components/VideoModal'
import { COMPONENTS } from '@/components/Theme'
import LoadingSpinner from '@/components/LoadingSpinner'


export default function Condition(props) {

    const { 
        params, 
        indexes, 
        conditionHeader, 
        page = null,
    } = props

    const router = useRouter()

    const [ index, setIndex ] = useState(null)
    const [ openMobileIndex, setOpenMobileIndex ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ videoModal, setVideoModal ] = useState(null)

    // When page is done loading, set the index using the URL query param
    useEffect(() => {
        router.isReady && setIndex(router.query.index)
    }, [router])

    // Set loading to false after a new index has been selected
    useEffect(() => {
        setLoading(false)
    }, [index])

    const handleIndexClick = (index) => {
        setOpenMobileIndex(false)
        router.push(`/${params.body}/${params.condition}?index=${index}`)
    }

    const openDropdownClick = () => {
        setOpenMobileIndex(!openMobileIndex)
    }

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
            return (<></>)
        }
    }

    const layout = page.map((item) => {
        return {
            index: item.index,
            components: item.content.map((comp) => {
                return getComponent(comp)
            })
        }
    })

    return (
        <div className='relative z-0 mb-40'>
            <div className='block md:hidden sticky top-24 z-10'>
                <IndexesMobile indexes={indexes} selected={index} title={conditionHeader.title} selectIndex={handleIndexClick} openDropdownClick={openDropdownClick} opened={openMobileIndex} />
            </div>
            <div className='max-w-6xl min-h-screen my-16 mx-auto flex flex-row md:space-x-10 items-start px-8'>
                <div className='hidden md:block md:basis-3/12 sticky top-8 flex-none'>
                    <IndexesDesktop indexes={indexes} selected={index} selectIndex={handleIndexClick} />
                </div>
                {
                    loading 
                    ?   <div className='mt-12 w-full flex justify-center'>
                            <LoadingSpinner />
                        </div> 
                    :   <div className='md:basis-9/12'>
                            <ConditionHeader bodyPart={params.body} label={index} title={conditionHeader.title} description={conditionHeader.description} />
                            {
                                index && 
                                layout.find(item => item.index === index).components.map((component, i) => (
                                    <div key={i} className={`flex flex-col mt-16`}>
                                        { component }
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
            {videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}


export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'body',
        resolve_relations: 'body.conditions',
    });

    let paths = data.stories.map((body) => 
        body.content.conditions.map((condition) => ({
            params: {
                body: body.slug,
                condition: condition.slug
            }
        }))
    ).flat()

    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories/conditions/${params.condition}`, {
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
    });

    let condition = data.story.content

    let indexes = condition.indexes.map((item) => {
        return {
            id: item._uid,
            label: item.component
        }
    })

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
            params,
            indexes,
            conditionHeader,
            page
        },
        revalidate: 3600,
    }
}