import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';

export default function HomePage() {
  return (
    <main id="main-content" aria-label="Home page">
      <Hero />
      <div className="divider" aria-hidden="true"/>
      <Awards />
      <div className="divider" aria-hidden="true"/>
      <Stats />
      <div className="divider" aria-hidden="true"/>
      <Pricing />
      <div className="divider" aria-hidden="true"/>
      <Education />
      <div className="divider" aria-hidden="true"/>
      <OpenAccount />
    </main>
  );
}
