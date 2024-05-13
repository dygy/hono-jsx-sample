import { button } from "@utils/tailwind/base";
import { useState } from "hono/jsx";
import type { Dictionary } from "@utils/i18n";

export default function Counter({ dict }: { dict: Dictionary }) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p>
        {dict.count}: {count}
      </p>
      <button
        type="button"
        className={button}
        onClick={() => {
          console.log("clicked");
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}
