/* eslint-disable no-unused-vars */
/* ── info card ─────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, title, lines }) => (
    <div
        className="flex items-start gap-4 p-5 border border-border-dim
                    hover:border-dark transition-colors duration-300 group"
    >
        <div
            className="w-10 h-10 flex items-center justify-center border border-border-dim
                        group-hover:bg-dark group-hover:border-dark transition-all duration-300 shrink-0"
        >
            <Icon
                sx={{ fontSize: 18, className: "group-hover:text-white" }}
                className="text-dark group-hover:text-white transition-colors duration-300"
            />
        </div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-dim mb-1">
                {title}
            </p>
            {lines.map((l, i) => (
                <p key={i} className="text-sm text-dark font-medium">
                    {l}
                </p>
            ))}
        </div>
    </div>
);

export default InfoCard;
