import dayjs from 'dayjs'
import fsex from 'fs-extra'
import { inspect } from 'util'
import hookStd from 'hook-std'
export function logHook(output: string) {
    const logFile = fsex.createWriteStream(output)
    hookStd.stdout({ silent: false }, (data) => {
        logFile.write(data)
    })
    // @ts-ignore
    console._log = console.log
    // @ts-ignore
    console._error = console.error
    console.log = (...args: any) => {
        process.stdout.write(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][LOG] `)
        for (const i of args) {
            process.stdout.write(typeof i === 'string' ? i : inspect(i) + ' ')
        }
        process.stdout.write('\n')
    }
    console.error = (...args: any) => {
        process.stdout.write(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][ERR] `)
        for (const i of args) {
            process.stdout.write(typeof i === 'string' ? i : inspect(i) + ' ')
        }
        process.stdout.write('\n')
    }
}