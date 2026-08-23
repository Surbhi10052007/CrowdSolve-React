/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: vite.config.js
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Vite bundler configuration with React plugin.
 * ====================================================================
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
