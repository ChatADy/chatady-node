const https = require('node:https')

const ChatADy = (publisherId, key, inputClientOptions = {}) => {

  const hostname = 'backend.chatady.com'
  const port = 443
  const prepath = '/api/v1'
  const clientOptions = Object.assign({
    environment: 'production',
    noDelay: true,
    timeout: 1000
  }, inputClientOptions)

  return {
    newChat: async (chatId, chatterId, entry, ad = undefined) => {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
          entry,
          ad
        });
        const options = {
          hostname,
          port,
          path: `${prepath}/${clientOptions.environment === 'production' ? 'chats' : 'test-chats'}/${publisherId}/${chatId}/${chatterId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': key
          }
        };
        let data = '';
        const req = https.request(options, (response) => {
          response.setEncoding('utf8');
          response.on('data', (chunk) => {
            data += chunk;
          });
          response.on('end', () => {
            resolve(data);
          });
        });
        req.setNoDelay(clientOptions.noDelay)
        req.setTimeout(clientOptions.timeout)
        req.on('error', (e) => {
          reject(`ChatADy error: ${e.message}`);
        });
        req.write(postData);
        req.end();
      });
    }
  }
}

module.exports = { ChatADy }