import Caver from 'caver-js'

export const config = {
  rpcURL: 'http://127.0.0.1:8551'
}

export const cav = new Caver(config.rpcURL)

export default cav