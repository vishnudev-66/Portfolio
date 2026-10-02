export function appPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function currentAppPath(): string {
  const basePath = import.meta.env.BASE_URL
  const pathname = window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length - 1)
    : window.location.pathname

  return pathname.replace(/\/+$/, '') || '/'
}