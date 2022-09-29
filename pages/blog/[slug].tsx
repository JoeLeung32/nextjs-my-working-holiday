import type { NextPage } from 'next'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import search from '../../search.json'
import path from 'path'
import { LogDirectoryPath } from '../../types/Logs'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'

type Props = {
    params?: {
        slug: string
    } | any
}

const logDirectory = path.join(process.cwd(), LogDirectoryPath)

export const getStaticPaths: GetStaticPaths = async () => {
    const slugList = search.map(md => {
        return {
            params: {
                slug: md.slug,
            },
        }
    })
    return {
        paths: slugList,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }: Props) => {
    const matchedItem = search.find(item => item.slug === slug)
    const markdownWithMeta = fs.readFileSync(
        `${logDirectory}${matchedItem?.mdPath}`,
        'utf-8',
    )
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
        props: {
            slug,
            frontmatter,
            content,
        },
    }
}

const Blog: NextPage = ({ slug, frontmatter, content }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Head>
                <title>{`${frontmatter.title} - Blog - MyWH`}</title>
            </Head>
            <h1>{frontmatter.title}</h1>
            <div><small>{frontmatter.date}</small></div>
            <article dangerouslySetInnerHTML={{ __html: marked.parse(content) }}>
            </article>
        </div>
    )
}

export default Blog
