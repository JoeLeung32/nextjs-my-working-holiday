import type { NextPage } from 'next'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getSortedBlogArticles } from '../../lib/blog-articles'
import { Logs } from '../../types/Logs'
import Link from 'next/link'
import BlogLayout from '../../components/blogLayout'

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
        <BlogLayout>
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
        </BlogLayout>
    )
}

export default Blog
