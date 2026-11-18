import type { ChangeEvent, FormEvent } from 'react'
export interface ProjectItem { id: string; title: string; description: string; technologies: string[]; url: string; image: string | null; alt: string; linkLabel: string }
export interface ProjectCardProps { project: ProjectItem }
export interface ContactValues { nombre: string; email: string; asunto: string; mensaje: string }
export type ContactChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type ContactSubmitEvent = FormEvent<HTMLFormElement>
export interface ContactFormProps { prefix: string }
