interface ISearchArg {
  defaultName: string
  otherNames: string[]
  defaultValue: string | number | boolean
}

interface IArg {
  [key: string]: string | number | boolean
}

export { type ISearchArg, type IArg }