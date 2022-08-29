# Free-Poll

A method to transform poll to promise. The interval of every request and when promise should be resolved is by your control.

## Usage

```ts
import { freePoll } from "free-poll";

freePoll({
  fetcher: () => mockFetch('/data'),
  success: res => res.success === true,
  delay: res => res.nextTime || 1000,
}).then(res => {
  console.log(res.data);
});
```

## Options

The `freePoll` function receives a object options as `FreePollOption`.

```ts
fetcher: () => Promise<T>;
```

The function to request data or do something.

```ts
success: (response: T) => boolean;
```

The function to decide whether to continue. If not provided, the request will be executed one time.

```ts
delay: number | ((response: T) => number);
```

When to request in next time. 1000 is default, meaning 1 second. 
