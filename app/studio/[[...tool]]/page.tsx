"use client";
import dynamic from 'next/dynamic';
import config from '../../../sanity.config';

// This disables Server-Side Rendering for the CMS Studio to fix the window error
const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), { ssr: false });

export default function StudioPage() {
  return <NextStudio config={config} />;
}