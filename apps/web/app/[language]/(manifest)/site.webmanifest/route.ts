import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    id: 'gw2t',
    name: 'gw2treasures.com',
    short_name: 'gw2treasures.com',
    start_url: '/',
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    }, {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any'
    }, {
      src: '/maskable_icon_x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable'
    }, {
      src: '/maskable_icon_x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }],
    theme_color: '#b7000d',
    background_color: '#ffffff',
    display: 'standalone'
  });
}
