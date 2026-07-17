# Page Refactor Template

Use this guide when refactoring a large page into a smaller, reusable structure similar to the settings experience.

## Goal

Break a monolithic page into:
- a thin page shell
- shared layout components
- section-specific components
- typed data structures
- shared UI helpers

## Recommended structure

src/
  pages/
    YourPage.tsx
  components/
    yourpage/
      YourPageShell.tsx
      common.tsx
      sections/
        SectionA.tsx
        SectionB.tsx
  types/
    yourpage/
      common.ts
      sectionA.ts
      sectionB.ts

## Refactor workflow

1. Identify the page responsibilities
   - Separate navigation, layout, forms, cards, actions, and data loading.

2. Create a page shell
   - Keep the page component small.
   - Move header, tabs, sidebar, and content container into a reusable shell.

3. Split the content into sections
   - Each major area should become its own component.
   - Keep each section focused on one concern.

4. Extract shared UI helpers
   - Reusable cards, toggles, form fields, save bars, section headings, etc.
   - Place them in a shared common file.

5. Move types into dedicated files
   - Define common props/types in a common type file.
   - Add section-specific types for each feature area.

6. Keep state wiring lightweight
   - Let the page choose the active section.
   - Let each section manage its own local state where appropriate.

7. Verify after each step
   - Run the build or typecheck.
   - Fix issues before continuing.

## Example page pattern

### Page file
- Keep this as the routing entry point.
- Use a small switch or state-based selection to render the active section.

### Shell component
- Contains shared structure.
- Accepts active section, tab selection, and children.

### Section components
- Each handles one part of the page experience.
- They should be self-contained and easy to reason about.

### Shared helpers
- Put reusable UI elements in a common module.
- Avoid copy-pasting the same card/form markup.

## Rules of thumb

- If a component is over 200 lines, split it.
- If a file mixes layout, state, and data fetching, split it.
- If a UI pattern repeats 2+ times, extract it.
- If the page has many tabs/sections, use a shell + section architecture.

## Checklist

- [ ] Page file is reduced to routing and state selection
- [ ] Shell handles structure and navigation
- [ ] Each section is isolated in its own file
- [ ] Repeated UI is extracted to shared helpers
- [ ] Types are moved out of the page file
- [ ] Build/typecheck passes
