/* eslint-disable @gw2treasures/nextjs/require-metadata */
import { notFound } from 'next/navigation';

export default function NotFoundCatchAll(params: any) {
  notFound();
}

export { metadata } from '../not-found';
