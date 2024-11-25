export function hexToRgb(hex: string): string {
  // Remove the '#' character if present
  hex = hex.replace('#', '');

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB value string
  return `${r}, ${g}, ${b}`;
}

export function darkenHex(hex: string, amount: number): string {
  // Remove the '#' character if present
  hex = hex.replace('#', '');

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the darker RGB values
  const darkerR = Math.max(r - amount, 0);
  const darkerG = Math.max(g - amount, 0);
  const darkerB = Math.max(b - amount, 0);

  // Convert the darker RGB values back to hex string
  const darkerHex = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;

  // Return the darker hex string
  return darkerHex;
}

export function getSecondaryHex(hex: string): string {
  // Remove the '#' character if present
  hex = hex.replace('#', '');

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the lighter RGB values
  const lighterR = Math.min(r + 50, 255);
  const lighterG = Math.min(g + 50, 255);
  const lighterB = Math.min(b + 50, 255);

  // Convert the lighter RGB values back to hex string
  const lighterHex = `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;

  // Return the lighter hex string
  return lighterHex;
}