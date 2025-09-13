"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// The 'type' import is no longer needed in recent versions.
// We import the props directly from the main package.
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
