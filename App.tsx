
import React, { useState, useMemo } from 'react';
import { PickItem, ParlayStats, ActiveTab } from './types';
// import { SAMPLE_PICKS } from './constants'; // SAMPLE_PICKS are available but not used by default
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import PicksScreen from './components/PicksScreen';
import ParlayScreen from './components/ParlayScreen';
import AboutScreen from './components/AboutScreen';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [parlaySelections, setParlaySelections] = useState<PickItem[]>([]);

  const toggleParlaySelection = (pick: PickItem) => {
    const exists = parlaySelections.some((item) => item.id === pick.id);
    if (exists) {
      setParlaySelections(parlaySelections.filter((item) => item.id !== pick.id));
    } else {
      setParlaySelections([...parlaySelections, pick]);
    }
  };

  const calculateParlayOdds = (): ParlayStats => {
    if (parlaySelections.length < 2) return { totalOdds: '-', totalProbability: '-' };

    let totalImpliedProbabilitySum = 0; 
    let totalDecimalOddsProduct = 1; 

    parlaySelections.forEach((pick) => {
      const americanOdds = parseFloat(pick.odds.replace('+', '')); 
      
      const decimalOdds = americanOdds > 0 
        ? (americanOdds / 100 + 1) 
        : (100 / Math.abs(americanOdds) + 1);
      totalDecimalOddsProduct *= decimalOdds;

      const impliedProb = americanOdds > 0 
        ? 100 / (americanOdds + 100) 
        : Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
      totalImpliedProbabilitySum += impliedProb; 
    });
    
    const totalProbabilityPercentage = parlaySelections.length > 0 ? `${(totalImpliedProbabilitySum * 100 / parlaySelections.length).toFixed(2)}%` : '-';

    let totalOddsFormatted: string;
    if (totalDecimalOddsProduct >= 2.0) {
      totalOddsFormatted = `+${Math.round((totalDecimalOddsProduct - 1) * 100)}`;
    } else if (totalDecimalOddsProduct > 1.0 && totalDecimalOddsProduct < 2.0) {
       totalOddsFormatted = `-${Math.round(100 / (totalDecimalOddsProduct - 1))}`;
       if (totalOddsFormatted === '-Infinity' || isNaN(parseFloat(totalOddsFormatted))) totalOddsFormatted = `+${Math.round((totalDecimalOddsProduct - 1) * 100)}`;
    }
     else {
      totalOddsFormatted = '-'; 
    }
    if (parlaySelections.length === 0) totalOddsFormatted = '-';


    return { totalOdds: totalOddsFormatted, totalProbability: totalProbabilityPercentage };
  };


  const parlayStats = useMemo(calculateParlayOdds, [parlaySelections]);

  const selectedIds = useMemo(() => parlaySelections.map(p => p.id), [parlaySelections]);

  return (
    <div className="min-h-screen bg-custom-gray-900 text-white flex flex-col">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        parlaySelectionsCount={parlaySelections.length}
      />
      <main className="container mx-auto px-4 py-6 flex-grow">
        {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} />}
        {activeTab === 'picks' && (
          <PicksScreen
            onToggleParlay={toggleParlaySelection}
            selectedIds={selectedIds}
          />
        )}
        {activeTab === 'parlay' && (
          <ParlayScreen
            selections={parlaySelections}
            stats={parlayStats}
            onRemove={toggleParlaySelection}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'about' && <AboutScreen />}
      </main>
      <Footer />
    </div>
  );
};

export default App;