declare global {
    interface Window {
        nostr?: {
            getPublicKey: () => Promise<string>;
            signEvent: (event: any) => Promise<any>;
        };
    }
}

// This is necessary to make the file a module and avoid TypeScript errors
export {};
