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
			<h1>this is the about page!</h1>

			<a className={link} href="/">
				home
			</a>
		</>,
	);
});
