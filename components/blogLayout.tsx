import type { NextPage } from 'next'
import { ReactNode } from 'react'
import SearchInput from './searchInput'
import Head from 'next/head'

type Props = {
    title?: string
    children?: ReactNode
};

const BlogLayout: NextPage<Props> = ({ title, children }) => {
    if (!title) title = ''
    return (
        <div>
            <Head>
                <title>{`${title}Blog - MyWH`}</title>
            </Head>
            <h1>Blog</h1>
            <hr />
            <SearchInput />
            <hr />
            {children}
        </div>
    )
}

export default BlogLayout
