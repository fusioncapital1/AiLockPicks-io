
import React from 'react';

export interface PickItem {
  id: number;
  sport: string;
  teams: string;
  prediction: string;
  probability: string;
  odds: string;
  parlayOptions: string[];
}

export interface ParlayStats {
  totalOdds: string;
  totalProbability: string;
}

export type ActiveTab = 'home' | 'picks' | 'parlay' | 'about';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  expertise: string;
}