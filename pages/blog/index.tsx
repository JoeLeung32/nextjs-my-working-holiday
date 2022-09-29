import type { NextPage } from 'next'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getSortedBlogArticles } from '../../lib/blog-articles'
import { Logs } from '../../types/Logs'
import Link from 'next/link'
import SearchInput from '../../components/searchInput'

export const getStaticProps: GetStaticProps = async (context) => {
    const allLogsData = await getSortedBlogArticles()
    return {
        props: {
            allLogsData,
        },
    }
}

const Blog: NextPage = ({ allLogsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Head>
                <title>Blog - MyWH</title>
            </Head>
            <h1>Blog</h1>
            <hr />
            <SearchInput />
            <hr />
            {allLogsData.length ? (
                <div>
                    <ul>
                        {allLogsData.map(({ id, date, title, slug }: Logs) => (
                            <li key={id}>
                                <Link href={`/blog/${slug}`}>
                                    <a>
                                        <strong>{title}</strong>
                                    </a>
                                </Link>
                                <div>{date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No Data</div>
            )}
        </div>
    )
}

export default Blog
