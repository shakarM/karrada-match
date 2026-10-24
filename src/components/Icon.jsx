/** Simple line icons. Use: <Icon name="arrow" size={20} /> */
const paths = {
  gain: <><path d="M4 18c3-1 5-4 6-8M10 10c2 2 5 2 8-1" /><path d="M14 5l4 4-4 0" /><circle cx="6" cy="18" r="1.5" /></>,
  lose: <><path d="M12 3c3 4 6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 10 8 8 9 6c.5 2 1.5 3 3 3 0-2-1-4 0-6z" /></>,
  muscle: <><path d="M5 15c0-5 3-9 6-10l2 3-2 2c3 0 6 2 7 5-2 3-7 5-11 4-1 0-2-2-2-4z" /><path d="M11 10c-1 2-1 3 0 5" /></>,
  energy: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  recovery: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v4h-4" /><path d="M9 12.5l2 2 4-4" /></>,
  health: <><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /><path d="M8 12h2l1-2 2 4 1-2h2" /></>,
  male: <><circle cx="10" cy="14" r="5" /><path d="M14 10l6-6M15 4h5v5" /></>,
  female: <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></>,
  seed: <><path d="M12 20v-6" /><path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5z" /><path d="M5 20h14" /></>,
  sprout: <><path d="M12 20V9" /><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 10c0-3 2-5 5-5 0 3-2 5-5 5z" /><path d="M5 20h14" /></>,
  tree: <><path d="M12 21v-5" /><path d="M12 3 6 12h3l-3 4h12l-3-4h3z" /></>,
  plate: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3.5" /><path d="M3 4v6M21 4v16" /></>,
  cookie: <><path d="M20 12A8 8 0 1 1 12 4a3 3 0 0 0 4 4 3 3 0 0 0 4 4z" /><circle cx="9" cy="10" r=".8" /><circle cx="14" cy="15" r=".8" /><circle cx="9" cy="15" r=".8" /></>,
  egg: <path d="M12 3c3.5 0 6 6 6 10a6 6 0 0 1-12 0c0-4 2.5-10 6-10z" />,
  balance: <><path d="M12 4v16M7 20h10M5 8h14" /><path d="M5 8l-2 6a3 3 0 0 0 4 0zM19 8l-2 6a3 3 0 0 0 4 0z" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  cup: <><path d="M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v2M11 3v2" /></>,
  moon: <path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M6 21c0-4 3-6 6-6s6 2 6 6" /></>,
  pill: <><rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12.5)" /><path d="M9 7.5l4.5 6.5" /></>,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  back: <path d="M20 12H5M11 6l-6 6 6 6" />,
  whatsapp: <><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" /></>,
  bag: <><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="3" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></>,
  refresh: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v4h-4" /></>,
  chat: <path d="M5 5h14v10H9l-4 4z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
  text: <path d="M5 6h14M5 12h14M5 18h9" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.2.6 3.5 2.6 3.5 6" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
  download: <><path d="M12 4v12M7 11l5 5 5-5" /><path d="M4 20h16" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  logout: <><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" /><path d="M10 16l-4-4 4-4M6 12h10" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
};

export function Icon({ name, size = 22, strokeWidth = 1.7, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}

/** Karrada mark: two capsules crossing. Replaced by the uploaded logo when one is set. */
export function Mark({ size = 30, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 50 36" className={className} aria-hidden="true">
      <rect x="2" y="9" width="26" height="15" rx="7.5" transform="rotate(-28 15 16.5)" fill="currentColor" />
      <rect x="20" y="12" width="26" height="15" rx="7.5" transform="rotate(-28 33 19.5)" fill="currentColor" />
    </svg>
  );
}
