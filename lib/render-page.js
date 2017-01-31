'use strict'

module.exports = (title, data) => {
  const results = data
    .map((line) => `<div style="font-size: 2em">${line.name}: ${line.status}</div>`)

  return `<html><body><h1 style="font-size: 3em">${title}</h1>${results.join('')}</body></html>`
}
