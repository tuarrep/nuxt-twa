import twaModule from '../src/module'

module.exports = {
  target: 'static',
  srcDir: __dirname,
  buildModules: ['@nuxtjs/pwa', twaModule],
  twa: {
    host: 'gaming.tamerelol.com'
  }
}
