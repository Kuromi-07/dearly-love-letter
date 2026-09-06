# Dearly

A secure, privacy-first love letter studio built with Next.js. Write, personalize, preview, and download your letters—all locally, with zero server storage.

## Features

- 📝 **3 Curated Templates**: Classic, Little Things, Long Distance
- ✏️ **Fully Editable**: Customize recipient, sender, title, greeting, body, and sign-off
- 👁️ **Live Preview**: Paper-style preview updates in real-time
- 📥 **Download**: Export as `.txt` file you control completely
- 🔒 **Private**: All data stays in your browser—nothing stored on servers
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- ⚡ **Fast**: Built with Next.js and Turbopack

## Security

All letter content exists only in your browser. No data is collected, stored, or sent to servers. See [SECURITY.md](SECURITY.md) for details.

## Getting Started

### Prerequisites
- Node.js 18.18 or newer
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended for Next.js):

```bash
npm i -g vercel
vercel
```

Or use Netlify, Cloudflare Pages, or any Node.js host.

**Important**: Always use HTTPS in production.

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Update `NEXT_PUBLIC_SITE_URL` to your production domain when deploying.

## Project Structure

```
app/
  ├── page.js          # Main letter studio component
  ├── layout.js        # Root layout
  └── globals.css      # Styling
.vscode/
  └── launch.json      # VS Code debugger config
package.json           # Dependencies
next.config.mjs        # Next.js config with security headers
SECURITY.md            # Security policy & best practices
```

## License

MIT
