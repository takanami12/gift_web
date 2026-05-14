import { create } from "zustand";
import {
  type BoxColor,
  type BoxSize,
  type BoxType,
  canPlaceItem,
  type DecorationItem,
  type DesignFrame,
  type ExtraCounts,
  type LidStyle,
  PRODUCT_BY_ID,
  type RibbonColor,
  type RibbonState,
  type WrapColor,
} from "@/types/design";

export type WizardStep = 1 | 2 | 3 | 4;
export type ViewMode = "inside" | "outside";

interface DesignState {
  step: WizardStep;
  viewMode: ViewMode;
  boxType: BoxType | null;
  boxSize: BoxSize | null;
  boxColor: BoxColor;
  wrapColor: WrapColor;
  lidStyle: LidStyle;
  lidImage: string | null;
  ribbon: RibbonState;
  extras: ExtraCounts;
  items: DecorationItem[];
  frames: DesignFrame[];
  selectedId: string | null;
  canvasSize: { width: number; height: number } | null;
  recipientName: string;
  message: string;
  voiceDataUrl: string | null;
  qrToken: string | null;

  setStep: (step: WizardStep) => void;
  setViewMode: (mode: ViewMode) => void;
  setBoxType: (type: BoxType | null) => void;
  setBoxSize: (size: BoxSize | null) => void;
  setBoxColor: (color: BoxColor) => void;
  setWrapColor: (color: WrapColor) => void;
  setLidStyle: (style: LidStyle) => void;
  setLidImage: (dataUrl: string | null) => void;
  setRibbonEnabled: (enabled: boolean) => void;
  setRibbonColor: (color: RibbonColor) => void;
  setExtra: (key: keyof ExtraCounts, count: number) => void;
  addItem: (item: DecorationItem) => void;
  updateItem: (id: string, patch: Partial<DecorationItem>) => void;
  removeItem: (id: string) => void;
  selectItem: (id: string | null) => void;
  rotateItem: (id: string) => boolean;
  recordFrame: () => void;
  setCanvasSize: (size: { width: number; height: number } | null) => void;
  setRecipientName: (name: string) => void;
  setMessage: (msg: string) => void;
  setVoiceDataUrl: (url: string | null) => void;
  setQrToken: (token: string | null) => void;
  resetItems: () => void;
  reset: () => void;
}

const INITIAL: Pick<
  DesignState,
  | "step"
  | "viewMode"
  | "boxType"
  | "boxSize"
  | "boxColor"
  | "wrapColor"
  | "lidStyle"
  | "lidImage"
  | "ribbon"
  | "extras"
  | "items"
  | "frames"
  | "selectedId"
  | "canvasSize"
  | "recipientName"
  | "message"
  | "voiceDataUrl"
  | "qrToken"
> = {
  step: 1,
  viewMode: "inside",
  boxType: null,
  boxSize: null,
  boxColor: "do",
  wrapColor: null,
  lidStyle: "plain",
  lidImage: null,
  ribbon: { enabled: false, color: "do" },
  extras: { flower: 0, ribbon: 0 },
  items: [],
  frames: [],
  selectedId: null,
  canvasSize: null,
  recipientName: "",
  message: "",
  voiceDataUrl: null,
  qrToken: null,
};

export const useDesignStore = create<DesignState>((set, get) => ({
  ...INITIAL,

  setStep: (step) => set({ step }),
  setViewMode: (viewMode) => set({ viewMode }),
  setBoxType: (boxType) => set({ boxType }),
  setBoxSize: (boxSize) => set({ boxSize }),
  setBoxColor: (boxColor) => set({ boxColor }),
  setWrapColor: (wrapColor) => set({ wrapColor }),
  setLidStyle: (lidStyle) => set({ lidStyle }),
  setLidImage: (lidImage) => set({ lidImage }),
  setRibbonEnabled: (enabled) =>
    set((s) => ({ ribbon: { ...s.ribbon, enabled } })),
  setRibbonColor: (color) =>
    set((s) => ({ ribbon: { ...s.ribbon, color } })),
  setExtra: (key, count) =>
    set((s) => ({ extras: { ...s.extras, [key]: Math.max(0, count) } })),
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  updateItem: (id, patch) =>
    set((s) => ({
      items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((it) => it.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),
  selectItem: (id) => set({ selectedId: id }),
  rotateItem: (id) => {
    const state = get();
    if (!state.boxSize) return false;
    const item = state.items.find((i) => i.id === id);
    if (!item) return false;
    const product = PRODUCT_BY_ID[item.productId];
    if (!product) return false;
    const nextRotation: 0 | 90 = item.rotation === 0 ? 90 : 0;
    const check = canPlaceItem(
      state.items,
      state.boxSize,
      product,
      item.gridX,
      item.gridY,
      item.id,
      nextRotation,
    );
    if (!check.ok) return false;
    set({
      items: state.items.map((it) =>
        it.id === id ? { ...it, rotation: nextRotation } : it,
      ),
    });
    return true;
  },
  recordFrame: () => {
    const snapshot = get().items.map((it) => ({ ...it }));
    set((s) => ({ frames: [...s.frames, { ts: Date.now(), items: snapshot }] }));
  },
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  setRecipientName: (recipientName) => set({ recipientName }),
  setMessage: (message) => set({ message }),
  setVoiceDataUrl: (voiceDataUrl) => set({ voiceDataUrl }),
  setQrToken: (qrToken) => set({ qrToken }),
  resetItems: () =>
    set({ items: [], frames: [], selectedId: null, extras: { flower: 0, ribbon: 0 } }),
  reset: () => set({ ...INITIAL }),
}));
