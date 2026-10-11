import { Component, type ReactNode } from 'react'
import { toDomainError } from '../db/errors'

interface State {
  message: string | null
}

export class StorageErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { message: null }

  static getDerivedStateFromError(error: unknown): State {
    return { message: toDomainError(error).message }
  }

  render() {
    if (this.state.message) {
      return (
        <main className="shell">
          <div role="alert" className="banner banner-error">
            <strong>Local storage could not be opened.</strong>
            <p>{this.state.message}</p>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
