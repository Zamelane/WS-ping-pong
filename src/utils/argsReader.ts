import type { IArg, ISearchArg } from "../interfaces"


export default (args: ISearchArg[]) => {
    const argsValues: IArg = {}
    const parg = process.argv

    for (let i = 0; i < parg.length; i++) {

        for (let j = 0; j < args.length; j++) {
            const currArg = args[j]
            const names = currArg.otherNames.concat(currArg.defaultName)

            for (let t = 0; t < names.length; t++){
                const checkParg = parg[i].toLowerCase()
                const findArg = `${names[t].length == 1 ? '-' : '--'}${names[t]}`.toLowerCase()
                
                if (checkParg === findArg) {
                    argsValues[currArg.defaultName] = (typeof currArg.defaultValue === 'boolean' ? true : parg[++i])
                    break
                }
            }

            let checkFound = argsValues[currArg.defaultName]

            argsValues[currArg.defaultName] = checkFound ?? (typeof currArg.defaultValue === 'boolean' ? false : currArg.defaultValue)
        }

    }

    return argsValues
}