import { render } from "@utils/hono";
import { link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  const url = c.req.url.split("/");
  const id = url[url.length - 1];
  const post = await c.get("prisma").post.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });

  if (!post) {
    return render(
      <>Error 404</>,
      { title: "error", icon: "/favicon.ico", description: "lol error" },
      c,
    );
  }

  return render(
    <div className="rounded-lg bg-gray-400 p-4 text-lime-700">
      <em className="flex gap-1">
        <a className={link} href={`/news/${post.author_id}`}>
          {post.author.name}
        </a>
        - {post.created_at.toLocaleString()}
      </em>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
    </div>,
    { title: post.title, icon: "/favicon.ico", description: post.text },
    c,
  );
});
