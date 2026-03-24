/* eslint-disable no-unused-vars */
/* ── info card ─────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, title, lines }) => (
    <div
        className="flex items-start gap-4 p-5 border border-border-dim dark:border-dark-border
                    hover:border-dark dark:hover:border-white transition-colors duration-300 group"
    >
        <div
            className="w-10 h-10 flex items-center justify-center border border-border-dim dark:border-dark-border
                        group-hover:bg-dark dark:group-hover:bg-white group-hover:border-dark dark:group-hover:border-white transition-all duration-300 shrink-0"
        >
            <Icon
                sx={{ fontSize: 18, className: "group-hover:text-white dark:group-hover:text-dark" }}
                className="text-dark dark:text-white group-hover:text-white dark:group-hover:text-dark transition-colors duration-300"
            />
        </div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-dim dark:text-dark-muted mb-1">
                {title}
            </p>
            {lines.map((l, i) => (
                <p key={i} className="text-sm text-dark dark:text-white font-medium">
                    {l}
                </p>
            ))}
        </div>
    </div>
);

export default InfoCard;
