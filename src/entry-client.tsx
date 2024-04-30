// here anything for js runtime can be defined and runes at
import { initCounter } from "@components/Hello";
const initers: Record<string, Array<() => void>> = {
	home: [initCounter],
	about: [],
} as const;

console.log("client?");

for (const init of initers[document.title]) {
	init();
}
