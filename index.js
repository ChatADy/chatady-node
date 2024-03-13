const https = require('node:https')

const hostname = 'backend.chatady.com'
const port = 443
const prepath = '/api/v1'

export class ChatADy {

  publisherId = ''
  key = ''
  options = {
    environment: 'production',
    noDelay: true,
    timeout: 1000
  }
  
  constructor(publisherId, key, options = {}) {
    this.publisherId = publisherId;
    this.key = key;
    this.options = Object.assign(this.options, options)
  }

  getContents = async (chatId, options = {humansex: undefined, botsex: undefined}) => {
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
        path: `${prepath}/${this.options.environment === 'production' ? 'contents' : 'test-contents'}/${this.publisherId}/${chatId}${query}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.key
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
      req.setNoDelay(this.options.noDelay)
      req.setTimeout(this.options.timeout)
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        resolve(false);
      });
      req.end();
    });
  }

  newChat = async (chatId, entry, human) => {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        human,
        entry
      });
      const options = {
        hostname,
        port,
        path: `${prepath}/${this.options.environment === 'production' ? 'chats' : 'test-chats'}/${this.publisherId}/${chatId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'Authorization': this.key
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
      req.setNoDelay(this.options.noDelay)
      req.setTimeout(this.options.timeout)
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        resolve();
      });
      req.write(postData);
      req.end();
    });
  }

}
