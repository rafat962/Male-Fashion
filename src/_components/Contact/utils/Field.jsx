import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
/* ── tiny animated label input ────────────────────────── */
const Field = ({ label, type = "text", name, value, onChange, multiline }) => {
    const base = `peer w-full bg-transparent border-b border-border-light pt-5 pb-2
                  text-sm text-dark placeholder-transparent outline-none
                  focus:border-dark transition-colors duration-300 resize-none`;
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
                           tracking-[2px] text-text-dim peer-focus:text-dark
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm
                           peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                           peer-placeholder-shown:text-text-dim transition-all duration-200 pointer-events-none"
            >
                {label}
            </label>
        </div>
    );
};
export default Field;
