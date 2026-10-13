import React, { useState, useEffect } from 'react';
import { getTodayDateString } from '../utils/dateHelper';
import { safeGetStorage, safeSetStorage, STORAGE_KEYS } from '../services/storageService';

export default function DailyPledge({ t }) {
  const [isPledged, setIsPledged] = useState(false);
  const todayStr = getTodayDateString();

  useEffect(() => {
    const pledges = safeGetStorage(STORAGE_KEYS.PLEDGES, {});
    setIsPledged(Boolean(pledges[todayStr]));
  }, [todayStr]);

  const handleTogglePledge = () => {
    const pledges = safeGetStorage(STORAGE_KEYS.PLEDGES, {});
    const nextState = !isPledged;
    pledges[todayStr] = nextState;
    safeSetStorage(STORAGE_KEYS.PLEDGES, pledges);
    setIsPledged(nextState);
  };

  return (
    <section className="pledge-section card-box" aria-labelledby="pledge-heading">
      <div className="pledge-content">
        <div className="pledge-icon" aria-hidden="true">🌍</div>
        <div>
          <h2 id="pledge-heading" className="pledge-title">{t.pledgeTitle}</h2>
          <p className="pledge-desc">{t.pledgeDesc}</p>
        </div>
      </div>
      <button
        type="button"
        className={`pledge-btn ${isPledged ? 'pledged-active' : ''}`}
        onClick={handleTogglePledge}
      >
        {isPledged ? t.pledgeSigned : t.pledgeButton}
      </button>
    </section>
  );
}
