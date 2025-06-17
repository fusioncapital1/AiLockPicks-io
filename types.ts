
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

export interface GameDataInput {
  sport_name: string;
  home_team: string;
  ht_record: string;
  ht_form: string[];
  away_team: string;
  at_record: string;
  at_form: string[];
  commence_time_utc: string;
  ml_home_odds: string;
  ml_away_odds: string;
  spread_home_points: string;
  spread_home_price: string;
  spread_away_points: string;
  spread_away_price: string;
  total_over_points: string;
  total_over_price: string;
  total_under_points: string;
  total_under_price: string;
  h2h_summary: string;
}

export interface BettingAnalysisOutput {
  predicted_moneyline_winner: string;
  moneyline_confidence_percent: number;
  predicted_spread_winner_team: string;
  spread_confidence_percent: number;
  predicted_total_direction: 'Over' | 'Under' | 'Push';
  total_confidence_percent: number;
  brief_rationale_for_main_pick: string;
}
