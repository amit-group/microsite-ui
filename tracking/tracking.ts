/**
 * [action, target, label, category]
 */
export interface MicrositeTrackingEvents {
  toggleClick: MicrositeTrackingData;

  videoPlay: MicrositeTrackingData;
  videoReplay: MicrositeTrackingData;
  videoPause: MicrositeTrackingData;
  videoSoundOff: MicrositeTrackingData;
  videoSoundOn: MicrositeTrackingData;

  carouselClickNext: MicrositeTrackingData;
  carouselClickPrev: MicrositeTrackingData;
  carouselClickItem: MicrositeTrackingData;

  modalClickClose: MicrositeTrackingData;
  modalClickThumb: MicrositeTrackingData;

  playlistClickToggle: MicrositeTrackingData;

  minigameClickClose: MicrositeTrackingData;
}
export interface MicrositeTrackingConfig {
  label: string;
  category: string;
  events?: Partial<MicrositeTrackingEvents>;
}

export interface MicrositeTrackingData {
  action?: string;
  target?: string;
  label?: string;
  category?: string;
}

declare function gtag(event: string, eventName: string, eventData: object): void;

export class TrackingUtils {
  static SendGA(action: string, label: string, category: string) {
    try {
      gtag("event", action, {
        event_category: category,
        event_label: label,
      });
    } catch (e) {
      console.error(e);
    }
    console.log(action, { category: category, label: label });
  }
}

export default window.TrackingUtils = TrackingUtils;