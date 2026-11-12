// Primitive hands over an email's attachments as one gzip-compressed tar
// archive. This reads it and finds the screenshot.

import { gunzipSync } from "node:zlib";

export interface ArchivedFile {
  name: string;
  data: Buffer;
}

const BLOCK = 512;

function text(block: Buffer, start: number, length: number): string {
  const slice = block.subarray(start, start + length);
  const end = slice.indexOf(0);
  return slice.subarray(0, end < 0 ? slice.length : end).toString("utf8");
}

/** The regular files in a tar archive (ustar; long names by prefix or GNU `L`). */
export function untar(tar: Buffer): ArchivedFile[] {
  const files: ArchivedFile[] = [];
  let longName: string | null = null;
  for (let at = 0; at + BLOCK <= tar.length; ) {
    const header = tar.subarray(at, at + BLOCK);
    if (header.every((byte) => byte === 0)) break;
    const size = parseInt(text(header, 124, 12).trim() || "0", 8);
    if (!Number.isFinite(size) || size < 0) break;
    const type = String.fromCharCode(header[156] || 48);
    const body = tar.subarray(at + BLOCK, at + BLOCK + size);
    if (type === "L") {
      longName = text(body, 0, body.length);
    } else {
      if (type === "0" || type === "7") {
        const prefix = text(header, 345, 155);
        const name = longName ?? (prefix ? `${prefix}/${text(header, 0, 100)}` : text(header, 0, 100));
        files.push({ name, data: Buffer.from(body) });
      }
      longName = null;
    }
    at += BLOCK + Math.ceil(size / BLOCK) * BLOCK;
  }
  return files;
}

export interface Screenshot {
  data: Buffer;
  contentType: "image/png" | "image/jpeg";
  extension: "png" | "jpg";
}

/** PNG or JPEG by its first bytes: a file's name and declared type are the sender's word. */
export function imageType(data: Buffer): Pick<Screenshot, "contentType" | "extension"> | null {
  if (data.length > 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { contentType: "image/png", extension: "png" };
  }
  if (data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return { contentType: "image/jpeg", extension: "jpg" };
  }
  return null;
}

/** The first PNG or JPEG in an attachments archive that is not too large. */
export function screenshotIn(archive: Buffer, maxBytes: number): Screenshot | null {
  let tar: Buffer;
  try {
    // A screenshot, a little slack, and the tar's own blocks: more is not ours.
    tar = gunzipSync(archive, { maxOutputLength: maxBytes * 4 });
  } catch {
    return null;
  }
  for (const file of untar(tar)) {
    const type = imageType(file.data);
    if (type && file.data.length <= maxBytes) return { data: file.data, ...type };
  }
  return null;
}
