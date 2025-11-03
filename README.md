# ChatADy Package for Node.js

The `ChatADy` package is a Node.js wrapper for the ChatADy API, designed to facilitate easy interaction with ChatADy's services from Node.js applications. It offers methods to send in messages and retrieve AD content.

## Installation

You can install the ChatADy package using npm:

```bash
npm install chatady-node
```

Or using yarn:

```bash
yarn add chatady-node
```

## Usage

Import the `ChatADy` class from the package and initialize it with your publisher ID and key to start interacting with the ChatADy API.

### Quick Start

Below is a quick example to help you get started:

```javascript
import { ChatADy } from 'chatady-node';

// Initialize the ChatADy client
const client = new ChatADy('your_publisher_id', 'your_api_key');

// Send in chat message & retrieve ADs
client.newChat('unique_id_conversation', 'unique_id_speaker', 'speaker_message', 'request_ad_type')
  .then(response => console.log(response))
  .catch(error => console.error(error));

```

### Initializing the Client

To interact with the API, create an instance of `ChatADy`:

```javascript
const client = new ChatADy('your_publisher_id', 'your_api_key');
```

You can also pass additional options as the third argument to configure the client:

```javascript
const options = { environment: 'production', noDelay: true, timeout: 1000 };
const client = new ChatADy('your_publisher_id', 'your_api_key', options);
```

### Sending in a new chat message

To send in new chat message, use the `newChat` method with the chat ID, speaker ID and speaker message

```javascript
client.newChat('conversation_id_1', 'speaker_id_1', 'Hello, ChatADy!')
  .then(() => console.log('New chat message stored'))
  .catch(error => console.error(error));
```

### Sending in a new chat message & retrieve AD content

To retrieve AD, use the `newChat` method with the chat ID, speaker ID, speaker message and AD type (`PPC-TEXTLINK`, `PPV-TEXT`, `PPS-VOICE`)

```javascript
client.newChat('conversation_id_1', 'speaker_id_1', 'Hello, ChatADy!', 'PPC-TEXTLINK')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
