# Security Policy for Dearly

## Data Privacy & Security

### ✅ What's Secure

- **Zero Server Storage**: All letter content exists only in your browser. Nothing is stored on servers.
- **Client-Side Only**: All processing happens locally—no data leaves your device unless you explicitly download or share.
- **No Authentication Required**: We don't collect user data or require logins.
- **No Tracking**: No analytics, cookies, or third-party services tracking your activity.
- **Download Only**: Letters are downloaded as plain `.txt` files that you control entirely.

### 🔐 Security Hardening

1. **Content Security Policy**: Configured to prevent XSS attacks.
2. **HTTP Security Headers**: 
   - `X-Content-Type-Options: nosniff` — Prevent MIME sniffing
   - `X-Frame-Options: DENY` — Prevent clickjacking
   - `X-XSS-Protection: 1; mode=block` — Browser XSS filtering
   - `Referrer-Policy: no-referrer` — Minimal referrer leakage
   - `Permissions-Policy` — Disable camera, microphone, geolocation

3. **React Strict Mode**: Catches potential issues during development.

### 📋 Best Practices for Users

1. **Save Your Work**: Browser tabs can close. Regularly download completed letters.
2. **Use HTTPS in Production**: Deploy only over HTTPS (e.g., Vercel, Netlify).
3. **Device Security**: Protect your device's filesystem where downloaded letters are stored.
4. **Browser Updates**: Keep your browser up to date for security patches.

### 🚀 Deployment Security Checklist

Before deploying to production:

- [ ] Deploy over **HTTPS only**
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain in `.env.production`
- [ ] Enable `strict` mode in `next.config.mjs` for production builds
- [ ] Review and customize security headers for your domain
- [ ] Use a hosting provider with DDoS protection (Vercel, Netlify, Cloudflare)
- [ ] Enable HTTP/2 and compression
- [ ] Set appropriate `Cache-Control` headers for static assets
- [ ] Monitor uptime with a status page

### 🛡️ Third-Party Security

No external dependencies are used that handle user data:
- `next` — React framework by Vercel
- `react` — UI library by Meta
- `react-dom` — React rendering library

Run `npm audit` regularly to check for dependency vulnerabilities.

### 📝 Responsible Disclosure

If you discover a security vulnerability, please email security@yoursite.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Do not publicly disclose until a patch is available.

---

**Last Updated**: 2026-09-06  
**Version**: 1.0.0
