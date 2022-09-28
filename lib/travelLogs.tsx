import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const logDirectory = path.join(process.cwd(), 'pages/travelLogs')

export const getSortedPostsData = () => {
    // Get file names under /posts
    const fileNames = fs.readdirSync(logDirectory)
    const allLogsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(logDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        }
    })

    // Sort posts by date
    return allLogsData.sort(({ date: a }: any, { date: b }: any) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}
