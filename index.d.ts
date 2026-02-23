import * as https from 'node:https';

interface ChatADyOptions {
  environment?: string;
  noDelay?: boolean;
  timeout?: number;
}

interface ChatResponse {
  status: string;
  content?: ChatContentsResponse;
}

interface ChatContentsResponse {
  status: string;
  content?: string;
}

export declare const ChatADy: (publisherId: string, key: string, inputClientOptions?: ChatADyOptions) => {
  newChat: (chatId: string, chatterId: string, entry: string, ad?: "TEXTLINK") => Promise<ChatResponse>;
};
