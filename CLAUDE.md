# Development Guidelines for Games Hub

## Package Manager

**ALWAYS use pnpm** - Never use npm or yarn
- Commands: `pnpm install`, `pnpm dev`, `pnpm build`
- Lock file: `pnpm-lock.yaml`

## Git Commit Guidelines

**NO CO-AUTHOR references** - Never add "Co-authored-by: Claude" or similar
- NO AI references in commit messages
- Write commits as if made by a human developer
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

### Examples:
✅ `feat: add game library grid component`
✅ `fix: resolve game search filtering issue`
✅ `chore: update dependencies`
❌ `feat: add game components (with Claude assistance)`
❌ `Co-authored-by: Claude <claude@anthropic.com>`

## Lean & XP Principles (MANDATORY)

- **Simplest thing that works** - No over-engineering
- **YAGNI (You Aren't Gonna Need It)** - Don't add features not explicitly requested
- **Small iterations** - Implement minimal viable version first
- **Refactor continuously** - Clean code as you go
- **Test-driven when critical** - At least error handling tests
- **User stories first** - Always think "As a gamer, I want to..."

## Pre-Commit Refactor Check (MANDATORY)

**BEFORE every commit, perform a refactor assessment:**

1. **Code Quality Check**
   - Are there any duplicated patterns in the new code?
   - Can any new components/functions be simplified or extracted?
   - Are there magic numbers or hardcoded strings that should be constants?
   - Is the code following existing patterns and conventions?

2. **Performance & Maintainability**
   - Are there unnecessary re-renders or expensive operations?
   - Can any complex logic be broken down into smaller functions?
   - Are TypeScript types properly defined (no `any` usage)?
   - Is error handling consistent across similar components?

3. **Testing & Documentation**
   - Do the changes maintain existing test coverage?
   - Are new utilities/components covered by tests if critical?
   - Is the code self-documenting or does it need comments?

4. **Integration Review**
   - Does the new code integrate well with existing components?
   - Are there opportunities to reuse existing utilities/components?
   - Does it follow the established file structure and naming conventions?

**If any refactoring is needed, do it BEFORE the commit. Keep the commit focused and clean.**

## Git Workflow (MANDATORY)

**ALWAYS show files before committing:**

1. **Show Git Status** - Run `git status` to display all modified/added/deleted files
2. **Show File Changes** - Run `git diff` for staged changes and `git diff --staged` if needed
3. **Review Files** - Present the list of files that will be included in the commit
4. **Confirm Changes** - Let user review what will be committed before executing `git commit`

This ensures transparency and allows review of exactly what changes are being committed to the repository.

## Development Commands

- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Lint code**: `pnpm lint`
- **Run E2E tests**: `pnpm test:e2e`
- **Preview production build**: `pnpm preview`

## Pre-Commit Testing (MANDATORY)

**BEFORE every commit, ALL tests must pass:**

1. **Run lint**: `pnpm lint` - Must pass with zero errors
2. **Run build**: `pnpm build` - Must complete successfully  
3. **Run E2E tests**: `pnpm test:e2e` - All tests must pass

**NO exceptions.** If any command fails, fix the issues before committing. This ensures:
- Code quality and consistency
- No broken functionality reaches production
- CI pipeline always succeeds
- Deployment process runs smoothly

The CI pipeline will fail if these standards aren't met locally first.