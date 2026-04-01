import React, { useState } from 'react';
import { useAstroStore } from '@/store/useAstroStore';
import { format, parse, isValid } from 'date-fns';
import { CalendarIcon, MapPin, Sparkles, ArrowRight, Wand2, Check } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

import provincesData from '@/data/provinces.json';

// Convert provinces object to array
const PROVINCES = Object.values(provincesData).map((p: any) => ({
  value: p.code,
  label: p.name_with_type,
}));

export interface ReadonlyAstroFormProps {}

import { useNavigate } from '@tanstack/react-router';

export const AstroForm: React.FC<ReadonlyAstroFormProps> = () => {
  const store = useAstroStore();
  const navigate = useNavigate();
  
  // Local states for UI overlays
  const [openPob, setOpenPob] = useState(false);
  const [dobDate, setDobDate] = useState<Date | undefined>(
    store.dob ? new Date(store.dob) : undefined
  );
  const [dobInput, setDobInput] = useState<string>(
    store.dob ? format(new Date(store.dob), 'dd/MM/yyyy') : ''
  );

  const handleDobInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDobInput(val);
    // Auto format if length is matches dd/MM/yyyy format (10 chars, like 19/05/1998)
    if (val.length === 10) {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      if (isValid(parsed)) {
        setDobDate(parsed);
        store.setField('dob', format(parsed, "yyyy-MM-dd"));
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDobDate(date);
    if (date) {
      store.setField('dob', format(date, 'yyyy-MM-dd'));
      setDobInput(format(date, 'dd/MM/yyyy'));
    }
  };

  const navigateTo = (path: '/natal-chart' | '/reading') => {
    if (!store.fullName || !store.dob) {
      alert("Vui lòng nhập ít nhất Tên và Ngày sinh");
      return;
    }
    
    // Navigate first, trigger AI fetch in background (loading spinner shows on reading page)
    navigate({ to: path });
    store.generateDestiny();
  };

  return (
    <div className="w-full glass-morphism rounded-3xl p-10 md:p-16 shadow-[0_40px_80px_-20px_rgba(19,20,38,0.8)] border border-outline-variant/10 relative overflow-hidden">
      {/* Subtle Decorative Icon */}
      <div className="absolute -bottom-12 -right-12 opacity-[0.05] pointer-events-none">
        <Sparkles className="w-60 h-60 text-primary" />
      </div>
      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
        
        {/* Full Name */}
        <div className="flex flex-col gap-3">
          <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4" htmlFor="full-name">
            Họ và tên
          </label>
          <Input 
            className="h-14 px-6 rounded-full bg-surface-container-highest/30 border-outline-variant/30 focus-visible:ring-tertiary focus-visible:ring-1 text-base placeholder:text-on-surface-variant/40" 
            id="full-name" 
            placeholder="Ví dụ: Nguyễn Văn Thiên" 
            value={store.fullName}
            onChange={(e) => store.setField('fullName', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4" htmlFor="dob">
            Ngày tháng năm sinh
          </label>
          <div className="flex relative">
            <Input 
              id="dob"
              placeholder="DD/MM/YYYY" 
              value={dobInput}
              onChange={handleDobInputChange}
              className="h-14 px-6 rounded-full bg-surface-container-highest/30 border-outline-variant/30 focus-visible:ring-tertiary focus-visible:ring-1 text-base placeholder:text-on-surface-variant/40 w-full pr-14"
            />
            <Popover>
              <PopoverTrigger className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest/50 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                  <CalendarIcon className="h-5 w-5 opacity-70" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-surface-container border-outline-variant/30" align="start">
                <Calendar
                  mode="single"
                  selected={dobDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  className="bg-surface-container rounded-xl text-on-surface p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Time of Birth */}
        <div className="flex flex-col gap-3">
          <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4" htmlFor="tob">
            Giờ sinh
          </label>
          <Input 
            className="h-14 px-6 rounded-full bg-surface-container-highest/30 border-outline-variant/30 focus-visible:ring-tertiary focus-visible:ring-1 text-base" 
            id="tob" 
            type="time"
            value={store.tob}
            onChange={(e) => store.setField('tob', e.target.value)}
            disabled={store.isTimeUnknown}
          />
          <div className="flex items-center gap-3 mt-2 px-4">
            <Checkbox 
              id="not-sure-time" 
              checked={store.isTimeUnknown}
              onCheckedChange={(checked) => store.setField('isTimeUnknown', checked === true)}
              className="border-outline-variant data-[state=checked]:bg-tertiary data-[state=checked]:text-background"
            />
            <label className="text-sm text-on-surface-variant font-light cursor-pointer" htmlFor="not-sure-time">
              Tôi không nhớ rõ giờ sinh
            </label>
          </div>
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-3">
          <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4">
            Giới tính
          </label>
          <div className="flex bg-surface-container-highest/30 p-1.5 rounded-full border border-outline-variant/30 h-14">
            <button
              type="button"
              onClick={() => store.setField('gender', 'nam')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-full font-label text-sm uppercase tracking-widest transition-all duration-300",
                store.gender === 'nam' 
                  ? "bg-primary text-primary-container shadow-lg" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", store.gender === 'nam' ? "bg-primary-container" : "bg-outline-variant")} />
              Nam
            </button>
            <button
              type="button"
              onClick={() => store.setField('gender', 'nữ')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-full font-label text-sm uppercase tracking-widest transition-all duration-300",
                store.gender === 'nữ' 
                  ? "bg-secondary text-secondary-container shadow-lg" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", store.gender === 'nữ' ? "bg-secondary-container" : "bg-outline-variant")} />
              Nữ
            </button>
          </div>
        </div>

        {/* Place of Birth */}
        <div className="flex flex-col gap-3">
          <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4" htmlFor="pob">
            Nơi sinh
          </label>
          
          <Popover open={openPob} onOpenChange={setOpenPob}>
            <PopoverTrigger 
                className={cn(
                  "flex items-center justify-between h-14 px-6 rounded-full bg-surface-container-highest/30 border border-outline-variant/30 hover:bg-surface-container-highest/50 hover:text-on-surface text-base font-normal",
                  !store.pob && "text-on-surface-variant/40"
                )}
              >
                {store.pob
                  ? PROVINCES.find((prov) => prov.value === store.pob)?.label
                  : "Chọn tỉnh thành..."}
                <MapPin className="ml-2 h-5 w-5 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-surface-container border-outline-variant/30">
              <Command className="bg-surface-container text-on-surface">
                <CommandInput placeholder="Tìm kiếm tỉnh thành..." className="border-none focus:ring-0" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                  <CommandGroup>
                    {PROVINCES.map((prov) => (
                      <CommandItem
                        key={prov.value}
                        value={prov.label}
                        onSelect={() => {
                          store.setField('pob', prov.value);
                          setOpenPob(false);
                        }}
                        className="cursor-pointer hover:bg-surface-container-highest data-[selected=true]:bg-surface-container-highest"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-tertiary",
                            store.pob === prov.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {prov.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <p className="text-[10px] text-on-surface-variant/60 italic mt-1 px-4">
            Hệ thống sẽ tự động xác định kinh độ và vĩ độ qua code ({store.pob || '--'}).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 mt-12 flex flex-col md:flex-row gap-8 items-center justify-center">
          <button 
            type="button"
            onClick={() => navigateTo('/reading')}
            className="group relative w-full md:w-auto min-w-[260px] bg-gradient-to-br from-primary to-secondary text-primary-container font-bold py-5 px-12 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_15px_35px_-10px_rgba(194,194,242,0.5)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Xem Tử Vi
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            type="button"
            onClick={() => navigateTo('/natal-chart')}
            className="group relative w-full md:w-auto min-w-[260px] border border-outline-variant/30 text-tertiary font-bold py-5 px-12 rounded-full transition-all duration-500 hover:bg-tertiary/5 hover:border-tertiary/50 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              Xem Bản Đồ Sao
              <Wand2 className="w-5 h-5" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
