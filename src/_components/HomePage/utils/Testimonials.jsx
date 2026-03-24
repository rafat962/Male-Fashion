import { reviews } from "../../../data/reviews";
import Marquee from "./Marquee";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-paper p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-2">
            <img
                className="rounded-full"
                width="32"
                height="32"
                src={img}
                alt=""
            />
            <div className="flex flex-col">
                <figcaption className="text-sm font-bold text-dark dark:text-white">
                    {name}
                </figcaption>
                <p className="text-xs text-muted dark:text-dark-muted">{username}</p>
            </div>
        </div>
        <blockquote className="mt-2 text-sm text-sub dark:text-dark-text leading-relaxed">
            {body}
        </blockquote>
    </figure>
);

export default function Testimonial() {
    return (
        <section className="py-20 bg-bg-light dark:bg-dark-bg overflow-hidden">
            <h2 className="text-center text-4xl font-black mb-12 text-dark dark:text-white">
                Hear From My Clients
            </h2>

            <div className="relative flex flex-col gap-6">
                {/* الدور الأول - اتجاه عادي - يقف لوحده */}
                <Marquee className="hover-pause [--duration:80s] [--gap:1rem]">
                    {firstRow.map((r) => (
                        <ReviewCard key={r.username} {...r} />
                    ))}
                </Marquee>

                {/* الدور الثاني - اتجاه عكسي - يقف لوحده */}
                <Marquee
                    reverse
                    className="hover-pause [--duration:80s] [--gap:1rem]"
                >
                    {secondRow.map((r) => (
                        <ReviewCard key={r.username} {...r} />
                    ))}
                </Marquee>

                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg-light dark:from-dark-bg z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg-light dark:from-dark-bg z-10"></div>
            </div>
        </section>
    );
}
