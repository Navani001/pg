"use client";

import { Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface SnackBarProps {
    open: boolean;
    onClose: () => void;
    message?: string;
    severity?: "success" | "error" | "warning" | "info";
    autoHideDuration?: number;
}

export default function SnackBar({
    open,
    onClose,
    message = "Your leave request has been submitted successfully and is under review by the admin. You will be contacted shortly for the checkout process.",
    severity = "success",
    autoHideDuration = 4000
}: SnackBarProps) {

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    const getIcon = () => {
        switch (severity) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-white" />;
            case "error":
                return <XCircle className="w-5 h-5 text-white" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-white" />;
            case "info":
                return <Info className="w-5 h-5 text-white" />;
            default:
                return <CheckCircle className="w-5 h-5 text-white" />;
        }
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <MuiAlert
                onClose={handleSnackbarClose}
                severity={severity}
                icon={getIcon()}
                sx={{
                    bgcolor: severity === "success" ? "#22c55e" : severity === "error" ? "#ef4444" : severity === "warning" ? "#f59e0b" : "#3b82f6",
                    color: "#fff",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "95%",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
