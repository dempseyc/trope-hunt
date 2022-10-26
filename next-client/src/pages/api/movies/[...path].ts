import httpProxy from 'http-proxy'

const API2_URL = process.env.REACT_APP_API2_URL
const proxy = httpProxy.createProxyServer()
// Make sure that we don't parse JSON bodies on this route:

export const config = {
    api: {
        bodyParser: false
    }
}
const proxyInit = (req, res) => {
    proxy.web(req, res, { target: API2_URL, changeOrigin: true })
}

export default proxyInit