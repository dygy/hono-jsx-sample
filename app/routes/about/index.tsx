import { render } from "@utils/hono";
import { link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return render(
    <>
      <h1>this is the about page!</h1>
    </>,
    {
      title: "about",
      icon: "/favicon.ico",
      description: "I mean really",
    },
    c,
  );
});
