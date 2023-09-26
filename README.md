# Util - `Disposer`

compose multiple disposables easily into single disposable

## Usage

```javascript
function SomeEffect() {
  useEffect(() => {
    const timeout = setInterval(() => console.log('Hello world!'), 1000);
    const handler = (e) => e.stopPropagation();
    document.body.addEventListener('click', handler, true);
    return new Disposer()
      .add(() => clearInterval(timeout))
      .add(() => document.removeEventListener('click', handler, true))
      .disposable();
  }, []);
  return null;
}
```
