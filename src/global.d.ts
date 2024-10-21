import type { EventTemplate } from "nostr-tools";
declare global {
    interface Window {
        nostr?: {
            getPublicKey: () => Promise<string>;
            signEvent: (event: EventTemplate) => Promise<Event>;
        };
    }
}

// This is necessary to make the file a module and avoid TypeScript errors
export {};
