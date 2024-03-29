import * as https from 'node:https';

interface ChatADyOptions {
  environment?: string;
  noDelay?: boolean;
  timeout?: number;
}

interface GetContentsOptions {
  humansex?: string;
  botsex?: string;
}

interface GetContentsResponse {
  status: string;
  message?: string;
  earnings?: string;
  content?: string
}

export declare const ChatADy: (publisherId: string, key: string, inputClientOptions?: ChatADyOptions) => {
  getContents: (chatId: string, options?: GetContentsOptions) => Promise<GetContentsResponse>;
  newChat: (chatId: string, entry: string, human: boolean) => Promise<void>;
};