import Caver from 'caver-js'

export const config = {
  rpcURL: 'http://5d7b917b.ngrok.io'
}

export const cav = new Caver(config.rpcURL)

export default cav