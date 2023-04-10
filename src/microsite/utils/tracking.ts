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
