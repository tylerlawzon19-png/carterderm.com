# Carter Dermatology Website - Security Setup

## 🚨 URGENT: API Key Security

Your API key was previously exposed in the source code. Follow these steps immediately:

### 1. Revoke the Exposed API Key
- Contact Ez Scheduler support
- Revoke this key: `ZDQ1OTExZjctNDhhNy00NzllLWE0NDEtMWI5ODNiNjhmN2Nl`
- Generate a new API key

### 2. Configure the New API Key
1. Open `config.js`
2. Replace `YOUR_NEW_API_KEY_HERE` with your new API key
3. **NEVER commit config.js to version control**

### 3. Security Best Practices

#### For Development:
- Always keep `config.js` in `.gitignore`
- Never commit API keys to repositories
- Use environment variables for production

#### For Production Deployment:
- Set up server-side proxy for API calls
- Use environment variables
- Implement rate limiting
- Monitor API usage

### 4. Alternative Secure Implementation

For maximum security, consider implementing a server-side proxy:

```javascript
// Server-side endpoint (e.g., /api/scheduler)
app.post('/api/scheduler', async (req, res) => {
  const response = await fetch('https://ezschedulerprod.ezinfra.net/api', {
    headers: {
      'Authorization': `Bearer ${process.env.EZ_SCHEDULER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(req.body)
  });
  
  res.json(await response.json());
});
```

Then update the frontend to call your API endpoint instead of directly using the API key.

### 5. Monitoring
- Regularly check your API usage dashboard
- Set up alerts for unusual activity
- Rotate API keys periodically

## Files Modified
- `contact.html` - Updated to use secure configuration
- `config.js` - New configuration file (keep private)
- `.gitignore` - Added security exclusions
- `README-SECURITY.md` - This file

## Support
If you need help with the security implementation, contact your web developer or Ez Scheduler support.