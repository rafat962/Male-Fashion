import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
/* ── tiny animated label input ────────────────────────── */
const Field = ({ label, type = "text", name, value, onChange, multiline }) => {
    const base = `peer w-full bg-transparent border-b border-border-light dark:border-dark-border pt-5 pb-2
                  text-sm text-dark dark:text-white placeholder-transparent outline-none
                  focus:border-dark dark:focus:border-white transition-colors duration-300 resize-none`;
    return (
        <div className="relative">
            {multiline ? (
                <textarea
                    rows={4}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className={base}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className={base}
                />
            )}
            {/* floating label */}
            <label
                className="absolute left-0 top-1 text-[10px] font-bold uppercase
                           tracking-[2px] text-text-dim dark:text-dark-muted peer-focus:text-dark dark:peer-focus:text-white
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm
                           peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                           peer-placeholder-shown:text-text-dim dark:peer-placeholder-shown:text-dark-muted transition-all duration-200 pointer-events-none"
            >
                {label}
            </label>
        </div>
    );
};
export default Field;
