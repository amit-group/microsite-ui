import { MicrositeTrackingConfig } from "./tracking";

export interface MicrositeVideoConfig {
  customControl?: boolean | {
    play?: boolean | { image: any },
    soundOff?:  boolean | { image: any },
    soundOn?:  boolean | { image: any },
    replay?:  boolean | { image: any }
  },
  tracking?: Partial<MicrositeTrackingConfig>,
}

export interface MicrositeVideoControlConfig {
  type: 'play' | 'sound-off' | 'sound-on' | 'replay',
  image?: string,
  // events?: Array<string>
}