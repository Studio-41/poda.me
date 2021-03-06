const port = process.env.PORT || 3000
const protocol = process.env.PROTOCOL || 'http'
const host = process.env.PUBLIC_HOST || `localhost:3000`
const storagePath = process.env.STORAGE_PATH || './storage'
const PUBLIC_URL = `${protocol}://${host}`

const { createHash } = require('crypto')
const { writeFile, readFile, existsSync, mkdirSync } = require('fs')
const { createServer } = require('http')
const urlParser = require('url').parse
const { normalize } = require('path')

const processRequest = async (value) => {
  if (!value) {
    throw Error('url is required. Pass it using query string or body')
  }
  const hash = createHash('sha256').update(value).digest('hex')
  const path = hash.substring(0, 6)
  const publicUrl = `${host}/${path}`.replace(/\/\//g, '/')
  const key = createHash('sha256').update(publicUrl).digest('hex')

  await storage.set(key, value)

  return `${protocol}://${publicUrl}`
}

const contentType = 'application/json'

const storage = {
  init: () => {
    if (!existsSync(storagePath)) {
      mkdirSync(storagePath, { recursive: true })
    }
  },
  set: async (key, value) =>
    new Promise((resolve, reject) => {
      writeFile(`${storagePath}/${key}`, value, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }),
  get: async (publicUrl) =>
    new Promise((resolve, reject) => {
      const key = createHash('sha256').update(publicUrl).digest('hex')
      readFile(`${storagePath}/${key}`, {encoding: 'utf8'}, (err, data) => {
        if (err) {
          reject(err)
        }
        let url = data
        if (!data.startsWith('http')) {
          url = `http://${data}`
        }

        resolve(url)
      })
    }),
}

const create = async (req, res) => {
  try {
    const url = await processRequest(urlParser(req.url, true).query.url)

    res.writeHead(200, {
      'Content-Type': contentType,
    })
    res.write(
      JSON.stringify({
        url,
      }),
    )
    res.end()
  } catch (error) {
    res.writeHead(200, { 'Content-Type': contentType })
    res.write(JSON.stringify({ error: error.message }))
    res.end()
  }
}

const read = async (req, res) => {
  try {
    const publicUrl = `${req.headers.host}/${req.url}`.replace(/\/\//g, '/')
    const url = await storage.get(publicUrl)

    res.writeHead(301, { Location: url })
    res.end()
  } catch (error) {
    console.log(error.message)
    await render(req, res)
  }
}

let indexHtml = ''

const loadHtml = () =>
  new Promise((resolve, reject) => {
    if (indexHtml) {
      resolve()
      return
    }

    readFile('./index.html', { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject(err)
      }
      indexHtml = data.replace(/{{PUBLIC_URL}}/g, PUBLIC_URL)
      resolve()
    })
  })

const render = async (req, res) => {
  await loadHtml()
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(indexHtml)
  res.end()
}

const assets = (req, res) => {
  let filePath = ''
  try {
    filePath = decodeURIComponent(`${__dirname}${req.url}`)
  } catch (error) {
    res.writeHead(400)
    res.end(JSON.stringify({ error: `Invalid path, ${error.message}` }))
    return
  }

  if (~filePath.indexOf('\0')) {
    res.writeHead(400)
    res.end(JSON.stringify({ error: 'Invalid path' }))
    return
  }

  filePath = normalize(filePath)

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    }
    res.writeHead(200)
    res.end(data)
  })
}

const router = async (req, res) => {
  if (req.method === 'POST') {
    await create(req, res)
    return
  } else if (req.method === 'GET') {
    if (req.url.startsWith('/assets')) {
      assets(req, res)
      return
    } else if (req.url.length === 7 && req.url.startsWith('/')) {
      await read(req, res)
    } else if (req.url === ('/robots.txt')) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('User-agent: *\nAllow: /index.html\nDisallow: /')
    } else {
      await render(req, res)
    }
    return
  } else {
    res.writeHead(405, { 'Content-Type': contentType })
    res.write({ error: 'Method not allowed' })
    res.end()
    return
  }
}

void (async () => {
  try {
    storage.init()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  const server = createServer(router)

  server.listen(port)
  console.log(`Server running at http://localhost:${port}/, exposed at http://${host}/`)
})()
