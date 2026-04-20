import { photos, type PhotoEntry } from './photos';

export type Moment =
  | { type: 'photos'; photos: { src: string }[] }
  | { type: 'highlight'; photo: { src: string }; friendName: string; story: string; quote?: string }
  | { type: 'text'; text: string; attribution?: string }
  | { type: 'location'; label: string };

export const intro = {
  title: 'For Dro, on your birthday.',
  subtitle: 'From all of us.',
};

export const closing = {
  title: 'Happy birthday, Dro.',
  letter: `Dear Dro,

Never change your ways. Not the arguments, not the blacking out, not the absurd confidence that you can beat anyone in a fight. All of it is what makes you you.

Dream big — the way you always have. We've built something real together, and the best of it is still ahead of us.

Here's to many more memories, many more terrible ideas that somehow turn out great, and many more sunrises we probably should have slept through.

Happy birthday, brother.

With love,
The whole team`,
};

function buildTimeline(): Moment[] {
  const sorted = Object.keys(photos)
    .map(Number)
    .sort((a, b) => a - b);

  const moments: Moment[] = [];
  let photoBuffer: { src: string }[] = [];
  let lastLocation = '';

  function flushBuffer() {
    if (photoBuffer.length > 0) {
      moments.push({ type: 'photos', photos: [...photoBuffer] });
      photoBuffer = [];
    }
  }

  for (const key of sorted) {
    const entry: PhotoEntry = photos[key];
    const src = `/memories/${entry.file}`;

    // Insert location marker when place changes
    if (entry.location && entry.location !== lastLocation) {
      flushBuffer();
      moments.push({ type: 'location', label: entry.location });
      lastLocation = entry.location;
    }

    // Insert a text beat before this photo if specified
    if (entry.text) {
      flushBuffer();
      moments.push({ type: 'text', text: entry.text, attribution: entry.textAttribution });
    }

    // Highlight gets its own moment
    if (entry.highlight) {
      flushBuffer();
      moments.push({
        type: 'highlight',
        photo: { src },
        friendName: entry.highlight.friendName,
        story: entry.highlight.story,
        quote: entry.highlight.quote,
      });
      continue;
    }

    photoBuffer.push({ src });

    if (photoBuffer.length >= 3) {
      flushBuffer();
    }
  }

  flushBuffer();
  return moments;
}

export const timeline = buildTimeline();
