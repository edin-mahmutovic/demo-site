const i18n = require.resolve('../../config/i18n')

const linkResolver = doc => {
  const prefix = i18n[doc.lang].default ? `/` : `/${i18n[doc.lang].path}/`

  return `${prefix}${doc.uid}`
}

module.exports = linkResolver
