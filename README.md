# भारतीय डाक योजनाएं (React 19 + React Router 7)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```
Node 20.19+ chahiye (Vite 7).

## Routes
| Path | Page |
|---|---|
| `/` | Home: Hero, Stats, Schemes, Calculator, Comparison |
| `/goals` | Goal filter + scheme cards (`?goal=tax`) |
| `/calculator?scheme=ssy` | Live return calculator |
| `/compare` | Comparison table |
| `/tax-benefits` | 80C / tax status per scheme |
| `/faq` | FAQ accordion |
| `/schemes/:schemeId` | Scheme detail |
| `*` | 404 |

## Calculator logic (India_Post_Schemes_Math_and_Logic.txt)
Har scheme ka apna engine (`src/calc/`) aur apna panel/layout (`features/calculator/panels/`):

| Scheme | Logic |
|---|---|
| TD 1/2/3/5Y | quarterly compounding, interest **paid out yearly**, no reinvest + premature closure |
| RD | monthly annuity-due, quarterly compounding, advance-deposit rebate + premature closure |
| NSC | `P(1+r)^5` + year-wise accretion, 80C on yr 1-4 interest |
| KVP | fixed 115 months, maturity = 2P, shows exact `ln2/ln(1+r)` |
| PPF / SSY | FY cycle, 5th-of-month rule, monthly paise accrual, SSY deposits only 15 yrs |
| POMIS / SCSS | simple interest payouts (monthly / quarterly, first-quarter pro-rata) + premature closure |
| POSA | 10th-of-month rule, Rs 500 zero-out, annual credit |

Rates / limits: `src/data/calcConfig.js` (Q3 FY 2026-27). Quarterly update sirf yahin karna hai.

## 3D (three.js)
- Hero: India Post pillar box, 5 airmail envelopes orbiting it, passbook, ₹ coins (pointer parallax + scroll).
- Calculator: 3D coin stacks, silver = principal, gold = interest, coins drop in/out as values change.
- `src/three/`: `Stage.jsx` (renderer, studio lighting, shadows, resize, pause when off-screen, dispose),
  `models/` (pillarBox, envelope, coin, passbook), `scenes/`, `textures.js` (canvas textures), `materials.js`.
- three.js alag chunk me lazy-load hota hai. WebGL na ho / error aaye to purana 2D SVG fallback dikhta hai.
- `prefers-reduced-motion`: animation band, ek static frame render hota hai.

### Blender se banaya hua model lagana
1. Blender me model banao: 1 unit ~ 1 metre, base origin pe, **+Y up** (export me "+Y Up" on).
2. File > Export > glTF 2.0 > **glTF Binary (.glb)**, "Apply Modifiers" on, materials on.
3. File ko `public/models/postbox.glb` (ya `passbook.glb`) me rakho.
4. `src/three/modelConfig.js` me path set karo: `postBox: '/models/postbox.glb'`.
   Model automatically scale/centre hoke procedural model ki jagah load hoga. Fail hua to procedural wapas.

## Structure
```
src/
  router.jsx              route table (lazy pages)
  layouts/RootLayout.jsx  announcement bar + navbar + <Outlet/> + footer
  pages/                  thin route components
  features/               home | schemes | calculator | compare | tax
  components/ui/          Button, Badge, Icon, RangeSlider, SectionHeading
  components/layout/      AnnouncementBar, Navbar, Footer, Logo
  hooks/                  useGoalFilter (URL state), useCalculator, usePageTitle
  data/                   schemes, goals, stats, nav, faq  (edit rates here)
  utils/                  calc.js, format.js
  styles/                 tokens.css, global.css
```
Rates/rules `src/data/schemes.js` me ek hi jagah hain. Har quarter update karein.
Hero image: `features/home/PassbookArt.jsx` placeholder SVG hai, asli photo se replace karein.
