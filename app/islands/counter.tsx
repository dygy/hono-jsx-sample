import { button } from "@utils/tailwind/base";
import { useState } from "hono/jsx";

export default function Counter() {
	const [count, setCount] = useState(0);
	console.log(count);
	return (
		<div className="flex flex-col items-center justify-center gap-1">
			<p>Count: {count}</p>
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
