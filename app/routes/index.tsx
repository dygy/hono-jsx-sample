import Counter from "@islands/counter";
import { render } from "@utils/hono";
import { createRoute } from "honox/factory";
import { getDictionary } from "@utils/i18n";

export default createRoute(async (c) => {
  const dict = getDictionary(c.get("cookie").language);
  return render(
    <>
      <Counter dict={dict} />
      <div className="flex max-w-full flex-col gap-4 overflow-auto p-4">
        {JSON.stringify(c.get("cookie"), null, 2)}
      </div>
    </>,
    { title: "home", icon: "/favicon.ico", description: "We are home" },
    c,
  );
});
