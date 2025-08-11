# Ethan Urbanky | Interactive Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**[VIEW LIVE PORTFOLIO](https://ethanurbanky.dev)**

*Next-generation portfolio with interactive animations and modern design*

</div>

---

## **The Vision**

> *"What if your portfolio wasn't just a website, but an interactive experience that tells your story?"*

This isn't just another developer portfolio. It's an **interactive showcase** where projects are displayed like apps, skills form visual connections, and your career journey unfolds through smooth animations. Built with modern web technologies and thoughtful UX design.

## **Key Features**

### **Modern Navigation**
- **Intuitive user experience** - Clean, gesture-driven interface
- **Keyboard shortcuts** - `G` for quick navigation overlay
- **Smooth scrolling** - Seamless transitions between sections
- **Responsive design** - Optimized for all devices

### **Interactive Project Showcase**
- **App Store Interface** - Projects displayed as interactive tiles
- **Detailed project modals** - In-depth exploration of each project
- **Live demos & repositories** - Direct access to working applications
- **Custom branding** - Professional logos and visual identity

### **Advanced Animations**
- **Particle background system** - 1000+ animated elements
- **Custom cursor effects** - Enhanced user interaction feedback
- **Performance optimized** - Smooth 60fps across all devices
- **GPU acceleration** - Hardware-accelerated animations

### **Modern Design System**
- **Dark-first aesthetic** - Built for the modern web
- **Neon accent colors** - Cyberpunk meets elegance
- **Subtle gradients** - Depth without distraction
- **Responsive perfection** - Pixel-perfect on every screen

## **Technology Stack**

<div align="center">

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 + TypeScript | Modern React with type safety |
| **Animation** | Framer Motion + GSAP | Physics-based interactions |
| **Styling** | Tailwind CSS | Utility-first design system |
| **Canvas** | HTML5 Canvas API | Particle systems & effects |
| **Deployment** | Vercel Edge | Global CDN delivery |
| **Testing** | Jest + React Testing Library | Quality assurance |

</div>

## **Project Showcase**

### **FinanceTrack** - *Full-Stack Financial Platform*
- **Tech**: Next.js, TypeScript, Supabase, Tailwind CSS
- **Features**: Real-time analytics, subscription management, tax tracking
- **Demo**: [Live Application](https://financetrack-personal.vercel.app)
- **Code**: [GitHub Repository](https://github.com/ethanurbanky2005/FinanceTrack.git)

### **UPick** - *ML-Powered Sports Platform*
- **Tech**: Python, React, Flask, Machine Learning
- **Features**: Predictive algorithms, real-time odds, data visualization
- **Innovation**: Advanced ML models with probability calibration
- **APIs**: OddsAPI, Sportradar integration

### **This Portfolio** - *Interactive Web Experience*
- **Tech**: Next.js, Framer Motion, Canvas API, TypeScript
- **Features**: Particle animations, gesture navigation, modern UI
- **Innovation**: Redefining portfolio experiences

## **Quick Setup**

```bash
# Clone the repository
git clone https://github.com/ethanurbanky2005/Ethan_Urbanky.git
cd Ethan_Urbanky

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## **Architecture Overview**

```
src/
├── app/                 # Next.js 15 App Router
├── components/          # UI Components
│   ├── AmbientNav.tsx   # Gesture navigation system
│   ├── AppStore.tsx     # Project showcase interface
│   ├── Cursor.tsx       # Magnetic cursor physics
│   ├── QuantumField.tsx # Particle animation engine
│   └── LifeJourney.tsx  # Timeline storytelling
├── config/              # Universe configuration
│   ├── portfolio.ts     # Content management
│   └── logos.ts         # Brand asset registry
└── styles/              # Design system
```

## **Design Philosophy**

### **Aesthetic Principles**
- **Minimal Maximalism** - Complex beauty through simple elements
- **Dark Mode Native** - Designed for the modern digital experience
- **Kinetic Typography** - Text that moves with purpose
- **Breathing Interfaces** - UI that feels alive

### **Interaction Design**
- **Gesture-First** - Natural, intuitive movements
- **Contextual Feedback** - Every action has a reaction
- **Spatial Awareness** - 3D thinking in 2D space
- **Performance Poetry** - Smooth as silk, fast as light

## **Known Issues & Fixes**

This section documents identified issues and their planned fixes for improved user experience across all platforms.

### **Mobile iOS Formatting Issues**

#### **Issue: Layout Breaking Past "The Journey" Section**
- **Component**: `src/components/LifeJourney.tsx`
- **Problem**: iOS Safari viewport handling causes layout shifts and spacing issues after the timeline section
- **Root Cause**: CSS viewport units (`vh`) behave inconsistently on iOS, especially with Safari's dynamic toolbar
- **Impact**: Timeline cards may overflow, text becomes misaligned, and scroll behavior becomes erratic
- **Planned Fix**: 
  - Replace `h-screen-safe` classes with iOS-compatible viewport calculations
  - Implement `dvh` (dynamic viewport height) units with fallbacks
  - Add iOS-specific media queries for Safari browser detection
  - Optimize touch scroll behavior for timeline navigation

#### **Issue: Responsive Breakpoint Inconsistencies**
- **Component**: Global layout system
- **Problem**: Tailwind responsive classes don't account for iOS Safari's collapsing address bar
- **Planned Fix**: Custom CSS variables for true viewport dimensions on iOS

### **Contact Section Issues**

#### **Issue: Phone Number Exposure in Let's Connect Section**
- **Component**: `src/app/page.tsx` (lines 228-240)
- **Problem**: Phone number `(647) 710-2061` publicly exposed in both desktop and mobile versions
- **Security Concern**: Direct phone access can lead to spam and privacy issues
- **Planned Fix**: 
  - Remove phone number card completely from contact grid
  - Restructure contact grid from 5 items to 4 items (Resume, Email, LinkedIn, GitHub)
  - Implement CSS Grid auto-fit for better responsive layout
  - Consider adding a contact form as alternative communication method

#### **Issue: Portfolio Button Should Link to Resume Instead of Website**
- **Component**: `src/app/page.tsx` (lines 170-183)
- **Current Behavior**: Portfolio button links to `https://ethanurbanky.dev` (the current website)
- **Problem**: Circular reference - portfolio linking to itself is not useful for visitors
- **Planned Fix**:
  - Change Portfolio button to "Resume" with document icon (📄)
  - Update href to `/resume.pdf` for direct PDF download
  - Change descriptive text from "ethanurbanky.dev" to "Download PDF"
  - Add `download="Ethan_Urbanky_Resume.pdf"` attribute for better file naming
  - Ensure resume.pdf is placed in `/public/` directory for proper serving

### **Story Timeline Issues**

#### **Issue: "Leadership & Growth" Story Point Formatting**
- **Component**: `src/components/LifeJourney.tsx` (line 53)
- **Problem**: Inconsistent spacing and typography hierarchy in the story card
- **Details**: 
  - Title uses ampersand which may not render consistently across fonts
  - Card padding doesn't match other timeline entries
  - Stats grid alignment issues on mobile devices
- **Planned Fix**:
  - Standardize title formatting with consistent character encoding
  - Normalize card padding using CSS custom properties
  - Implement responsive stats grid with `minmax()` for consistent spacing
  - Add typography scale consistency checks

### **Tech Constellation Component Issues**

#### **Issue: Proficiency Percentage Display**
- **Component**: `src/components/SkillConstellation.tsx` (line 217)
- **Problem**: Displaying raw proficiency percentages may appear boastful or inaccurate
- **Current Code**: `{skill.level}% proficiency`
- **Planned Fix**: 
  - Replace percentage with skill level descriptors: "Expert", "Advanced", "Proficient", "Familiar"
  - Create mapping function: 90-100% = "Expert", 80-89% = "Advanced", etc.
  - Improve tooltip visual hierarchy with better typography

#### **Issue: Tooltip Popup Positioning and Performance**
- **Component**: `src/components/SkillConstellation.tsx` (lines 208-225)
- **Problems**:
  - Collision detection is simplified and can cause overlapping tooltips
  - Mobile touch interactions don't properly dismiss tooltips
  - Z-index conflicts with other UI elements
  - Performance issues with hover states on mobile devices
- **Planned Fixes**:
  - Implement proper collision detection using element bounds
  - Add touch-friendly tap-to-show/hide tooltip behavior
  - Create tooltip manager with proper z-index stacking
  - Add viewport boundary detection to prevent tooltips from going off-screen
  - Implement tooltip queuing system for mobile devices

### **Content and UX Issues**

#### **Issue: Sentence Clarity and Flow**
- **Components**: Various throughout the portfolio
- **Problems Identified**:
  - Technical jargon without sufficient context for non-technical audiences
  - Long sentences that could be broken down for better readability
  - Inconsistent tone between sections (academic vs. professional vs. casual)
- **Planned Improvements**:
  - Rewrite technical descriptions with broader audience appeal
  - Break complex sentences into digestible chunks
  - Standardize tone to professional yet approachable
  - Add progressive disclosure for technical details

#### **Issue: Spacing Between "Ready for What's Next" and Tech Constellation**
- **Components**: `src/components/LifeJourney.tsx` (lines 233-239) and `src/app/page.tsx` (line 152)
- **Problem**: Insufficient visual separation causing sections to feel cramped
- **Details**:
  - LifeJourney final message doesn't have enough bottom padding
  - Skills section lacks proper top margin
  - Snap scroll behavior can cause jarring transitions
- **Planned Fix**:
  - Add consistent section padding using CSS custom properties
  - Implement smooth transition zones between major sections
  - Optimize snap scroll points for better flow
  - Add visual separators or gradient transitions between sections

### **Performance and Accessibility Fixes**

#### **Issue: Animation Performance on Lower-End Devices**
- **Components**: Particle systems, constellation connections, timeline animations
- **Planned Optimizations**:
  - Implement `prefers-reduced-motion` respect
  - Add performance budgets for animation complexity
  - Provide fallback static layouts for devices with limited GPU acceleration

#### **Issue: Keyboard Navigation and Screen Reader Support**
- **Components**: Interactive elements throughout
- **Planned Improvements**:
  - Add proper ARIA labels and descriptions
  - Implement keyboard navigation patterns
  - Ensure proper focus management in dynamic content
  - Add skip links for complex interactive sections

---

*This issues list is actively maintained and updated as fixes are implemented. Each fix includes proper testing across devices and browsers before deployment.*

## **Future Features: The Exploration Manifesto**

> *"Portfolios should behave like landscapes, not filing cabets. Exploration beats instruction."*

This roadmap embodies the philosophy that drove this portfolio's creation: **exploration over performance, comprehension over clutter, respect over capture**. Each planned feature follows the principle that information should find you naturally, not trap you in navigation theater.

### **The Creative Blogging Constellation** 🌌
*Launching a new dimension of thought exploration*

#### **Blog as Living Landscape**
Transform traditional blogging into an **explorable thought-space** that mirrors the portfolio's constellation philosophy:

- **Thought Nodes**: Each blog post becomes a node in an expandable constellation
- **Conceptual Connections**: Visual links between related ideas, technologies, and experiences  
- **Temporal Flow**: Scrub through time to see how thoughts evolved and connected
- **Contextual Discovery**: From any post, press `G` to see the full thought-map with relationship strength indicators

#### **The Journey Blog Architecture** 
Following the anti-nav principle, posts organize around **journeys, not categories**:

```
Exploration Paths:
├── 🚀 Building in Public        # Project evolution stories
├── 🧠 Learning Loops           # Skill acquisition journeys  
├── 💡 Problem → Solution       # Engineering decision narratives
├── 🌟 Philosophy in Code       # Values translated to implementation
└── 🔮 Future Speculation       # Technology trend exploration
```

#### **Interactive Story Elements**
- **Code Playgrounds**: Embedded runnable examples that prove concepts
- **Before/After Diffs**: Visual code evolution with explanation overlays
- **Decision Trees**: Interactive exploration of "why this, not that" 
- **Constellation Zoom**: Deep-dive from blog post into related portfolio projects

### **Enhanced Portfolio Features** ✨

#### **Respect Mode Evolution**
Expanding accessibility beyond motion preferences:
- **Reader Mode**: Typography optimized for deep reading with increased line spacing
- **Focus Flow**: Gentle attention guidance without distracting animations
- **Cognitive Load Reducer**: Progressive disclosure of complex technical information
- **Ambient Intelligence**: Content adapts to reading pace and comprehension cues

#### **AI Collaboration Transparency** 🤖
Living demonstration of AI-assisted development philosophy:
- **AI Average Toggle**: One-click comparison showing "generic AI output" vs. deliberate design choices
- **Prompt Museum**: Curated collection of effective prompts with context and reasoning
- **Generation Archaeology**: Show the evolution from AI draft → human refinement → shipped feature
- **Specification Playground**: Interactive demonstration of how clear specs improve AI assistance

#### **Advanced Constellation Features** 🗺️
- **Memory Paths**: Locally learn visitor traversal patterns; suggest personalized exploration routes
- **Relationship Strength Visualization**: Dynamic edge thickness based on actual project interdependencies
- **Hidden Constellation**: Complete all sections to unlock a secret geometric pattern
- **Contextual Breadcrumbs**: Always know where you came from and where you might go next

#### **Project Evolution Timeline** 📈
- **Living Documentation**: Projects update with real deployment metrics and user feedback
- **Architecture Archaeology**: Explore how technical decisions evolved over time
- **Learning Extraction**: Each project distills key lessons and decision frameworks
- **Impact Measurement**: Real metrics on user engagement, performance, and business value

### **The Honest Flex Philosophy in Action** 💎

#### **Comprehension Over Volume**
Every new feature answers: *"Does this help visitors understand, or does it just impress?"*

- **One-Breath Rule**: Complex features must be explainable in a single, clear sentence
- **Progressive Disclosure**: Start simple, allow deeper exploration for those who want it
- **Performance as Ethics**: Speed improvements measured and celebrated like feature launches
- **Accessibility by Default**: Every interactive element works without JavaScript as a baseline

#### **Anti-Performance Theater**
- **Real Metrics Display**: Actual site performance, user feedback, and engagement data
- **Failure Transparency**: Document what didn't work and why it was removed
- **Decision Changelog**: Terse, dated notes on every design and technical choice
- **Constraint Documentation**: Show the limitations that shaped each creative solution

### **Technical Implementation Roadmap** 🛠️

#### **Phase 1: Foundation** *(v1.1)*
- [ ] Implement Respect Mode toggle with typography and motion controls
- [ ] Add local memory for visited constellation nodes
- [ ] Create hidden geometric pattern for completion
- [ ] Launch basic blog constellation with 5 initial thought-nodes

#### **Phase 2: Intelligence** *(v1.2)*  
- [ ] Deploy AI Average toggle with side-by-side comparison
- [ ] Implement contextual breadcrumb system
- [ ] Add relationship strength visualization to skills constellation
- [ ] Create interactive decision trees for major architectural choices

#### **Phase 3: Evolution** *(v1.3)*
- [ ] Launch project evolution timeline with real metrics
- [ ] Deploy prompt museum with effective AI collaboration examples
- [ ] Implement memory paths for personalized exploration suggestions
- [ ] Add time slider for portfolio evolution visualization

#### **Continuous: Philosophy in Practice**
- **Performance Budget Enforcement**: LCP < 1.8s, CLS ≈ 0, TTI < 2s maintained
- **Accessibility Testing**: Monthly audits with real assistive technology users
- **Content Quality Gates**: Every blog post must pass the "comprehension over clutter" test
- **User Feedback Integration**: Anonymous sentiment tracking informs iteration priorities

### **The Blogging Manifesto** 📝

#### **Writing Principles**
- **Show, Don't Tell**: Every technical claim backed by runnable code or measurable outcome
- **Context First**: Explain the constraint that made this solution necessary
- **Failure-Forward**: Document what didn't work; failure stories often teach more than success
- **Progressive Complexity**: Start with the core insight; layer in technical depth for those who want it

#### **Content Architecture**
- **Exploration Paths**: Non-linear reading experiences that reward curiosity
- **Conceptual Linking**: Ideas connect across posts through the constellation interface
- **Code Archaeology**: Show how implementations evolved, including dead ends and breakthroughs
- **Philosophy in Practice**: Demonstrate how values translate to specific technical decisions

### **Success Metrics That Matter** 📊

Instead of vanity metrics, measuring what aligns with the exploration philosophy:

- **Time-to-Meaning**: How quickly visitors find actionable insights
- **Voluntary Depth**: Percentage of visitors who explore beyond surface-level content
- **Path Diversity**: Number of unique traversal patterns through the constellation
- **Comprehension Sentiment**: Exit feedback focused on understanding rather than impression
- **Return Exploration**: Visitors who come back to explore new connections

### **The Long Game** 🎯

This isn't just a portfolio or blog—it's a **living laboratory** for human-computer interaction principles:

- **Influence Through Example**: Other developers adopting constellation navigation patterns
- **Open Source Philosophy**: Key interaction patterns released as reusable components  
- **Educational Impact**: Blog posts that change how people think about UX and AI collaboration
- **Industry Conversation**: Thought leadership on exploration-first design principles

---

*Each feature embodies the core thesis: exploration beats instruction, clarity beats spectacle, respect beats capture. The goal isn't to build more features—it's to build better ways for humans to explore, understand, and connect with ideas.*

## **Connect & Collaborate**

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-View_Live-blueviolet?style=for-the-badge)](https://ethanurbanky.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/ethan-urbanky)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/ethanurbanky2005)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:ethan.urbanky@gmail.com)

</div>



---

<div align="center">

**Designed, Coded, and Built by Ethan Urbanky**

*"Code is poetry written in logic"*

[![Stars](https://img.shields.io/github/stars/ethanurbanky2005/Ethan_Urbanky?style=social)](https://github.com/ethanurbanky2005/Ethan_Urbanky/stargazers)
[![Forks](https://img.shields.io/github/forks/ethanurbanky2005/Ethan_Urbanky?style=social)](https://github.com/ethanurbanky2005/Ethan_Urbanky/network/members)

</div>