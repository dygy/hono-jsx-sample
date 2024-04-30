import { link } from "@components/tailwind/base";

export const homeMeta = {
  title: "home",
  icon: "/favicon.ico",
  description: "I mean really",
};

export const Home = () => (
  <>
    <div id="Counter" />
    <br />
    <a class={link} href="/about">
      about
    </a>
  </>
);
