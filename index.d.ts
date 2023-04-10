declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.mp4';

declare function gtag(event: string, eventName: string, eventData: object): void;

declare interface Navigator {
  msMaxTouchPoints: number;
}