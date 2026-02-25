import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(value: number | string | Date | null | undefined): string | null {
    if (value === null || value === undefined) return null;

    let tsMs: number;
    if (value instanceof Date) {
      tsMs = value.getTime();
    } else if (typeof value === 'number') {
      tsMs = this.normalizeTimestamp(value);
    } else if (typeof value === 'string') {
      const v = value.trim();
      if (/^\d+$/.test(v)) {
        tsMs = this.normalizeTimestamp(parseInt(v, 10));
      } else {
        const parsed = Date.parse(v);
        if (isNaN(parsed)) return null;
        tsMs = parsed;
      }
    } else {
      return null;
    }

    const now = Date.now();
    const diff = now - tsMs;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

  private normalizeTimestamp(ts: number): number {
    const abs = Math.abs(ts);
    if (abs < 1e12) {
      return ts * 1000;
    }
    return ts;
  }

}
