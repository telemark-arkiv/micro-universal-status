'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { get } = require('got')
const { json, send } = require('micro')
const renderPage = require('./lib/render-page')
const formatData = require('./lib/format-data')

module.exports = async (request, response) => {
  const {pathname, query} = await parse(request.url, true)
  if (pathname === '/raw' || pathname === '/json' || pathname === '/html') {
    const data = request.method === 'POST' ? await json(request) : query
    const status = (await get(data.url, {json: true})).body
    const fields = Array.isArray(data.fields) ? data.fields : data.fields.split('|')
    const results = formatData(fields, status || {})

    if (pathname === '/raw') {
      send(response, 200, status)
    } else if (pathname === '/json') {
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Methods', 'GET')
      send(response, 200, results)
    } else if (pathname === '/html') {
      send(response, 200, renderPage(data.title, results))
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
