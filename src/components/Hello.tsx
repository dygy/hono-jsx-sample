import { useState } from 'hono/jsx'
import { render } from "hono/jsx/dom";

export default function Counter() {
  const [count, setCount] = useState(0)
  console.log("render counter");
  return (
    <div class="flex flex-col gap-1 justify-center items-center">
      <p>Count: {count}</p>
      <button class="bg-lime-500 p-2 rounded-xl text-gray-100" onClick={() => {
        console.log("clicked");
        setCount(count + 1)
      }}>Increment</button>
    </div>
  )
}

export function initCounter(){
  console.log(Counter.name)
  render(<Counter />, document.getElementById(Counter.name) as HTMLElement);
}
