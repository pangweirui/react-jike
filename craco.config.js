const path = require('path')
const { getPlugin, pluginByName, whenProd } = require('@craco/craco')

const reactVersion = require('react/package.json').version
const reactDomVersion = require('react-dom/package.json').version

function hasUmdBuild(packageName, fileName) {
  const packageDir = path.dirname(require.resolve(`${packageName}/package.json`))
  return require('fs').existsSync(path.join(packageDir, 'umd', fileName))
}

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      const cdn = {
        js: []
      }

      whenProd(() => {
        const canUseReactUmd =
          hasUmdBuild('react', 'react.production.min.js') &&
          hasUmdBuild('react-dom', 'react-dom.production.min.js')

        if (canUseReactUmd) {
          webpackConfig.externals = {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-dom/client': 'ReactDOM'
          }

          cdn.js = [
            `https://unpkg.com/react@${reactVersion}/umd/react.production.min.js`,
            `https://unpkg.com/react-dom@${reactDomVersion}/umd/react-dom.production.min.js`
          ]
        }
      })

      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        match.options.files = cdn
        match.userOptions.files = cdn
      }

      return webpackConfig
    }
  }
}
