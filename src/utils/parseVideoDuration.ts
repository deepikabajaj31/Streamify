export const parseVideoDuration = (duration: string): string => {
  // Return empty string for invalid or empty input
  if (!duration || !duration.startsWith("PT")) {
    return "";
  }

  // Extract hours, minutes, seconds using regex
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    return "";
  }

  // Parse hours, minutes, seconds, defaulting to 0 if not present
  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);

  // Format hours, minutes, seconds with leading zeros
  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Return formatted duration
  if (hours > 0) {
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }
  if (minutes > 0) {
    return `${minutes}:${formattedSeconds}`;
  }
  return `0:${formattedSeconds}`;
};