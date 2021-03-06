'use strict'

const Hapi = require('@hapi/hapi')
const routes = require('./routes')

/**
 * Creates an instance of Server.
 * @class
 */
class Server {
  /**
   * @constructor
   * @param {Object} options
   * @param {number} [options.port=43134] - Server port.
   * @param {function} createFactory
   */
  constructor (options, createFactory) {
    options = options || { port: 43134 }

    this.server = null
    this.port = options.port
    this.createFactory = createFactory
  }

  /**
   * Start the server
   *
   * @returns {Promise<Hapi.Server>}
   */
  async start () {
    this.server = new Hapi.Server({
      port: this.port,
      host: 'localhost',
      routes: {
        cors: true
      }
    })

    routes(this.server, this.createFactory)

    await this.server.start()
    return this.server
  }

  /**
   * Stop the server
   *
   * @param {object} [options] - {@link https://hapi.dev/api/?v=18.4.0#-await-serverstopoptions Hapi docs}
   * @returns {Promise}
   */
  stop (options) {
    return this.server.stop(options)
  }
}

module.exports = Server
