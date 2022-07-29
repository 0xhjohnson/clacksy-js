const { withAxiom } = require('next-axiom')

/** @type {import('next').NextConfig} */
module.exports = withAxiom({
  reactStrictMode: true,
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false
  }
})
