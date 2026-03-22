import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Breadcrumb = ({ pageName }) => {
    return (
        <div className="bg-[#f5f5f5] border-b border-[#e0e0e0] py-4">
            <div
                className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-[#999]"
            >
                <Link to="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRightIcon sx={{ fontSize: 13 }} />
                <span className="text-[#111]">{pageName}</span>
            </div>
        </div>
    );
};

export default Breadcrumb;
