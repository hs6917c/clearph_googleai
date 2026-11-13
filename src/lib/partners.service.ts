import {
  adminLoginFn,
  adminVerifySessionFn,
  adminGetPartnersFn,
  adminTogglePartnerFn,
  adminSavePartnerFn,
  adminDeletePartnerFn,
  getLivePublicPartnersFn,
} from "./partners.functions";
import type { PremiumPartner } from "@/data/partners";

const STORAGE_KEY = "clearph_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
}

export function setAdminToken(token: string, persist = false): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, token);
  if (persist) {
    localStorage.setItem(STORAGE_KEY, token);
  }
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
}

export async function loginAdmin(
  password: string,
  remember = false,
): Promise<{ success: boolean; error?: string }> {
  const result = await adminLoginFn({ data: { password } });
  if (result.success && result.token) {
    setAdminToken(result.token, remember);
    return { success: true };
  }
  return { success: false, error: result.error ?? "로그인에 실패했습니다." };
}

export async function checkAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const res = await adminVerifySessionFn({ data: { token } });
    if (!res.valid) {
      clearAdminToken();
      return false;
    }
    return true;
  } catch {
    clearAdminToken();
    return false;
  }
}

export async function fetchAdminPartners(): Promise<PremiumPartner[]> {
  const token = getAdminToken();
  if (!token) throw new Error("인증이 필요합니다.");
  return adminGetPartnersFn({ data: { token } });
}

export async function toggleAdminPartner(
  partnerId: string,
  enabled: boolean,
): Promise<PremiumPartner> {
  const token = getAdminToken();
  if (!token) throw new Error("인증이 필요합니다.");
  return adminTogglePartnerFn({ data: { token, partnerId, enabled } });
}

export async function saveAdminPartner(partner: Partial<PremiumPartner>): Promise<PremiumPartner> {
  const token = getAdminToken();
  if (!token) throw new Error("인증이 필요합니다.");
  return adminSavePartnerFn({ data: { token, partner } });
}

export async function deleteAdminPartner(partnerId: string): Promise<boolean> {
  const token = getAdminToken();
  if (!token) throw new Error("인증이 필요합니다.");
  const res = await adminDeletePartnerFn({ data: { token, partnerId } });
  return res.success;
}

export async function fetchLiveProblemPartners(params: {
  problemCode?: string;
  category?: string;
  sectorIds?: string[];
  forcePreview?: boolean;
}): Promise<PremiumPartner[]> {
  return getLivePublicPartnersFn({ data: params });
}
