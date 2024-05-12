import { render } from "@utils/hono";
import { button, link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  const posts = await c.get("prisma").post.findMany({
    take: 20,
    include: { author: true },
  });

  return render(
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post) => {
        return (
          <div className="rounded-lg bg-gray-400 p-4 text-lime-700">
            <em className="flex gap-1">
              <a className={link} href={`/news/${post.author_id}`}>
                {post.author.name}
              </a>
              - {post.created_at.toLocaleString()}
            </em>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <a href={`/news/${post.author_id}/${post.id}`}>
              <button className={button}>Read</button>
            </a>
          </div>
        );
      })}
    </div>,
    { title: "news", icon: "/favicon.ico", description: "We want news" },
    c,
  );
});
