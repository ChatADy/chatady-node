const https = require('node:https')

export const ChatAdy = (publisherId, key, inputClientOptions = {}) => {

  const hostname = 'backend.chatady.com'
  const port = 443
  const prepath = '/api/v1'
  const clientOptions = Object.assign({
    environment: 'production',
    noDelay: true,
    timeout: 1000
  }, inputClientOptions)

  return {
    getContents: async (chatId, options = {humansex: undefined, botsex: undefined}) => {
      let query = '?'
      if (options.humansex) {
        query = query + 'humansex=' + options.humansex + '&'
      }
      if (options.botsex) {
        query = query + 'botsex=' + options.botsex
      }
      return new Promise((resolve, reject) => {
        const options = {
          hostname,
          port,
          path: `${prepath}/${clientOptions.environment === 'production' ? 'contents' : 'test-contents'}/${publisherId}/${chatId}${query}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
        req.end();
      });
    },
    newChat: async (chatId, entry, human) => {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
          human,
          entry
        });
        const options = {
          hostname,
          port,
          path: `${prepath}/${clientOptions.environment === 'production' ? 'chats' : 'test-chats'}/${publisherId}/${chatId}`,
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
            resolve();
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
