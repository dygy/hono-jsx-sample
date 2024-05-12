import { render } from "@utils/hono";
import { button, link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  const url = c.req.url.split("/");
  const author = url[url.length - 1];
  const authorData = await c.get("prisma").author.findUnique({
    where: {
      id: author,
    },
  });
  const authorPosts = await c.get("prisma").post.findMany({
    take: 20,
    where: {
      author_id: author,
    },
    include: { author: true },
  });
  return render(
    <div className="flex flex-col gap-4 p-4">
      {authorPosts.map((post) => {
        return (
          <a href={`/news/${post.author_id}/${post.id}`}>
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
          </a>
        );
      })}
    </div>,
    {
      title: `${authorData?.name} posts`,
      icon: "/favicon.ico",
      description: `${authorData?.name} posts`,
    },
    c,
  );
});
