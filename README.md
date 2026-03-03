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

> *"Portfolios should behave like landscapes, not filing cabinets. Exploration beats instruction."*

This roadmap embodies the philosophy that drove this portfolio's creation: **exploration over performance, comprehension over clutter, respect over capture**. Each planned feature follows the principle that information should find you naturally, not trap you in navigation theater.

### **Next-Generation Portfolio Features**
*Simple enhancements that respect the exploration philosophy*

#### **1. Project Evolution**
Projects show their learning journey, not just final results.

#### **2. Smart Contact**
Contact method suggested based on what you explored.

#### **3. Skill Connections**
Hover any skill to see which projects actually used it.

#### **4. Timeline Branches**
Click any career moment to see alternate paths considered.

#### **5. Code Samples**
Real snippets from projects with before/after improvements.

#### **6. Live Status**
Current availability and what you're actively learning.

#### **7. Context Memory**
Portfolio remembers your interests across visits (locally).

#### **8. Decision Stories**
One-sentence explanations for major technical choices.

#### **9. Working Style**
Clear preview of collaboration preferences and communication style.

#### **10. Learning Path**
Visual progression from project to project showing skill growth.

### **Enhanced Portfolio Features**

#### **Respect Mode Evolution**
Expanding accessibility beyond motion preferences:
- **Reader Mode**: Typography optimized for deep reading with increased line spacing
- **Focus Flow**: Gentle attention guidance without distracting animations
- **Cognitive Load Reducer**: Progressive disclosure of complex technical information
- **Ambient Intelligence**: Content adapts to reading pace and comprehension cues

#### **AI Collaboration Transparency**
Living demonstration of AI-assisted development philosophy:
- **AI Average Toggle**: One-click comparison showing "generic AI output" vs. deliberate design choices
- **Prompt Museum**: Curated collection of effective prompts with context and reasoning
- **Generation Archaeology**: Show the evolution from AI draft → human refinement → shipped feature
- **Specification Playground**: Interactive demonstration of how clear specs improve AI assistance

#### **Advanced Constellation Features**
- **Memory Paths**: Locally learn visitor traversal patterns; suggest personalized exploration routes
- **Relationship Strength Visualization**: Dynamic edge thickness based on actual project interdependencies
- **Hidden Constellation**: Complete all sections to unlock a secret geometric pattern
- **Contextual Breadcrumbs**: Always know where you came from and where you might go next

#### **Project Evolution Timeline**
- **Living Documentation**: Projects update with real deployment metrics and user feedback
- **Architecture Archaeology**: Explore how technical decisions evolved over time
- **Learning Extraction**: Each project distills key lessons and decision frameworks
- **Impact Measurement**: Real metrics on user engagement, performance, and business value

### **The Honest Flex Philosophy in Action**

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

### **Technical Implementation Roadmap**

#### **Phase 1: Creative Foundation** *(v1.1 - Living Laboratory)*
- [ ] **Respect Mode Evolution**: Advanced accessibility with reader mode and cognitive load reduction
- [ ] **Digital Art Gallery**: p5.js integration with generative art playground
- [ ] **Hidden Constellation Pattern**: Unlock secret geometry upon portfolio completion
- [ ] **Ambient Soundscapes**: Context-aware audio with respectful defaults
- [ ] **Local Memory System**: Constellation node visits and personalized exploration paths

#### **Phase 2: Interactive Experiences** *(v1.2 - Playground Phase)*
- [ ] **Algorithm Visualizer**: Real-time sorting, searching, and graph traversal animations
- [ ] **Physics Simulation Lab**: Editable gravity, collision, and particle systems
- [ ] **Code Poetry Generator**: Beautiful visualizations of algorithm logic
- [ ] **AI Average Toggle**: Side-by-side comparison of generic vs. deliberate design
- [ ] **Gesture Language System**: Custom swipe/pinch patterns for navigation

#### **Phase 3: Community Canvas** *(v1.3 - Collaborative Dimension)*
- [ ] **Visitor Constellation**: Anonymous exploration pattern visualization
- [ ] **Collaborative Pixel Art**: Real-time shared digital mural
- [ ] **Interactive Guest Book**: Beautiful signature and message system
- [ ] **Code Review Theatre**: Community-annotated algorithm walkthroughs
- [ ] **Voice Navigation**: "Show me React projects" → constellation adaptation

#### **Phase 4: Time Travel Interface** *(v1.4 - Temporal Dimension)*
- [ ] **Code Archaeology**: Beautiful git history diff visualizations
- [ ] **Skill Evolution Timeline**: Dynamic competency graphs across time
- [ ] **Decision Archaeology**: Interactive exploration of architectural choices
- [ ] **Project Lifecycle Stories**: Birth → deployment → retirement narratives
- [ ] **Future Prediction Engine**: ML-powered technology learning suggestions

#### **Phase 5: Educational Gaming** *(v1.5 - Learning Through Play)*
- [ ] **Debugging Detective**: Interactive code mystery solving
- [ ] **Architecture Sandbox**: Visual system design with real-time feedback
- [ ] **Performance Profiler Game**: Speed/memory optimization challenges
- [ ] **Security Escape Rooms**: Vulnerability discovery through puzzles
- [ ] **Concept Playground**: Drag-and-drop programming education

#### **Phase 6: Advanced Interactions** *(v1.6 - Boundary Pushing)*
- [ ] **AR Portfolio Cards**: QR code → floating 3D project previews
- [ ] **Biometric Ambience**: Heart rate responsive design (privacy-first)
- [ ] **Interactive Fiction**: Choose-your-adventure technical tutorials
- [ ] **Mini-Game Arcade**: Programming concept games
- [ ] **Shader Gallery**: WebGL experiments with real-time controls

#### **Phase 7: Creative Storytelling** *(v1.7 - Narrative Dimension)*
- [ ] **Developer Diary Comics**: Illustrated debugging adventure stories
- [ ] **Technical Fairy Tales**: Complex concepts through narrative
- [ ] **Code Haikus**: Minimal code with poetic explanations
- [ ] **Dialogue Tutorials**: Character-driven learning experiences
- [ ] **Music Theory Visualizer**: Interactive chord and scale exploration

#### **Phase 8: Advanced Analytics** *(v1.8 - Intelligence Layer)*
- [ ] **Prompt Museum**: Effective AI collaboration examples with context
- [ ] **Generation Archaeology**: AI draft → human refinement evolution
- [ ] **Specification Playground**: Interactive prompt quality demonstration
- [ ] **Real-time Metrics**: Performance, engagement, comprehension tracking
- [ ] **Sentiment Analysis**: Anonymous understanding vs. impression feedback

#### **Continuous: Philosophy in Practice**
- **Performance Budget Enforcement**: LCP < 1.8s, CLS ≈ 0, TTI < 2s across all creative features
- **Accessibility Testing**: Monthly audits ensuring all interactive experiences work with assistive technology
- **Creative Quality Gates**: Every feature must pass "exploration beats instruction" principle
- **User Feedback Integration**: Anonymous sentiment tracking with focus on comprehension over wow-factor
- **Privacy-First Innovation**: All biometric/tracking features with explicit opt-in and local processing
- **Open Source Extraction**: Key interaction patterns released as reusable components for community benefit

### **The Blogging Manifesto**

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

### **Success Metrics That Matter**

Instead of vanity metrics, measuring what aligns with the exploration philosophy:

- **Time-to-Meaning**: How quickly visitors find actionable insights
- **Voluntary Depth**: Percentage of visitors who explore beyond surface-level content
- **Path Diversity**: Number of unique traversal patterns through the constellation
- **Comprehension Sentiment**: Exit feedback focused on understanding rather than impression
- **Return Exploration**: Visitors who come back to explore new connections

### **Creative Technology Arsenal**

#### **Core Creative Stack**
- **Canvas & WebGL**: Three.js, p5.js, and custom shaders for visual experiences
- **Audio Integration**: Web Audio API, Tone.js for music theory and soundscapes
- **Real-time Communication**: WebSockets for collaborative features and live interactions
- **Computer Vision**: MediaPipe for gesture recognition and privacy-first eye tracking
- **Machine Learning**: TensorFlow.js for prediction engines and pattern recognition

#### **Advanced Interaction APIs**
- **Sensor Integration**: Device Motion API, Heart Rate API (privacy-first biometric responses)
- **Speech & Voice**: Web Speech API for voice navigation and audio storytelling
- **File System**: File System Access API for local creative project saving/loading
- **Clipboard Integration**: For seamless code sharing and creative asset exchange
- **PWA Features**: Service workers for offline creative experiences

#### **Creative Asset Pipeline**
- **Procedural Generation**: Algorithms for dynamic art, music, and visual content
- **Asset Optimization**: Dynamic loading for heavy creative content with performance budgets
- **Version Control Integration**: GitHub API for live code archaeology and evolution stories
- **Content Management**: Headless CMS for collaborative community features
- **Analytics & Insights**: Privacy-first visitor behavior patterns for experience optimization

### **The Long Game**

This isn't just a portfolio or blog—it's a **living laboratory** for the future of creative web experiences:

#### **Industry Influence**
- **Interaction Pattern Innovation**: Pioneering constellation navigation and gesture languages
- **Open Source Creative Tools**: Releasing reusable components for educational gamification
- **Design Philosophy Evangelism**: Demonstrating "exploration beats instruction" at scale
- **AI-Human Collaboration Models**: Transparent examples of thoughtful AI integration

#### **Educational Impact**
- **Interactive Learning Revolution**: Proving that code education can be playful and profound
- **Accessibility-First Creativity**: Showing that inclusive design enhances rather than limits innovation
- **Community-Driven Development**: Collaborative features that teach while they entertain
- **Privacy-Respecting Personalization**: Demonstrating local-first, user-controlled customization

#### **Creative Web Evolution**
- **Beyond Traditional Portfolios**: Inspiring a new generation of developer self-expression
- **Interdisciplinary Integration**: Bridging code, art, music, storytelling, and education
- **Performance as Art**: Optimized experiences that feel magical rather than technical
- **Sustainable Innovation**: Creative features that enhance understanding rather than distract

#### **Research & Development**
- **HCI Laboratory**: Testing new interaction paradigms with real user feedback
- **Creative Coding Education**: Developing better ways to teach programming through play
- **Accessibility Innovation**: Pushing boundaries of inclusive creative experiences
- **Ethics in Design**: Modeling responsible use of biometric data and AI assistance

---

*Each feature embodies the core thesis: exploration beats instruction, clarity beats spectacle, respect beats capture. The goal isn't to build more features—it's to build better ways for humans to explore, understand, and connect with ideas through creative, technological, and collaborative experiences.*

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