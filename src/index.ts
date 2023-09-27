export type Disposable = () => void;
export type AnyDisposable = Disposable | null | undefined | AnyDisposable[];

export function dispose(...disposables: AnyDisposable[]) {
  disposables.forEach((disposable) => {
    if (Array.isArray(disposable))
      disposable.forEach((disposable) => dispose(disposable));
    else disposable?.();
  });
}

export class Disposer {
  private items: AnyDisposable[][] = [];
  private running = false;

  public dispose(): void {
    if (this.running) throw new Error('Disposer::dispose() called recursively');
    this.running = true;
    dispose(this.items);
    this.items = [];
    this.running = false;
  }

  public add(...items: (AnyDisposable | false)[]): this {
    this.items.push(
      items.filter((item): item is Disposable | AnyDisposable[] => !!item)
    );
    return this;
  }

  public disposable(): () => void {
    return () => this.dispose();
  }
}
