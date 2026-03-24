import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Breadcrumb = ({ pageName }) => {
    return (
        <div className="bg-bg-gray dark:bg-dark-paper border-b border-border dark:border-dark-border py-4 transition-colors">
            <div
                className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted dark:text-dark-muted"
            >
                <Link to="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRightIcon sx={{ fontSize: 13 }} />
                <span className="text-dark dark:text-white">{pageName}</span>
            </div>
        </div>
    );
};

export default Breadcrumb;
