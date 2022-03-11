interface funcObject {
  [propName: string]: any
}

enum fileType {
  ISSCRIPT = 'script',
  ISCSS = 'style', // 样式文件
  ISMIXINS = 'mixin', // mixin
}

/**
 * webpack自动引入某一目录下js文件或者样式文件
 * @param files require.context
 * @param typeName script 表示js文件，style 表示样式文件，mixin 表示全局混入
 * @param ignores 表示忽略的文件，哪些不需要自动引入的文件，写在这里
 */
function autoImport(
  files: __WebpackModuleApi.RequireContext,
  typeName: string,
  ignores?: string[]
): any
function autoImport(files, typeName, ignores) {
  const result: unknown[] = []
  const funcObj: funcObject = {}
  files.keys().forEach(file => {
    if (typeName === fileType.ISSCRIPT) {
      const fileName: string =
        file
          ?.split('/')
          ?.pop()
          ?.replace(/\.\w+$/, '') ?? ''
      if (!ignores || ignores.indexOf(fileName) === -1) {
        const jsConfig = files(file)
        funcObj[fileName] = jsConfig?.default
      }
    } else if (typeName === fileType.ISCSS) {
      /* 引入样式文件 */
      const _tmps: string[] = file.split('/')
      if (_tmps?.length > 0) {
        if (!ignores || ignores.indexOf(_tmps[_tmps.length - 1]) !== -1)
          files(file)
      }
    } else if (typeName === fileType.ISMIXINS) {
      /* 自动混入全局（专用于vue） */
      const _tmp: string = file.split('/').slice(-2)[0]
      if (!ignores || ignores.indexOf(_tmp) !== -1) {
        result.push(files(file)?.default || files(file))
      }
    }
  })

  return typeName === fileType.ISMIXINS ? result : funcObj
}

export { autoImport }
