import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../analytics/gtag';
import { trackReferralContext } from '../analytics/siteAnalytics';

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
    trackReferralContext();
  }, [location.pathname, location.search]);

  return null;
};
