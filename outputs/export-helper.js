const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../out');
const destDir1 = path.resolve('C:/Users/Charm Constantino/Documents/homepage-static-export');
const destDir2 = path.resolve(__dirname, 'homepage-static-export');

const destinations = [destDir1, destDir2];

console.log('Starting export process...');
console.log('Source Directory:', outDir);

// Helper function to recursively copy folders
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

const siteData = {
  "brand": {
    "name": "Mortgage by Q",
    "affiliation": "West Capital Lending",
    "founder": "Quyen \"Q\" Sy",
    "nmls": "1028669",
    "dre": "02350634",
    "phone": "(949) 536-7410",
    "address": "Orange County, California"
  },
  "usp": {
    "headline": "YOUR BANK OFFERS ONE RATE. I make 200+ lenders compete for yours.",
    "subheadline": "One quick application puts hundreds of lenders in a bidding war for your loan — so you get a lower rate, more options, and zero runaround."
  },
  "metrics": {
    "lendersCount": "200+",
    "familiesHelped": "2,500+",
    "typicalSavings": "$3,000+",
    "clientRating": "4.9★",
    "daysToClose": "30 days"
  },
  "services": [
    {
      "title": "Home Purchase",
      "subtitle": "First home or your next",
      "description": "A competitive rate with first-time-buyer programs and low-down options — from FHA 3.5% to conventional."
    },
    {
      "title": "Refinance & Cash-Out",
      "subtitle": "Lower your rate or unlock equity",
      "description": "Shorten your term, reduce your payment, or turn equity into cash for renovations, investments, or debt consolidation."
    },
    {
      "title": "Non-QM & Self-Employed",
      "subtitle": "Bank-statement programs that work",
      "description": "Alt-income qualification for business owners, freelancers, and entrepreneurs the big banks routinely overlook."
    },
    {
      "title": "Investment & DSCR",
      "subtitle": "Grow your rental portfolio",
      "description": "Loans that use property rental income to qualify — not your personal tax returns. Scale without limits."
    },
    {
      "title": "Bridge Loans",
      "subtitle": "Buy before you sell",
      "description": "Flexible short-term financing so you can secure your next home before your current one closes — on your timeline."
    },
    {
      "title": "Foreign National",
      "subtitle": "Cross-border financing simplified",
      "description": "Overseas buyers and foreign nationals — we navigate the documentation and lender landscape so you can close."
    }
  ],
  "testimonials": [
    {
      "name": "Kerri M.",
      "location": "Rochester, WA",
      "rating": 5,
      "program": "Refinance",
      "savings": "$387/mo",
      "quote": "Quyen demonstrated incredible patience and thoroughly answered all my questions. His deep knowledge of refinance options was truly impressive. He found us a rate we could not believe was real. I have already referred him to three family members."
    },
    {
      "name": "Andy T.",
      "location": "Thousand Oaks, CA",
      "rating": 5,
      "program": "Home Purchase",
      "savings": "First Home",
      "quote": "Great group of people to work with — painless and quick. They told us exactly what they needed and made it so simple. Closed in 22 days. Could not have asked for a smoother process from application to keys in hand."
    },
    {
      "name": "Laura M.",
      "location": "Royersford, PA",
      "rating": 5,
      "program": "Home Purchase",
      "savings": "VA Loan",
      "quote": "Quyen was wonderful to help get our loan. Great communication from start to finish. Highly recommend him to anyone looking to purchase a home or refinance. His team is extremely professional and responsive at every step."
    },
    {
      "name": "David R.",
      "location": "Irvine, CA",
      "rating": 5,
      "program": "Non-QM",
      "savings": "Self-Employed",
      "quote": "As a self-employed borrower, I was told by two other lenders that I simply did not qualify. Quyen found a bank-statement program that got us approved at a great rate. He fought for us when no one else would."
    },
    {
      "name": "Sarah K.",
      "location": "San Diego, CA",
      "rating": 5,
      "program": "DSCR",
      "savings": "Investment Property",
      "quote": "I was buying my first investment property and had no idea DSCR loans existed. Quyen walked me through everything. Closed with zero personal income docs required. Incredible expertise and genuine care for his clients."
    }
  ],
  "faqs": [
    {
      "question": "Broker or bank — what's the real difference?",
      "answer": "A retail bank can only offer its own internal loan products and rates. A mortgage broker is independent, acting as an intermediary to access wholesale rates from hundreds of different banks. Brokers shop around for you, matching your file to the best deal."
    },
    {
      "question": "Will checking my options hurt my credit?",
      "answer": "No. When we run initial scenarios, we perform a soft inquiry (soft credit pull). This allows us to access your scores and credit history without negatively impacting your credit score."
    },
    {
      "question": "How much can I borrow?",
      "answer": "Your borrowing power depends on your debt-to-income (DTI) ratio, credit scores, employment status, down payment size, and the loan program type (e.g., conventional vs. DSCR vs. bank statement). We can calculate your maximum qualification in minutes."
    },
    {
      "question": "What documents do I need to apply?",
      "answer": "For traditional loans: standard tax returns (W-2s), recent paystubs, bank statements, and ID. For self-employed bank statement loans: 12-24 months of business or personal bank statements. For DSCR loans: no personal income verification, just property leases and rent rolls."
    },
    {
      "question": "How fast can I close?",
      "answer": "While banks take 45-60 days on average, our direct wholesale connection enables us to close conventional purchases in 21-30 days, and DSCR or bank-statement loans inside 3-4 weeks."
    }
  ]
};

destinations.forEach((destDir, index) => {
  console.log(`\nProcessing destination [${index + 1}]:`, destDir);

  // 1. Copy out directory to destDir
  try {
    console.log('Copying static build output...');
    copyFolderSync(outDir, destDir);
    console.log('Copy completed.');
  } catch (err) {
    console.error('Error copying files:', err);
    return;
  }

  // 2. Read and modify index.html to use relative paths
  const htmlPath = path.join(destDir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    console.log('Converting absolute asset paths to relative paths in index.html (including JSON payloads)...');
    
    // Replace absolute /_next paths with relative ./_next in HTML and JSON strings
    html = html.replace(/(['"])\/_next\//g, '$1./_next/');
    html = html.replace(/\\(['"])\/_next\//g, '\\$1./_next/');
    
    // Replace absolute /images paths with relative ./images in HTML and JSON strings
    html = html.replace(/(['"])\/images\//g, '$1./images/');
    html = html.replace(/\\(['"])\/images\//g, '\\$1./images/');
    
    // Replace absolute /favicon.ico with relative ./favicon.ico
    html = html.replace(/(['"])\/favicon.ico/g, '$1./favicon.ico');
    html = html.replace(/\\(['"])\/favicon.ico/g, '\\$1./favicon.ico');
    
    // Dynamically point all stylesheet preloads and links to the copied root style.css
    console.log('Redirecting Next.js stylesheet paths to root style.css...');
    html = html.replace(/href="\.\/_next\/static\/css\/[a-zA-Z0-9_]+\.css"/g, 'href="./style.css"');
    html = html.replace(/href='\\"\.\/_next\/static\/css\/[a-zA-Z0-9_]+\.css\\"'/g, "href='\"./style.css\"'");
    html = html.replace(/"\.\/_next\/static\/css\/[a-zA-Z0-9_]+\.css"/g, '"./style.css"');
    html = html.replace(/\\"\.\/_next\/static\/css\/[a-zA-Z0-9_]+\.css\\"/g, '\\"./style.css\\"');
    
    // Save modified index.html
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('index.html paths and stylesheets converted successfully.');
  } else {
    console.error('index.html not found in destination directory!');
  }

  // 3. Find and copy CSS to root style.css and index.css
  const cssSourceDir = path.join(destDir, '_next/static/css');
  if (fs.existsSync(cssSourceDir)) {
    const cssFiles = fs.readdirSync(cssSourceDir).filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      const mainCssFile = cssFiles[0];
      const srcCssPath = path.join(cssSourceDir, mainCssFile);
      
      const destCssPath1 = path.join(destDir, 'style.css');
      const destCssPath2 = path.join(destDir, 'index.css');
      
      fs.copyFileSync(srcCssPath, destCssPath1);
      fs.copyFileSync(srcCssPath, destCssPath2);
      console.log(`Copied main CSS file (${mainCssFile}) to root style.css and index.css`);
      
      // Fix absolute paths inside CSS files (for fonts, media, etc.)
      [destCssPath1, destCssPath2].forEach(cssPath => {
        let css = fs.readFileSync(cssPath, 'utf8');
        css = css.replace(/url\(\/_next\//g, 'url(./_next/');
        css = css.replace(/url\(\/images\//g, 'url(./images/');
        fs.writeFileSync(cssPath, css, 'utf8');
      });
      console.log('CSS font and asset paths converted to relative.');
    } else {
      console.warn('No CSS files found in _next/static/css');
    }
  } else {
    console.warn('_next/static/css directory not found');
  }

  // 4. Generate data.json
  const jsonPath = path.join(destDir, 'data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(siteData, null, 2), 'utf8');
  console.log('data.json created.');

  // 4.5 Recursive Path Fixing in destDir (CSS, JS chunks, HTML, JSON)
  console.log('Post-processing generated assets inside destination to fix absolute paths...');
  function fixPathsRecursively(dir) {
    if (!fs.existsSync(dir)) return;
    
    fs.readdirSync(dir).forEach(element => {
      const filePath = path.join(dir, element);
      
      if (fs.lstatSync(filePath).isDirectory()) {
        fixPathsRecursively(filePath);
      } else if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.json')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        // Convert any absolute "/_next/" paths to relative "./_next/" (preceded by quotes or escaped quotes)
        const newNextContent = content
          .replace(/(['"])\/_next\//g, '$1./_next/')
          .replace(/\\(['"])\/_next\//g, '\\$1./_next/');
        
        if (newNextContent !== content) {
          content = newNextContent;
          changed = true;
        }
        
        // Convert any absolute "/images/" paths to relative "./images/"
        const newImagesContent = content
          .replace(/(['"])\/images\//g, '$1./images/')
          .replace(/\\(['"])\/images\//g, '\\$1./images/');
        
        if (newImagesContent !== content) {
          content = newImagesContent;
          changed = true;
        }
        
        if (changed) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`  Updated paths in: ${path.relative(destDir, filePath)}`);
        }
      }
    });
  }
  fixPathsRecursively(destDir);
});

// 5. Generate data.json in homepage-mockup
const mockupJsonPath = path.resolve(__dirname, 'homepage-mockup/data.json');
fs.writeFileSync(mockupJsonPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('data.json created in homepage-mockup.');

console.log('\nExport helper process finished successfully for all destinations!');
