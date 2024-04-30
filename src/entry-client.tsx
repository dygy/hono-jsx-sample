// here anything for js runtime can be defined and runes at
import { initCounter } from "@components/Hello";
const initers: Record<string, Array<() => void>> = {
  home: [initCounter],
  about: [],
}
console.log("client?")
initers[document.title].forEach((init) => {
  init();
})
