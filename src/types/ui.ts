import type { MouseEvent } from 'react'

export interface NavigationItem {
  path: string
  label: string
}

export interface NavbarProps {
  scrolled: boolean
}

export interface ScrollState {
  progress: number
  scrolled: boolean
}

export interface ScrollProgressProps {
  progress: number
}

export type DialogClickEvent = MouseEvent<HTMLDialogElement>
