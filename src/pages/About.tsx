import { link } from "@components/tailwind/base";

export const aboutMeta = {
  title: "about",
  icon: "/favicon.ico"
};

export const About = () => (
  <>
    <h1>this is the about page!</h1>

    <a class={link} href="/">home</a>
  </>
);
