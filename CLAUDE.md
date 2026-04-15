# Alvie Foundation Studio - Operational Guide

This file contains operational commands and environment setup for the Alvie Foundation Studio project.

**⚠️ CRITICAL INSTRUCTION FOR CLAUDE:** For architectural rules, design system guidelines (colors, typography, animations), and behavioral coding standards, **you MUST use the `alvie-studio-dev` skill**. 
*(Claude: Whenever the user asks to create new UI components, fix UI bugs, or implement features using React/Tailwind, activate the `alvie-studio-dev` skill and thoroughly read the documents in the `references/` folder before proceeding).*

## Tech Stack
- **Core:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend/Database:** Supabase
- **Package Manager:** Bun
- **Testing:** Vitest, Playwright

## Development Commands

### 1. Install Dependencies
```bash
bun install