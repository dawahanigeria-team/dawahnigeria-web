// PostHog Testing Utility
// Open browser console and run: window.testPostHog()

import { trackEvent, identifyUser, EVENTS } from './posthog';

export const testPostHog = () => {
  console.log('🧪 Testing PostHog Integration...\n');

  // Check if PostHog is loaded
  if (!window.posthog) {
    console.error('❌ PostHog is NOT loaded!');
    console.log('Troubleshooting steps:');
    console.log('1. Check .env file has REACT_APP_POSTHOG_KEY');
    console.log('2. Check .env file has REACT_APP_POSTHOG_HOST');
    console.log('3. Restart your development server');
    console.log('4. Check browser network tab for failed PostHog requests');
    return false;
  }

  console.log('✅ PostHog is loaded!');
  console.log('PostHog instance:', window.posthog);

  // Test basic event
  console.log('\n📊 Sending test event...');
  trackEvent('test_event', {
    test_property: 'hello from posthog test',
    timestamp: new Date().toISOString(),
  });

  // Test identify
  console.log('\n👤 Testing identify...');
  identifyUser('test-user-123', {
    email: 'test@example.com',
    username: 'testuser',
  });

  console.log('\n✅ Tests completed!');
  console.log('Check your PostHog dashboard in ~30 seconds');
  console.log('Dashboard: https://eu.posthog.com/project/YOUR_PROJECT_ID/events');

  return true;
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.testPostHog = testPostHog;
}

export default testPostHog;
