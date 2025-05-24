
import { PickItem } from './types';

export const SAMPLE_PICKS: PickItem[] = [
  {
    id: 1,
    sport: 'NBA',
    teams: 'Lakers vs Warriors',
    prediction: 'Lakers to win by +5.5',
    probability: '72%',
    odds: '+145',
    parlayOptions: ['Moneyline', 'Spread', 'Over/Under'],
  },
  {
    id: 2,
    sport: 'NFL',
    teams: 'Chiefs vs Buccaneers',
    prediction: 'Chiefs -3.5 ATS',
    probability: '68%',
    odds: '+120',
    parlayOptions: ['ATS', 'Total Points Over 48.5'],
  },
  {
    id: 3,
    sport: 'MLB',
    teams: 'Yankees vs Red Sox',
    prediction: 'Under 9.5 Runs',
    probability: '63%',
    odds: '+110',
    parlayOptions: ['Under', 'Yankees ML'],
  },
  {
    id: 4,
    sport: 'NHL',
    teams: 'Maple Leafs vs Bruins',
    prediction: 'Bruins to win in regulation',
    probability: '65%',
    odds: '+130',
    parlayOptions: ['Moneyline', 'Total Goals Under 6.5'],
  },
];