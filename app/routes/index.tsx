import Counter from "@islands/counter";
import { render } from "@utils/hono";
import { link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return render(
    <>
      <Counter />
    </>,
    { title: "home", icon: "/favicon.ico", description: "We are home" },
    c,
  );
});
