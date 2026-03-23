import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Breadcrumb = ({ pageName }) => {
    return (
        <div className="bg-bg-gray border-b border-border py-4">
            <div
                className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted"
            >
                <Link to="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRightIcon sx={{ fontSize: 13 }} />
                <span className="text-dark">{pageName}</span>
            </div>
        </div>
    );
};

export default Breadcrumb;
