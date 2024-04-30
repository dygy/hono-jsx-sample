import Counter from "@islands/counter";
import { link } from "@utils/tailwind/base";
import { createRoute } from "honox/factory";

const homeMeta = {
	title: "about",
	icon: "/favicon.ico",
	description: "I mean really",
};

export default createRoute((c) => {
	return c.render(
		<>
			<Counter />
			<br />
			<a className={link} href="/about">
				about
			</a>
		</>,
	);
});
