import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ReadingResult } from '@/lib/astrology/types';
import { calculateChart } from '@/lib/astrology/tuViEngine';
import { fetchReadingsFromAI, buildDefaultReadings, fetchDetailedReadingsFromAI, type DetailedReadings } from '@/lib/ai/geminiClient';
import { queryClient } from '@/lib/queryClient';

interface AstroState {
  fullName: string;
  dob: string;
  tob: string;
  pob: string;
  gender: 'nam' | 'nữ';
  isTimeUnknown: boolean;

  result: ReadingResult | null;
  detailedResult: DetailedReadings | null;
  status: 'idle' | 'loading' | 'complete' | 'error' | 'generating-detail';
  errorMessage: string | null;

  setField: (field: string, value: any) => void;
  generateDestiny: () => Promise<void>;
  generateDetailedDestiny: () => Promise<void>;
  reset: () => void;
}

export const useAstroStore = create<AstroState>()(
  persist(
    (set, get) => ({
      fullName: '',
      dob: '',
      tob: '00:00',
      pob: '',
      gender: 'nam',
      isTimeUnknown: false,
      result: null,
      detailedResult: null,
      status: 'idle',
      errorMessage: null,

      setField: (field, value) => set((state) => ({ ...state, [field]: value })),

      generateDestiny: async () => {
        const { fullName, dob, tob, gender, isTimeUnknown } = get();

        if (!fullName || !dob) {
          set({ status: 'error', errorMessage: 'Vui lòng điền đủ họ tên và ngày sinh.' });
          return;
        }

        set({ status: 'loading', errorMessage: null, result: null, detailedResult: null });

        try {
          const birthTime = isTimeUnknown ? 'không rõ' : (tob || '00:00');
          const chart = calculateChart({ fullName, solarDate: dob, birthTime, gender });
          
          const defaultReadings = buildDefaultReadings(chart.cungs);
          const initialResult: ReadingResult = {
            chart,
            readings: defaultReadings.readings!,
            summary: defaultReadings.summary,
          };
          set({ result: initialResult, status: 'loading' });

          try {
            const queryKey = ['readings', fullName, dob, tob, gender, chart.center.cucName];
            const aiReadings = await queryClient.fetchQuery({
              queryKey,
              queryFn: () => fetchReadingsFromAI(
                fullName, chart.center.gender, chart.center.menhNguHanh, chart.center.cucName, chart.cungs,
              ),
              staleTime: Infinity,
            });
            
            const mergedReadings: any = {};
            for (const cung of chart.cungs) {
              mergedReadings[cung.key] = {
                stars: cung.mainStars.map(s => s.name),
                content: aiReadings.readings?.[cung.key as keyof typeof aiReadings.readings]?.content || `Cung ${cung.label} đang chờ luận giải.`,
              };
            }
            set({
              result: { chart, readings: mergedReadings, summary: aiReadings.summary },
              status: 'complete',
            });
          } catch (aiErr: any) {
            set({ status: 'complete', errorMessage: `Lá số chính xác. Luận giải AI lỗi: ${aiErr.message}` });
          }
        } catch (err: any) {
          set({ status: 'error', errorMessage: err.message || 'Lỗi tính toán lá số.' });
        }
      },

      generateDetailedDestiny: async () => {
        const { result, status } = get();
        if (!result || !result.chart) return;
        if (status === 'generating-detail') return;

        set({ status: 'generating-detail' });
        try {
          const { chart } = result;
          const queryKey = ['detailedReadings', get().fullName, get().dob, get().tob, get().gender, chart.center.cucName];
          const detailed = await queryClient.fetchQuery({
            queryKey,
            queryFn: () => fetchDetailedReadingsFromAI(
              chart.center.fullName,
              chart.center.gender,
              chart.center.menhNguHanh,
              chart.center.cucName,
              chart.cungs
            ),
            staleTime: Infinity,
          });
          set({ detailedResult: detailed, status: 'complete' });
        } catch (err: any) {
          console.error("Detailed AI Error:", err);
          set({ status: 'complete', errorMessage: `Lỗi AI khi tạo báo cáo chi tiết: ${err.message}` });
        }
      },

      reset: () => set({
        fullName: '', dob: '', tob: '00:00', pob: '', gender: 'nam',
        isTimeUnknown: false, result: null, detailedResult: null, status: 'idle', errorMessage: null,
      }),
    }),
    {
      name: 'astro-storage',
    }
  )
);
