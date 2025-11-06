import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper function to format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// Helper function to generate .ics calendar file
function generateICS(data: any): string {
  const start = new Date(data.webinar_date);
  const end = new Date(start.getTime() + 90 * 60 * 1000); // 90 min duration
  
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BLKBLD//Webinar//EN
BEGIN:VEVENT
UID:${Date.now()}@blkbld.co
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${data.webinar_title || 'AI Masterclass'}
DESCRIPTION:Join us for the AI Masterclass. Zoom Link: ${data.zoom_link}\\nMeeting ID: ${data.meeting_id}\\nPasscode: ${data.passcode}
LOCATION:${data.zoom_link}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
}

// Base email styles
const emailStyles = `
  body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #000; color: #fff; }
  .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .content { background: #111; border-radius: 8px; padding: 40px; }
  h1 { font-size: 28px; font-weight: bold; margin: 0 0 20px; color: #fff; }
  p { font-size: 16px; line-height: 1.6; margin: 0 0 15px; color: #ccc; }
  .button { display: inline-block; padding: 14px 32px; background: #fff; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
  .button:hover { background: #eee; }
  .details-box { background: #1a1a1a; border-left: 4px solid #fff; padding: 20px; margin: 20px 0; border-radius: 4px; }
  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  ul { padding-left: 20px; color: #ccc; }
  li { margin: 8px 0; }
  strong { color: #fff; }
`;

// Template registry - map template names to HTML generators
const templates: Record<string, (data: any) => string> = {
  "welcome-workbook-0": (data) => `
    <h1>Welcome! Your Workbook is Ready</h1>
    <p>Hi ${data.name || "there"},</p>
    <p>Thank you for downloading "Find Your White Space" - The 45 Minute Market Opportunity Sprint.</p>
    
    <p><strong>Next Steps:</strong></p>
    <ol>
      <li>Create your free account to access the workbook</li>
      <li>Complete the 45-minute sprint</li>
      <li>Discover your unique market position</li>
    </ol>
    
    <p><a href="${data.accessLink || "#"}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Workbook →</a></p>
    
    <p>Questions? Just reply to this email.</p>
    
    <p>Best,<br>Joseline<br>BLKBLD</p>
  `,

  "webinar-confirmation": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>You're registered for the AI masterclass!</h1>
          <p>We're building a business together, live, using the frameworks you just unlocked in Workbook 0.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold; font-size: 18px;">SAVE THESE DETAILS:</p>
            <p>📅 ${formatDate(data.webinar_date)}<br>
            🕐 ${formatTime(data.webinar_date)}<br>
            🔗 <a href="${data.zoom_link}" style="color: #fff;">Join Zoom Meeting</a><br>
            Meeting ID: ${data.meeting_id}<br>
            Passcode: ${data.passcode}</p>
          </div>
          
          <p style="margin: 20px 0;"><strong>What we're covering:</strong></p>
          <ul>
            <li>Gen AI basics: ChatGPT, Claude & Perplexity</li>
            <li>Live business validation using Workbook 0</li>
            <li>How all 5 workbooks create your complete system</li>
            <li>Q&A for your specific situation</li>
          </ul>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">🎁 Your exclusive buyer pricing:</p>
            <p>Complete 5-workbook bundle: <strong>$${data.bundle_price}</strong> (save $168)<br>
            Individual workbooks: <strong>$${data.single_price} each</strong> (save 50%)</p>
            <p style="margin-top: 10px; font-size: 14px;">Available now through 72 hours after the webinar</p>
          </div>
          
          <a href="https://workbooks.blkbld.co" class="button">GET COMPLETE BUNDLE ($${data.bundle_price}) →</a>
          
          <p><strong>Can't attend live?</strong><br>
          No problem! You'll get the full recording + all materials within 24 hours.</p>
          
          <p style="margin-top: 30px;"><strong>What to bring Tuesday night:</strong></p>
          <ul>
            <li>A business idea or personal brand concept</li>
            <li>Notebook for insights</li>
            <li>Questions for Q&A</li>
          </ul>
          
          <p style="margin-top: 30px;">See you ${formatDate(data.webinar_date).split(',')[0]} at ${formatTime(data.webinar_date)}!</p>
          <p>Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. Questions before the webinar? Just reply to this email.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "webinar-24hr-reminder": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Tomorrow at 7:00 PM CST, we go live.</h1>
          <p>We're not just talking about AI and strategy—we're building a real business together using Workbook 0 frameworks.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">📅 ${formatDate(data.webinar_date)}<br>
            🕐 ${formatTime(data.webinar_date)}<br>
            📍 Zoom Details Below</p>
          </div>
          
          <p style="margin: 20px 0; font-weight: bold; font-size: 18px;">JOIN THE MASTERCLASS:</p>
          <p>🔗 <a href="${data.zoom_link}" style="color: #fff;">Zoom Link</a><br>
          Meeting ID: ${data.meeting_id}<br>
          Passcode: ${data.passcode}</p>
          
          <p style="margin-top: 30px;"><strong>What to bring:</strong></p>
          <ul>
            <li>☕ Your favorite beverage</li>
            <li>📓 Notebook for insights</li>
            <li>🤔 A business idea (or personal brand concept) you want to validate</li>
            <li>❓ Questions for the Q&A</li>
          </ul>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">Quick reminder: Your exclusive buyer pricing</p>
            <p>You have until 72 hours after the webinar to grab:</p>
            <p>Complete 5-workbook bundle: <strong>$${data.bundle_price}</strong> (save $168)<br>
            Individual workbooks: <strong>$${data.single_price} each</strong> (save 50%)</p>
          </div>
          
          <a href="https://workbooks.blkbld.co" class="button">GET COMPLETE BUNDLE ($${data.bundle_price}) →</a>
          
          <p>Then come to the webinar and see exactly how to use the entire system.</p>
          <p style="margin-top: 30px;">See you tomorrow at ${formatTime(data.webinar_date)}!</p>
          <p>Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. Can't make it live? You'll get the recording within 24 hours—and your buyer pricing still applies.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "webinar-2hr-reminder": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>We're going live in 2 hours!</h1>
          <p style="font-size: 24px; margin: 20px 0;">🕐 ${formatTime(data.webinar_date)}</p>
          
          <div class="details-box">
            <p style="margin: 0; font-weight: bold;">JOIN NOW:</p>
            <p style="margin: 10px 0 0;">🔗 <a href="${data.zoom_link}" style="color: #fff; font-size: 18px;">${data.zoom_link}</a><br>
            Meeting ID: ${data.meeting_id}<br>
            Passcode: ${data.passcode}</p>
          </div>
          
          <p style="margin-top: 30px;"><strong>Tonight's plan:</strong></p>
          <ul>
            <li>Master ChatGPT, Claude & Perplexity (20 min)</li>
            <li>Build a business LIVE using Workbook 0 (30 min)</li>
            <li>See how all 5 workbooks connect (20 min)</li>
            <li>Your Q&A (20 min)</li>
          </ul>
          
          <a href="${data.zoom_link}" class="button">JOIN THE MASTERCLASS →</a>
          
          <p style="margin-top: 30px;">See you in 2 hours!</p>
          <p><strong>Joseline, MBA</strong></p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "webinar-15min-reminder": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Going live in 15 minutes!</h1>
          
          <a href="${data.zoom_link}" class="button" style="font-size: 20px; padding: 20px 40px;">🔗 JOIN NOW</a>
          
          <div class="details-box" style="margin-top: 30px;">
            <p style="margin: 0;">${data.zoom_link}<br>
            Meeting ID: ${data.meeting_id}<br>
            Passcode: ${data.passcode}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 18px;">Let's build something real together.</p>
          <p><strong>Joseline</strong></p>
        </div>
      </div>
    </body></html>
  `,

  "post-webinar-immediate": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Thank you for showing up tonight 🙏</h1>
          <p>You just spent 90 minutes learning how to build businesses with AI that actually works—and you watched us validate a real business idea together, live.</p>
          <p>That's more strategic progress than most entrepreneurs make in months.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 15px; font-weight: bold; font-size: 18px;">Now it's time to implement.</p>
            <p style="margin: 0;">Your 72-hour exclusive pricing window starts RIGHT NOW:</p>
            <p style="margin: 15px 0 0;">🎁 Complete 5-workbook bundle: <strong>$${data.bundle_price}</strong> (save $168)<br>
            📚 Individual workbooks: <strong>$${data.single_price} each</strong> (save 50%)<br>
            ⏰ Expires: ${formatDate(data.discount_end)} at 11:59 PM CST</p>
          </div>
          
          <p style="margin-top: 30px;"><strong>What you're getting:</strong></p>
          <ul>
            <li>✅ Workbook 1: Brand Strategy Foundation</li>
            <li>✅ Workbook 2: Marketing Strategy Execution</li>
            <li>✅ Workbook 3: Growth & Measurement Systems</li>
            <li>✅ Workbook 4: Scaling Systems</li>
            <li>✅ AI prompts + interactive frameworks across every workbook</li>
            <li>✅ 6 months of access to complete at your pace</li>
          </ul>
          
          <a href="https://workbooks.blkbld.co" class="button">GET COMPLETE BUNDLE ($${data.bundle_price}) →</a>
          
          <p style="margin-top: 30px;"><strong>The people who thrive are those who bet on themselves strategically.</strong></p>
          <p>You showed up tonight. Now take the next step.</p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. After Friday at midnight, the bundle goes back to $297.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "post-webinar-12hr": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Ready to turn last night's insights into your system?</h1>
          <p>How are you feeling after last night's masterclass?</p>
          <p>If you're like most attendees, you're thinking: <em>"I finally understand how to use AI strategically. Now I need the complete system to build this out."</em></p>
          
          <p style="margin-top: 30px;"><strong>Here's what you experienced last night:</strong></p>
          <ul>
            <li>Live demonstration of AI tools that actually work</li>
            <li>Real business validation using market-trained prompts</li>
            <li>How 5 workbooks create one complete strategic system</li>
            <li>Why systematic beats scattered every single time</li>
          </ul>
          
          <p><strong>The question now:</strong> Are you going to implement systematically, or piece it together on your own?</p>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">You have ${data.hours_left} hours left to get the complete system:</p>
            <p style="margin: 0;">Complete 5-workbook bundle: <strong>$${data.bundle_price}</strong> (normally $297)<br>
            Individual workbooks: <strong>$${data.single_price} each</strong> (normally $97)</p>
          </div>
          
          <p style="margin-top: 20px;"><strong>The difference:</strong></p>
          <ul>
            <li><strong>Bundle</strong> = Complete strategic system from validation to scale ($${data.bundle_price})</li>
            <li><strong>Individual</strong> = Start with one, add more later ($${data.single_price} each)</li>
            <li><strong>After ${data.hours_left} Hours</strong> = Regular pricing returns ($297 bundle / $97 each)</li>
          </ul>
          
          <a href="https://workbooks.blkbld.co" class="button">GET COMPLETE BUNDLE ($${data.bundle_price}) →</a>
          
          <p style="margin-top: 30px;">In this economy, there's never been a better opportunity to bet on yourself strategically.</p>
          <p><strong>Don't build your business on hope. Build it on strategy.</strong></p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. Remember what we built together last night? That's the power of systematic frameworks. Now apply it to YOUR business.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "post-webinar-36hr": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Halfway through your exclusive pricing window ⏰</h1>
          <p>You're at the halfway point.</p>
          <p><strong>${data.hours_left} hours left</strong> on your exclusive buyer pricing. After Friday at midnight, the bundle goes back to $297.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">What Tuesday night attendees are saying:</p>
            <p style="margin: 10px 0; font-style: italic; color: #ddd;">"Bought the bundle immediately after the webinar. The complete system is exactly what I needed to stop guessing."</p>
            <p style="margin: 10px 0; font-style: italic; color: #ddd;">"Finally, someone who shows you HOW to build strategically instead of just giving you theory."</p>
            <p style="margin: 10px 0; font-style: italic; color: #ddd;">"The live business validation was incredible. Now I'm using the same frameworks for my own brand."</p>
          </div>
          
          <p style="margin-top: 30px;"><strong>Here's what you get with the complete bundle:</strong></p>
          <ul>
            <li>✅ Systematic approach – No more scattered tactics</li>
            <li>✅ Interactive frameworks – Not PDFs that sit unfinished</li>
            <li>✅ Market-trained AI prompts – Strategic insights, not generic fluff</li>
            <li>✅ Complete progression – Validation → Brand → Marketing → Growth → Scale</li>
            <li>✅ 6 months access – Work at your own pace</li>
          </ul>
          
          <div class="details-box">
            <p style="margin: 0;">Your price (for ${data.hours_left} more hours): <strong>$${data.bundle_price}</strong><br>
            Regular price after Friday: <strong>$297</strong></p>
          </div>
          
          <a href="https://workbooks.blkbld.co" class="button">LOCK IN YOUR PRICING ($${data.bundle_price}) →</a>
          
          <p style="margin-top: 30px;"><strong>The people who implement now are the ones who win later.</strong></p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "post-webinar-60hr": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>12 hours left: Your exclusive pricing expires tonight</h1>
          <p>Your exclusive buyer pricing expires tonight at 11:59 PM CST.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 15px; font-weight: bold;">After midnight tonight:</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Bundle price goes back to $297</li>
              <li>Individual workbooks return to $97 each</li>
              <li>Your exclusive pricing disappears forever</li>
            </ul>
            
            <p style="margin: 20px 0 15px; font-weight: bold;">Before midnight tonight:</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Bundle stays $${data.bundle_price} (save $168)</li>
              <li>Individual workbooks stay $${data.single_price} each (save 50%)</li>
              <li>You get the complete strategic system you saw in action Tuesday night</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px;"><strong>The choice is simple:</strong></p>
          <p><strong>Option 1:</strong> Get the complete system now for $${data.bundle_price}<br>
          <strong>Option 2:</strong> Pay $297 later (or walk away)</p>
          
          <a href="https://workbooks.blkbld.co" class="button">CLAIM YOUR PRICING (12 Hours Left) →</a>
          
          <p style="margin-top: 30px;">You showed up Tuesday night because you're serious about building strategically.</p>
          <p><strong>Don't let a midnight deadline stop your momentum.</strong></p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. This is your final reminder before pricing resets. No more emails about this after tonight.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "post-webinar-71hr": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Final call: 1 hour until your pricing expires</h1>
          <p style="font-size: 18px; font-weight: bold;">Your exclusive buyer pricing expires at midnight tonight (11:59 PM CST).</p>
          
          <p style="margin: 30px 0;">If you want the complete strategic system:</p>
          
          <a href="https://workbooks.blkbld.co" class="button" style="font-size: 18px; padding: 18px 40px;">GET BUNDLE ($${data.bundle_price}) – FINAL HOUR →</a>
          
          <p style="margin-top: 40px;">If not, no hard feelings.</p>
          <p>You got massive value from Tuesday's masterclass and Workbook 0. Use what you learned and build something great.</p>
          
          <p style="margin-top: 30px;"><strong>Either way, I'm rooting for you.</strong></p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "bundle-buyer-welcome": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>Welcome to your complete strategic system! 🎉</h1>
          <p>You just made one of the smartest investments in your business (or personal brand). You now have access to all 5 interactive workbooks for the next 6 months.</p>
          
          <div class="details-box">
            <p style="margin: 0 0 10px; font-weight: bold;">🔗 Access everything:</p>
            <p style="margin: 0;"><a href="https://workbooks.blkbld.co" style="color: #fff; font-size: 18px;">workbooks.blkbld.co</a><br>
            📅 Access expires: ${formatDate(data.discount_end)}</p>
          </div>
          
          <p style="margin-top: 30px;"><strong>What you just unlocked:</strong></p>
          <ul>
            <li>✅ Workbook 0: Find Your White Space (your foundation)</li>
            <li>✅ Workbook 1: Brand Strategy Foundation</li>
            <li>✅ Workbook 2: Marketing Strategy Execution</li>
            <li>✅ Workbook 3: Growth & Measurement Systems</li>
            <li>✅ Workbook 4: Scaling Systems</li>
            <li>✅ 47 AI prompts across all workbooks</li>
            <li>✅ Interactive frameworks that guide you step-by-step</li>
          </ul>
          
          <p style="margin-top: 30px;"><strong>Your path forward:</strong></p>
          <ul>
            <li><strong>Week 1-2:</strong> Complete Workbook 1 (Brand Strategy)</li>
            <li><strong>Week 3-4:</strong> Complete Workbook 2 (Marketing Strategy)</li>
            <li><strong>Week 5-6:</strong> Complete Workbook 3 (Growth Systems)</li>
            <li><strong>Test your growth system then:</strong> Complete Workbook 4 (Scaling Systems)</li>
          </ul>
          
          <p style="margin-top: 20px; font-style: italic;">Start with Workbook 1—it builds directly on the validation you completed in Workbook 0.</p>
          
          <a href="https://workbooks.blkbld.co" class="button">ACCESS YOUR WORKBOOKS →</a>
          
          <p style="margin-top: 30px;">I can't wait to see what you build.</p>
          <p>Whether you're establishing thought leadership or launching a business—you now have the strategic system to do it right.</p>
          
          <p style="margin-top: 20px;">Tag @JoselineBiz with your progress. I share breakthrough moments in my stories.</p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. You made a smart investment. Most entrepreneurs guess their way through this. You have a proven system.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,

  "single-workbook-upgrade": (data) => `
    <!DOCTYPE html>
    <html><head><style>${emailStyles}</style></head><body>
      <div class="container">
        <div class="content">
          <p>Hey ${data.firstName},</p>
          <h1>You bought Workbook ${data.workbook_number}—complete the system?</h1>
          <p>I noticed you grabbed Workbook ${data.workbook_number} (smart move!).</p>
          <p><strong>Quick question:</strong> Do you want the complete strategic system?</p>
          
          <p style="margin-top: 30px;">Here's the thing:</p>
          <p>Each workbook is powerful on its own. But the real transformation happens when they all work together:</p>
          
          <ul>
            <li><strong>Workbook 0</strong> → Validates your opportunity</li>
            <li><strong>Workbook 1</strong> → Builds your brand foundation</li>
            <li><strong>Workbook 2</strong> → Creates systematic marketing</li>
            <li><strong>Workbook 3</strong> → Measures and optimizes growth</li>
            <li><strong>Workbook 4</strong> → Scales sustainably</li>
          </ul>
          
          <p><strong>Each one builds on the last. No scattered tactics. Complete strategic progression.</strong></p>
          
          <div class="details-box">
            <p style="margin: 0 0 15px; font-weight: bold;">Your exclusive upgrade pricing (until Friday midnight):</p>
            <p style="margin: 0;">Complete bundle: <strong>$${data.upgrade_price}</strong> more (you already paid $${data.amount_paid})<br>
            Regular bundle price: <strong>$297</strong><br>
            Your total savings: <strong>$168</strong></p>
          </div>
          
          <a href="https://workbooks.blkbld.co" class="button">UPGRADE TO COMPLETE SYSTEM ($${data.upgrade_price}) →</a>
          
          <p style="margin-top: 30px;"><strong>Why upgrade now?</strong></p>
          <p>Because systematic beats scattered. You started with one workbook—finish with the complete blueprint.</p>
          
          <p style="margin-top: 20px;">Your exclusive pricing expires ${formatDate(data.discount_end)} at 11:59 PM CST.</p>
          
          <p style="margin-top: 30px;">Let's build,<br><strong>Joseline, MBA</strong></p>
          <p style="font-size: 14px; color: #999;">P.S. After Friday, the bundle goes back to $297. Don't pay full price later when you can complete it now for $${data.upgrade_price}.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} BLK BLD. All rights reserved.</div>
      </div>
    </body></html>
  `,
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, template, subject, data = {} } = await req.json();

    // Validate required fields
    if (!to || !template || !subject) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: to, template, and subject are required" 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    if (!emailRegex.test(to)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if template exists
    const templateFn = templates[template];
    if (!templateFn) {
      return new Response(
        JSON.stringify({ 
          error: `Template '${template}' not found`,
          availableTemplates: Object.keys(templates)
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate email HTML from template
    const html = templateFn(data);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Joseline <hello@blkbld.co>",
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", {
      to,
      template,
      subject,
      emailId: emailResponse.data?.id,
    });

    return new Response(
      JSON.stringify({
        sent: true,
        emailId: emailResponse.data?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    // Check if it's a rate limit error
    if (error.message?.includes("rate limit")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
