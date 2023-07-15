import type { App } from 'vue'

const modules = import.meta.glob('./**/*', { eager: true })

export const install = (app: App<Element>) => {
  console.log(modules)
  Object.keys(modules).forEach((key) => {
    const name = key.replace(/(.*\/)*([^.]+)/gi, '$2')
    const type = key.replace(/^\.\/([\w-]+).*/gi, '$1')
    const module: any = modules[key]
    if (module.default) {
      switch (type) {
        case 'directives':
          app.directive(name, module.default)
          break
        case 'plugins':
          typeof module.default === 'function' && module.default(app)
          break
      }
    }
  })
}
