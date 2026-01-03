export const THEME = {
    primary: '#2d936c',
    dark: '#01161e',
    light: '#e0e0e0',
    card: '#0c1f26',
    secondary: '#55aaaa',
    white: '#ffffff',
} as const;

export type ThemeColor = keyof typeof THEME;
