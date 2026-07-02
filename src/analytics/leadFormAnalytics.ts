import { useCallback, useEffect, useRef } from 'react';
import { trackEvent } from './gtag';

const CATEGORICAL_FIELDS = new Set([
  'businessType',
  'launchTimeline',
  'orderQuantity',
  'targetMarket',
]);

export const useLeadFormAnalytics = () => {
  const hasEngaged = useRef(false);

  useEffect(() => {
    trackEvent('lead_form_view', { page_path: '/get-started' });
  }, []);

  const markEngagement = useCallback(() => {
    if (hasEngaged.current) return;
    hasEngaged.current = true;
    trackEvent('lead_form_engagement');
  }, []);

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      markEngagement();
      trackEvent('lead_form_field_focus', { field_name: fieldName });
    },
    [markEngagement],
  );

  const trackFieldComplete = useCallback(
    (fieldName: string) => {
      markEngagement();
      trackEvent('lead_form_field_complete', { field_name: fieldName });
    },
    [markEngagement],
  );

  const trackSelectChange = useCallback(
    (fieldName: string, value: string) => {
      markEngagement();
      trackEvent('lead_form_select_change', {
        field_name: fieldName,
        ...(CATEGORICAL_FIELDS.has(fieldName) ? { field_value: value } : {}),
      });
    },
    [markEngagement],
  );

  const trackProductInterestChange = useCallback(
    (interest: string, action: 'add' | 'remove') => {
      markEngagement();
      trackEvent('lead_form_product_interest_change', {
        interest,
        action,
      });
    },
    [markEngagement],
  );

  const trackSubmitStart = useCallback(() => {
    markEngagement();
    trackEvent('lead_form_submit');
  }, [markEngagement]);

  const trackSubmitSuccess = useCallback((productInterestCount: number) => {
    trackEvent('generate_lead', {
      form_name: 'get_started',
      product_interest_count: productInterestCount,
    });
    trackEvent('lead_form_submit_success', {
      product_interest_count: productInterestCount,
    });
  }, []);

  const trackSubmitError = useCallback((message: string) => {
    trackEvent('lead_form_submit_error', {
      error_message: message.slice(0, 120),
    });
  }, []);

  const trackSuccessView = useCallback(() => {
    trackEvent('lead_form_success_view');
  }, []);

  const trackSuccessHomeClick = useCallback(() => {
    trackEvent('lead_form_success_home_click');
  }, []);

  return {
    trackFieldFocus,
    trackFieldComplete,
    trackSelectChange,
    trackProductInterestChange,
    trackSubmitStart,
    trackSubmitSuccess,
    trackSubmitError,
    trackSuccessView,
    trackSuccessHomeClick,
  };
};
