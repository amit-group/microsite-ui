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
  video25Percent: MicrositeTrackingData;
  video50Percent: MicrositeTrackingData;
  video75Percent: MicrositeTrackingData;
  video100Percent: MicrositeTrackingData;

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
  eventName?: string;
  events?: Partial<MicrositeTrackingEvents>;
}

export interface MicrositeTrackingData {
  action?: string;
  target?: string;
  label?: string;
  category?: string;
  eventName?: string;
}

declare function gtag(event: string, eventName: string, eventData: object): void;

export class TrackingUtils {
  static SendGA(action: string, label: string, category: string, eventName: string = "select_content") {
    try {
      if (process.env.UNIVERSAL_ANALYTICS && process.env.UNIVERSAL_ANALYTICS === "TRUE") {
        gtag("event", action, {
          event_category: category,
          event_label: label,
        });
        console.log("Universal Analytics: ", action, { category: category, label: label });
      }

      if (process.env.GOOGLE_ANALYTICS_4 && process.env.GOOGLE_ANALYTICS_4 === "TRUE") {
        gtag("event", eventName, {
          content_type: `${category}__${label}__${action}`,
        });
        console.log("Google Analytics 4: ", `select_content. `, `Content Type: ${category}__${label}__${action}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default window.TrackingUtils = TrackingUtils;
