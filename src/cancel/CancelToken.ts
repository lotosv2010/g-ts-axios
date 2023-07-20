import { CancelExecutor, CancelTokenSource, Canceler, Cancel as ICancel } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: ICancel): void
}

export default class CancelToken {
  promise: Promise<ICancel>
  reason?: ICancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<ICancel>(resolve => {
      resolvePromise = resolve as ResolvePromise
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
