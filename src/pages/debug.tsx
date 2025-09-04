// Debug page to check environment variables in production
import { emailjsConfig } from '../config/emailjs';

export default function Debug() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#000', color: '#0f0' }}>
      <h1>🐛 EmailJS Debug Information</h1>
      <div style={{ marginTop: '20px' }}>
        <h2>Environment Variables:</h2>
        <p><strong>SERVICE_ID:</strong> {emailjsConfig.SERVICE_ID || 'undefined'}</p>
        <p><strong>TEMPLATE_ID:</strong> {emailjsConfig.TEMPLATE_ID || 'undefined'}</p>
        <p><strong>PUBLIC_KEY:</strong> {emailjsConfig.PUBLIC_KEY || 'undefined'}</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Expected Values:</h2>
        <p><strong>SERVICE_ID:</strong> service_mcbqlsf</p>
        <p><strong>TEMPLATE_ID:</strong> template_lhiub4f</p>
        <p><strong>PUBLIC_KEY:</strong> HwbbULAf-nyY0E9EW</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Status:</h2>
        <p>SERVICE_ID: {emailjsConfig.SERVICE_ID === 'service_mcbqlsf' ? '✅ Correct' : '❌ Incorrect'}</p>
        <p>TEMPLATE_ID: {emailjsConfig.TEMPLATE_ID === 'template_lhiub4f' ? '✅ Correct' : '❌ Incorrect'}</p>
        <p>PUBLIC_KEY: {emailjsConfig.PUBLIC_KEY === 'HwbbULAf-nyY0E9EW' ? '✅ Correct' : '❌ Incorrect'}</p>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333' }}>
        <p><strong>Instructions:</strong></p>
        <p>1. Visit this page on your live Vercel site</p>
        <p>2. Check if all values show "✅ Correct"</p>
        <p>3. If any show "❌ Incorrect", the environment variables are not set in Vercel</p>
        <p>4. Go to Vercel Dashboard → Project Settings → Environment Variables</p>
        <p>5. Add the missing variables and redeploy</p>
      </div>
    </div>
  );
}
