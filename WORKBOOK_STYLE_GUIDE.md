# Workbook Style Guide
## Formatting Standards for Workbooks 1-4

This guide documents the design system established in Workbook 0. Use this as a reference when updating Workbooks 1-4 to ensure consistent formatting across all workbooks.

---

## Typography

### Headers

**H1 - Page Title**
```tsx
<h1 className="text-3xl font-bold mb-8">
  Workbook Title
</h1>
```

**H2 - Major Section Headers (Collapsible)**
```tsx
<h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
  <span>Step 1 of 3: Section Name</span>
  <ChevronDown className="h-6 w-6 transition-transform duration-200" />
</h2>
```

**H3 - Subsection Headers with Step Numbers**
```tsx
<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
    1
  </span>
  Subsection Title <span className="text-sm text-muted-foreground font-normal">(3 min)</span>
</h3>
```

**H3 - Standard Subsection Headers**
```tsx
<h3 className="text-xl font-bold mb-4">
  Subsection Title
</h3>
```

**H4 - Minor Headers**
```tsx
<h4 className="text-lg font-semibold mb-4">
  Minor Section Title
</h4>
```

### Body Text

**Standard Prompts/Instructions**
```tsx
<p className="text-muted-foreground mb-6">
  Fill each box in 90 seconds. First thought = best thought.
</p>
```

**Small Text**
```tsx
<p className="text-sm text-muted-foreground">
  Additional context or helper text
</p>
```

**Italic Text**
```tsx
<p className="text-sm italic text-muted-foreground">
  Example or note text
</p>
```

---

## Color Palette

### CSS Variables (from index.css)

**Primary Green (Forest Green)**
- Light mode: `--primary: 158 28% 16%` (#1e322b)
- Dark mode: `--primary: 158 28% 25%`
- Usage: Main brand color, primary buttons, accents

**Emerald Green (Success/Complete)**
- Light mode: `--emerald: 174 100% 17%` (#005951)
- Dark mode: `--emerald: 174 100% 22%`
- Usage: Section Complete boxes, success states

**Gold/Copper (Attention)**
- Light mode: `--gold: 31 36% 46%` (#B8834C)
- Dark mode: `--gold: 31 36% 56%`
- Usage: "Stuck?" callouts, important highlights

**Muted (Backgrounds)**
- Light mode: `--muted: 0 0% 94%`
- Dark mode: `--muted: 0 0% 18%`
- Usage: Card backgrounds, subtle sections

**Accent**
- Same as primary
- Usage: Borders, Quick Tips

### Usage in Components

**Primary elements:** `bg-primary`, `text-primary`, `border-primary`
**Emerald success:** `bg-emerald/10`, `border-emerald`, `text-emerald`
**Gold attention:** `bg-gold/10`, `border-gold`, `text-gold`
**Muted backgrounds:** `bg-muted/30`, `text-muted-foreground`

---

## Spacing Standards

### Vertical Spacing

**Between major sections:** `mb-8`
**Between subsections:** `mb-6`
**Between elements:** `mb-4`
**Between small elements:** `mb-3`, `mb-2`

### Padding

**Large cards:** `p-8`
**Medium cards:** `p-6`
**Small cards/callouts:** `p-4`

### Gaps

**Flex/Grid gaps:** `gap-2`, `gap-3`, `gap-4`

---

## Component Patterns

### Collapsible Sections

```tsx
<Collapsible>
  <Card className="p-8 mb-8">
    <CollapsibleTrigger className="w-full">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
        <span>Step 1 of 3: Section Name</span>
        <ChevronDown className="h-6 w-6 transition-transform duration-200" />
      </h2>
    </CollapsibleTrigger>
    
    <CollapsibleContent>
      {/* Content here */}
    </CollapsibleContent>
  </Card>
</Collapsible>
```

### Quick Tip Boxes

```tsx
<div className="mb-6 p-4 bg-accent/10 border-l-4 border-accent rounded">
  <p className="font-semibold mb-1">Quick Tip:</p>
  <p className="text-sm text-muted-foreground">
    Tip content here
  </p>
</div>
```

### Stuck? Callout Boxes (Gold/Copper)

```tsx
<div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
  <p className="text-sm font-medium text-gold">💡 Stuck? Stop. Call 3 to 5 potential customers today.</p>
</div>
```

### Section Complete Boxes (Emerald)

```tsx
<div className="mt-8 p-4 bg-emerald/10 border-l-4 border-emerald rounded">
  <p className="font-semibold mb-1 text-emerald">Section Complete:</p>
  <p className="text-sm text-muted-foreground">
    Summary of what was accomplished
  </p>
</div>
```

### Information/Context Boxes

```tsx
<div className="mb-6 p-4 bg-muted/30 border-l-4 border-muted rounded">
  <p className="font-semibold mb-1">Why This Matters:</p>
  <p className="text-sm text-muted-foreground">
    Explanation text
  </p>
</div>
```

### Decision/Important Boxes

```tsx
<div className="bg-background p-4 rounded border-2 border-muted">
  <p className="font-semibold mb-2">Decision:</p>
  <ul className="space-y-1 text-sm">
    <li>• 25-30: Full speed → Workbook 1</li>
    <li>• 20-24: Solid foundation</li>
  </ul>
</div>
```

### Response Cues Boxes

```tsx
<div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
  <p className="font-semibold mb-2">Response Cues:</p>
  <ul className="space-y-2 text-sm">
    <li className="flex items-start gap-2">
      <span className="text-accent">✓</span>
      <span>Item text</span>
    </li>
  </ul>
</div>
```

### Example Boxes

```tsx
<ExampleBox
  icon="🏪"
  title="Business Example"
  content="Example content here..."
/>
```

### AI Prompt Cards

```tsx
<AIPromptCard
  title="AI Prompt: Title"
  context="Use this when..."
  prompt={`Your prompt text here...`}
/>
```

### Numbered Step Badges

```tsx
<span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
  1
</span>
```

---

## Form Elements

### Input Fields

```tsx
<div>
  <Label htmlFor="field-id">Field Label</Label>
  <Input 
    id="field-id" 
    placeholder="Placeholder text"
    value={value}
    onChange={(e) => updateValue(e.target.value)}
  />
</div>
```

### Textarea Fields

```tsx
<div>
  <Label htmlFor="textarea-id">Field Label</Label>
  <Textarea 
    id="textarea-id" 
    rows={3}
    placeholder="Placeholder text"
    value={value}
    onChange={(e) => updateValue(e.target.value)}
  />
</div>
```

### Checkboxes

```tsx
<label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
  <input type="checkbox" className="w-5 h-5 mt-0.5" />
  <span className="text-sm">Checkbox label text</span>
</label>
```

---

## Card Layouts

### Standard Section Card

```tsx
<Card className="p-8 mb-8">
  {/* Content */}
</Card>
```

### Gradient Highlight Card

```tsx
<Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary">
  {/* Content */}
</Card>
```

### Muted Background Card

```tsx
<Card className="p-8 mb-8 bg-gradient-to-br from-muted/50 to-muted/20 border-2 border-muted">
  {/* Content */}
</Card>
```

### Small Input Card

```tsx
<Card className="p-4 bg-muted/30">
  {/* Form fields */}
</Card>
```

---

## Lists and Bullets

### Unordered Lists

```tsx
<ul className="space-y-2 text-muted-foreground">
  <li>• List item with bullet</li>
  <li>• Another item</li>
</ul>
```

### Numbered Lists

```tsx
<ol className="space-y-3 mb-4">
  <li className="flex items-start gap-3">
    <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
    <div>
      <p className="font-semibold">Item title</p>
      <p className="text-sm text-muted-foreground">Item description</p>
    </div>
  </li>
</ol>
```

### Checkmark Lists

```tsx
<ul className="space-y-2 text-sm">
  <li className="flex items-start gap-2">
    <span className="text-accent mt-1">✓</span>
    <span>Item text</span>
  </li>
</ul>
```

---

## Grid Layouts

### Two Column Grid

```tsx
<div className="grid md:grid-cols-2 gap-4">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
</div>
```

### Three Column Grid

```tsx
<div className="grid md:grid-cols-3 gap-4">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
  <div>{/* Column 3 */}</div>
</div>
```

---

## Buttons

### Primary Button

```tsx
<Button variant="hero" size="lg">
  Button Text
</Button>
```

### Outline Button

```tsx
<Button variant="outline" size="lg">
  Button Text
</Button>
```

### Button with Icon

```tsx
<Button onClick={handleClick} size="lg" className="gap-2">
  <Save className="w-5 h-5" />
  Save All Changes
</Button>
```

---

## Icons

### Lucide Icons Usage

Common icons used:
- `<Save />` - Save actions
- `<Download />` - Download actions
- `<ChevronDown />` - Collapsible indicators
- `<PartyPopper />` - Celebration/completion

Standard icon size: `w-5 h-5` or `w-6 h-6`

---

## Best Practices

### DO:
✓ Use semantic color tokens (primary, emerald, gold, muted)
✓ Maintain consistent spacing (mb-8 for sections, mb-6 for subsections)
✓ Use border-l-4 for all callout boxes
✓ Include time estimates in subsection headers: `(3 min)`
✓ Use text-muted-foreground for body text and prompts
✓ Make all major sections collapsible with ChevronDown icon
✓ Include Section Complete boxes at the end of each major section

### DON'T:
✗ Use direct colors like text-white, bg-black, text-gray-500
✗ Mix spacing patterns (stick to mb-8, mb-6, mb-4, mb-3, mb-2)
✗ Use different border styles for callout boxes
✗ Make prompts/instructions bold or larger than text-muted-foreground
✗ Skip the emerald Section Complete summaries
✗ Use italic for prompts (only for examples and special notes)

---

## Quick Reference Checklist

When formatting a workbook, ensure:

- [ ] All major sections use collapsible cards with proper H2 headers
- [ ] Subsections use H3 with numbered badges and time estimates
- [ ] All prompts/instructions use: `text-muted-foreground mb-6`
- [ ] Quick Tips use accent color: `bg-accent/10 border-l-4 border-accent`
- [ ] Stuck boxes use gold: `bg-gold/10 border-l-4 border-gold`
- [ ] Section Complete uses emerald: `bg-emerald/10 border-l-4 border-emerald`
- [ ] Consistent spacing: sections (mb-8), subsections (mb-6), elements (mb-4)
- [ ] Card padding: large (p-8), medium (p-6), small (p-4)
- [ ] No direct color values - only semantic tokens
- [ ] All form fields have proper Label components

---

## File Structure Reference

### Components to Import

```tsx
import { Link } from "react-router-dom";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ExampleBox } from "@/components/ExampleBox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Save, Download } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";
```

### Color Configuration (index.css)

```css
--primary: 158 28% 16%;      /* Forest green */
--emerald: 174 100% 17%;     /* Success green #005951 */
--gold: 31 36% 46%;          /* Copper/attention #B8834C */
--accent: 158 28% 16%;       /* Same as primary */
--muted: 0 0% 94%;           /* Light backgrounds */
```

---

## Contact

For questions or clarifications on this style guide, refer to Workbook 0 source code or contact the project maintainer.

Last Updated: 2025
