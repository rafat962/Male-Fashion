import { twMerge } from "tailwind-merge";

export default function Marquee({
    className,
    reverse = false,
    children,
    repeat = 4,
    ...props
}) {
    return (
        <div
            {...props}
            /* لاحظ إضافة hover-pause هنا عشان نضمن إن الدور ده بس اللي يقف */
            className={twMerge(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] flex-row hover-pause",
                className,
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={twMerge(
                            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
                            reverse && "direction-reverse", // تفعيل العكس هنا
                        )}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}
