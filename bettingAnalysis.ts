import { GameDataInput, BettingAnalysisOutput } from './types';

// Helper function to parse 'W-L' record string
const parseRecord = (record: string): { wins: number, losses: number } => {
  const parts = record.split('-');
  if (parts.length === 2) {
    const wins = parseInt(parts[0], 10);
    const losses = parseInt(parts[1], 10);
    if (!isNaN(wins) && !isNaN(losses)) {
      return { wins, losses };
    }
  }
  return { wins: 0, losses: 0 }; // Default or error
};

// Helper function to count wins in form array
const countRecentWins = (form: string[]): number => {
  return form.filter(f => f === 'W').length;
};

export const generateBettingAnalysis = (gameData: GameDataInput): BettingAnalysisOutput => {
  const homeRecord = parseRecord(gameData.ht_record);
  const awayRecord = parseRecord(gameData.at_record);
  const homeRecentWins = countRecentWins(gameData.ht_form);
  const awayRecentWins = countRecentWins(gameData.at_form);

  let predicted_moneyline_winner: string = gameData.home_team; // Default
  let moneyline_confidence_percent: number = 50;

  // Basic Moneyline Logic
  if (homeRecord.wins > awayRecord.wins && homeRecentWins >= awayRecentWins) {
    predicted_moneyline_winner = gameData.home_team;
    moneyline_confidence_percent = 65;
  } else if (awayRecord.wins > homeRecord.wins && awayRecentWins >= homeRecentWins) {
    predicted_moneyline_winner = gameData.away_team;
    moneyline_confidence_percent = 65;
  } else if (homeRecord.wins > awayRecord.wins) {
    predicted_moneyline_winner = gameData.home_team;
    moneyline_confidence_percent = 60;
  } else if (awayRecord.wins > homeRecord.wins) {
    predicted_moneyline_winner = gameData.away_team;
    moneyline_confidence_percent = 60;
  }
  // Simplistic H2H check (can be expanded)
  if (gameData.h2h_summary.toLowerCase().includes(gameData.home_team.toLowerCase() + " won")) {
      if (predicted_moneyline_winner === gameData.home_team) moneyline_confidence_percent +=5;
      else moneyline_confidence_percent -=5; // if previous logic said away, but h2h says home, reduce confidence
      predicted_moneyline_winner = gameData.home_team;
  } else if (gameData.h2h_summary.toLowerCase().includes(gameData.away_team.toLowerCase() + " won")) {
      if (predicted_moneyline_winner === gameData.away_team) moneyline_confidence_percent +=5;
      else moneyline_confidence_percent -=5;
      predicted_moneyline_winner = gameData.away_team;
  }


  // Basic Spread Logic (ML winner covers)
  const predicted_spread_winner_team = predicted_moneyline_winner;
  const spread_confidence_percent = Math.max(50, moneyline_confidence_percent - 10); // Slightly less than ML

  // Basic Total Logic
  let predicted_total_direction: 'Over' | 'Under' | 'Push' = 'Over'; // Default
  let total_confidence_percent: number = 50;

  if (gameData.h2h_summary.toLowerCase().includes('over')) {
    predicted_total_direction = 'Over';
    total_confidence_percent = 55;
  } else if (gameData.h2h_summary.toLowerCase().includes('under')) {
    predicted_total_direction = 'Under';
    total_confidence_percent = 55;
  }

  const brief_rationale_for_main_pick =
    `Prediction based on analysis of team records (${gameData.ht_record} vs ${gameData.at_record}), recent form (${homeRecentWins} wins vs ${awayRecentWins} wins in last 5), and H2H data. ${predicted_moneyline_winner} is favored for the moneyline.`;

  return {
    predicted_moneyline_winner,
    moneyline_confidence_percent,
    predicted_spread_winner_team,
    spread_confidence_percent,
    predicted_total_direction,
    total_confidence_percent,
    brief_rationale_for_main_pick,
  };
};

/*
// Example Usage (uncomment to test)
const sampleGameData: GameDataInput = {
  sport_name: "Basketball",
  home_team: "Lakers",
  ht_record: "35-15",
  ht_form: ["W", "W", "L", "W", "W"],
  away_team: "Clippers",
  at_record: "30-20",
  at_form: ["L", "W", "L", "W", "L"],
  commence_time_utc: "2024-03-15T00:00:00Z",
  ml_home_odds: "-150",
  ml_away_odds: "+130",
  spread_home_points: "-3.5",
  spread_home_price: "-110",
  spread_away_points: "+3.5",
  spread_away_price: "-110",
  total_over_points: "220.5",
  total_over_price: "-110",
  total_under_points: "220.5",
  total_under_price: "-110",
  h2h_summary: "Lakers won 3 of last 5 H2H. Average total points 215, suggesting under."
};

const analysisResult = generateBettingAnalysis(sampleGameData);
console.log("Betting Analysis Result:", JSON.stringify(analysisResult, null, 2));
*/
