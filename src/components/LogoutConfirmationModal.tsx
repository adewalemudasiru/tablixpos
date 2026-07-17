import React from "react";
import { useNavigate } from "react-router";
import { ConfirmModal } from "./ds";
import { authAPI } from "../services/api";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}

export function LogoutConfirmationModal({ isOpen, onConfirm, onCancel }: LogoutConfirmationModalProps) {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    // Call backend logout to invalidate refresh token
    try {
      const refreshToken = localStorage.getItem("tablixpos_refresh_token");
      if (refreshToken) await authAPI.logout(refreshToken);
    } catch (_) {}

    // Clear auth tokens and active staff
    try {
      localStorage.removeItem("tablixpos_access_token");
      localStorage.removeItem("tablixpos_refresh_token");
      localStorage.removeItem("tablix_active_staff");
      // Clear cart so next user starts fresh
      localStorage.removeItem("tablix_cart");
    } catch (_) {}

    if (onConfirm) onConfirm();
    navigate("/");
  };

  return (
    <ConfirmModal
      open={isOpen}
      onClose={onCancel}
      onConfirm={handleConfirm}
      title="Confirmation"
      description="Are you sure you want to logout? You'll need to enter your PIN to sign back in."
      variant="danger"
      confirmLabel="Yes, Logout"
      cancelLabel="Cancel"
    />
  );
}
