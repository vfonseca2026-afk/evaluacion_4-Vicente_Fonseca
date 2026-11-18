import type { ReactNode } from 'react'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
}

export interface RepositoryCardProps {
  repository: GitHubRepo
}

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface RepositoriesResult extends FetchState<GitHubRepo[]> {
  retry: () => void
}

export interface RepositoryCache {
  data: GitHubRepo[]
  expiresAt: number
}

export interface StatusMessageProps {
  children: ReactNode
  error?: boolean
}
