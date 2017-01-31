'use strict'

module.exports = (fields, data) => {
  const results = fields
    .map((field) => Object.assign({name: field, status: data[field] || 0}))

  return results
}
