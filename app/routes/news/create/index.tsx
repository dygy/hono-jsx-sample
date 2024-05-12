import Counter from "@islands/counter";
import { render } from "@utils/hono";
import { createRoute } from "honox/factory";
import { button } from "@utils/tailwind/base";

export default createRoute(async (c) => {
  const authors = await c.get("prisma").author.findMany();

  return render(
    <>
      <form
        method="POST"
        action={`/news/create/push`}
        className="flex flex-col gap-4 p-4"
      >
        <select
          name="author_id"
          title="Select author"
          placeholder="select author"
          required
          className="w-64 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-lime-500 outline-blue-600/50 transition-all invalid:text-black/30 hover:border-blue-600/30"
        >
          <option value="" disabled selected>
            Select author
          </option>
          {authors.map((author) => (
            <option value={author.id}>{author.name}</option>
          ))}
        </select>
        <input
          name="title"
          type="text"
          placeholder="news title"
          required
          className="w-64 rounded-lg p-2 text-lime-500"
        />
        <textarea
          className="w-full rounded-lg p-2 text-lime-500"
          name="text"
          placeholder="type your post here"
        />
        <div className="flex w-full justify-end">
          <button type="submit" className={`${button} w-min`}>
            Submit
          </button>
        </div>
      </form>
    </>,
    {
      title: "create post",
      icon: "/favicon.ico",
      description: "lets write a post",
    },
    c,
  );
});
