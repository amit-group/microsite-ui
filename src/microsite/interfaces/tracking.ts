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
