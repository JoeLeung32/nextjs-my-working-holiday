import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Logs, LogDirectoryPath } from '../types/Logs'

const logDirectory = path.join(process.cwd(), LogDirectoryPath)

export const getSortedBlogArticles = async () => {
    let allLogsData: Logs[] = []
    const readFile = async (filename: string, filepath: string) => {
        const basename = filename.replace(/\.md$/, '')
        const fullPath = path.join(filepath, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const fileState = fs.statSync(fullPath)
        const matterResult = matter(fileContents)
        const dataObject: Logs = {
            id: `${basename}-${fileState.mtimeMs}`,
            slug: matterResult.data.slug || '',
            title: matterResult.data.title || '',
            date: matterResult.data.date || '1970-01-01',
            mdPath: fullPath.replace(logDirectory, ''),
        }
        return dataObject
    }
    const readDir = async (dirname: string) => {
        let fileDataList: Logs[] = []
        const fileNames = fs.readdirSync(dirname)
        for (const filename of fileNames) {
            const filepath = `${dirname}/${filename}`
            try {
                switch (true) {
                    case fs.lstatSync(filepath).isDirectory(): {
                        fileDataList = await readDir(filepath)
                        break
                    }
                    case fs.lstatSync(filepath).isFile():
                    default: {
                        const fileData = await readFile(filename, dirname)
                        fileDataList = [
                            ...fileDataList,
                            fileData,
                        ]
                        break
                    }
                }
            } catch (e) {
                console.log(`Error in readDir ${filepath}: `, e)
            }
        }
        return fileDataList
    }
    const buildSearchJson = async (data: Logs[]) => {
        if (data) {
            try {
                const jsonString = JSON.stringify(allLogsData)
                fs.writeFileSync('./search.json', jsonString)
            } catch (e) {
                console.log(`Error in Json ${logDirectory}: `, e)
            }
        }
    }
    try {
        allLogsData = await readDir(logDirectory)
        allLogsData.sort(({ date: a }: Logs, { date: b }: Logs) => a && b ? a < b ? 1 : -1 : 0)
        await buildSearchJson(allLogsData)
    } catch (e) {
        console.log(`Error in ${logDirectory}: `, e)
    }
    return allLogsData && allLogsData
}
