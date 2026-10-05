import React, { useState, useMemo } from 'react';
import { Cpu, HardDrive, Zap, CheckCircle2, AlertTriangle, ShoppingBag, RotateCcw, Sparkles } from 'lucide-react';
import { PC_COMPONENTS } from '../data/pcComponents';
import { PCComponent, CustomPCSelection, Product } from '../types/electronics';
import { IMAGES } from '../data/products';

interface CustomPCBuilderProps {
  onAddCustomRigToCart: (product: Product, rigSpecs: Record<string, string>) => void;
  onClose: () => void;
}

export const CustomPCBuilder: React.FC<CustomPCBuilderProps> = ({
  onAddCustomRigToCart,
  onClose,
}) => {
  // Default selection
  const [selection, setSelection] = useState<CustomPCSelection>({
    cpu: PC_COMPONENTS.cpu[0], // 7800X3D
    gpu: PC_COMPONENTS.gpu[1], // RTX 4080 Super
    motherboard: PC_COMPONENTS.motherboard[1], // ROG X670E
    ram: PC_COMPONENTS.ram[0], // 32GB DDR5
    storage: PC_COMPONENTS.storage[0], // 2TB Samsung 990 Pro
    cooler: PC_COMPONENTS.cooler[0], // Lian Li 360
    psu: PC_COMPONENTS.psu[0], // Corsair 1000W
    case: PC_COMPONENTS.case[0], // Lian Li O11
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<keyof CustomPCSelection>('cpu');
  const [assemblyService, setAssemblyService] = useState(true); // Professional assembly & 72h burn-in test

  // Calculate total price
  const baseComponentsPrice = useMemo(() => {
    return Object.values(selection).reduce((acc, comp) => acc + (comp ? comp.price : 0), 0);
  }, [selection]);

  const totalPrice = baseComponentsPrice + (assemblyService ? 99.00 : 0);

  // Calculate estimated wattage
  const totalWattage = useMemo(() => {
    const raw = Object.values(selection).reduce((acc, comp) => acc + (comp ? comp.wattage : 0), 0);
    return raw + 50; // +50W buffer for fans and RGB
  }, [selection]);

  const psuWattage = selection.psu?.wattage || 0;
  const isPsuAdequate = psuWattage >= totalWattage + 150;

  // Compatibility Check
  const compatibilityNotice = useMemo(() => {
    if (!selection.cpu || !selection.motherboard) return null;
    const isIntelCpu = selection.cpu.brand === 'Intel';
    const isIntelMb = selection.motherboard.id.includes('z790');
    const isAmdCpu = selection.cpu.brand === 'AMD';
    const isAmdMb = selection.motherboard.id.includes('x670') || selection.motherboard.id.includes('b650');

    if (isIntelCpu && !isIntelMb) {
      return {
        valid: false,
        message: 'Socket Mismatch: Intel CPU requires an LGA1700 motherboard (e.g., ASUS ROG Z790).',
      };
    }
    if (isAmdCpu && !isAmdMb) {
      return {
        valid: false,
        message: 'Socket Mismatch: AMD Ryzen CPU requires an AM5 socket motherboard (e.g., ROG X670E or B650).',
      };
    }
    return {
      valid: true,
      message: 'All selected components are 100% physically and electronically compatible.',
    };
  }, [selection.cpu, selection.motherboard]);

  const handleSelectComponent = (category: keyof CustomPCSelection, comp: PCComponent) => {
    setSelection((prev) => ({
      ...prev,
      [category]: comp,
    }));
  };

  // Preset Loaders
  const loadPreset = (type: 'apex' | 'sweetspot' | 'workstation') => {
    if (type === 'apex') {
      setSelection({
        cpu: PC_COMPONENTS.cpu[1], // 14900KS
        gpu: PC_COMPONENTS.gpu[0], // RTX 4090
        motherboard: PC_COMPONENTS.motherboard[0], // Z790 Dark Hero
        ram: PC_COMPONENTS.ram[1], // 64GB DDR5
        storage: PC_COMPONENTS.storage[1], // 4TB Gen5
        cooler: PC_COMPONENTS.cooler[0], // Lian Li 360
        psu: PC_COMPONENTS.psu[1], // Seasonic 1300W Titanium
        case: PC_COMPONENTS.case[0], // Lian Li O11
      });
    } else if (type === 'sweetspot') {
      setSelection({
        cpu: PC_COMPONENTS.cpu[0], // 7800X3D
        gpu: PC_COMPONENTS.gpu[1], // RTX 4080 Super
        motherboard: PC_COMPONENTS.motherboard[1], // ROG X670E
        ram: PC_COMPONENTS.ram[0], // 32GB DDR5
        storage: PC_COMPONENTS.storage[0], // 2TB 990 Pro
        cooler: PC_COMPONENTS.cooler[0], // Lian Li 360
        psu: PC_COMPONENTS.psu[0], // 1000W
        case: PC_COMPONENTS.case[1], // Fractal North Walnut
      });
    } else if (type === 'workstation') {
      setSelection({
        cpu: PC_COMPONENTS.cpu[2], // 9950X
        gpu: PC_COMPONENTS.gpu[0], // RTX 4090
        motherboard: PC_COMPONENTS.motherboard[1], // ROG X670E
        ram: PC_COMPONENTS.ram[2], // 128GB DDR5
        storage: PC_COMPONENTS.storage[1], // 4TB Gen5
        cooler: PC_COMPONENTS.cooler[2], // Noctua NH-D15 G2
        psu: PC_COMPONENTS.psu[1], // 1300W
        case: PC_COMPONENTS.case[2], // NZXT H9
      });
    }
  };

  const handleAddRigToCart = () => {
    const customProduct: Product = {
      id: `custom-rig-${Date.now()}`,
      name: `Volt Custom Rig: ${selection.cpu?.name.split(' ')[0]} ${selection.cpu?.name.split(' ')[2] || ''} + ${selection.gpu?.name.split(' ')[2] || ''} ${selection.gpu?.name.split(' ')[3] || ''}`,
      subtitle: `Hand-built custom rig with ${selection.ram?.name} and ${selection.storage?.name}`,
      category: 'custom-pcs',
      brand: 'Volt Custom',
      price: totalPrice,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: 1,
      image: IMAGES.customPcs,
      fallbackIcon: 'Cpu',
      shortDescription: `Custom configuration featuring ${selection.cpu?.name}, ${selection.gpu?.name}, and ${selection.psu?.name}.`,
      description: `Complete custom hardware rig configured by customer in VoltTech Studio. Includes professional cable management, BIOS flashing, Windows 11 installation, and 72-hour stress testing.`,
      keySpecs: [
        selection.cpu?.name || '',
        selection.gpu?.name || '',
        selection.ram?.name.split(' ')[0] || '',
        selection.storage?.name.split(' ')[0] || '',
      ],
      specs: {
        processor: selection.cpu?.name || 'Custom CPU',
        graphics: selection.gpu?.name || 'Custom GPU',
        memory: selection.ram?.name || 'Custom RAM',
        storage: selection.storage?.name || 'Custom SSD',
        ports: 'Full Motherboard + GPU I/O Array',
        connectivity: 'High-speed Wi-Fi 6E/7 + 2.5GbE LAN',
        os: 'Windows 11 Pro 64-bit Pre-installed',
      },
      warrantyMonths: 36,
      reviews: [],
      isCustomRig: true,
    };

    const rigDetails: Record<string, string> = {
      Processor: selection.cpu?.name || 'None',
      Graphics: selection.gpu?.name || 'None',
      Motherboard: selection.motherboard?.name || 'None',
      Memory: selection.ram?.name || 'None',
      Storage: selection.storage?.name || 'None',
      Cooling: selection.cooler?.name || 'None',
      PowerSupply: selection.psu?.name || 'None',
      Chassis: selection.case?.name || 'None',
      Assembly: assemblyService ? 'VoltTech 72h Stress & Assembly (+$99)' : 'Component Parts Only',
    };

    onAddCustomRigToCart(customProduct, rigDetails);
  };

  const categoriesList: { id: keyof CustomPCSelection; label: string; icon: string }[] = [
    { id: 'cpu', label: '1. Processor (CPU)', icon: 'Cpu' },
    { id: 'gpu', label: '2. Graphics (GPU)', icon: 'HardDrive' },
    { id: 'motherboard', label: '3. Motherboard', icon: 'Cpu' },
    { id: 'ram', label: '4. Memory (RAM)', icon: 'HardDrive' },
    { id: 'storage', label: '5. Storage (NVMe)', icon: 'HardDrive' },
    { id: 'cooler', label: '6. CPU Cooling', icon: 'Zap' },
    { id: 'psu', label: '7. Power Supply (PSU)', icon: 'Zap' },
    { id: 'case', label: '8. Chassis (Case)', icon: 'Cpu' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-semibold">
            <span>VOLT CUSTOM RIG STUDIO</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">INTERACTIVE HARDWARE WORKBENCH</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Configure Your Custom Battlestation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Select high-grade components with real-time wattage tracking, electronic socket compatibility validation, and optional 72-hour certified thermal burn-in.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-400 font-mono">Quick Presets:</span>
          <button
            onClick={() => loadPreset('sweetspot')}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-medium text-neutral-200 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Gamers Sweet Spot
          </button>
          <button
            onClick={() => loadPreset('apex')}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-medium text-neutral-200 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            RTX 4090 Apex
          </button>
          <button
            onClick={() => loadPreset('workstation')}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-medium text-neutral-200 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            128GB Workstation
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Component Selection Tabs & Options */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Horizontal Component Category Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-neutral-800">
            {categoriesList.map((cat) => {
              const selectedComp = selection[cat.id];
              const isActive = activeCategoryTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex flex-col items-start ${
                    isActive
                      ? 'bg-neutral-850 border border-red-500 text-white'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="font-semibold">{cat.label}</span>
                  <span className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                    {selectedComp ? selectedComp.name.split(' ')[0] + ' ' + (selectedComp.name.split(' ')[1] || '') : 'None'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Select {activeCategoryTab.toUpperCase()} Option:
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                {PC_COMPONENTS[activeCategoryTab]?.length || 0} Options Available
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {PC_COMPONENTS[activeCategoryTab]?.map((item) => {
                const isSelected = selection[activeCategoryTab]?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectComponent(activeCategoryTab, item)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-neutral-850 border-red-500 shadow-md shadow-red-950/40'
                        : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-red-400 bg-neutral-950 px-2 py-0.5 rounded border border-red-900/50 font-semibold">
                          {item.brand}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-300 font-mono">
                        {item.specsSummary}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {item.recommendedFor}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-white tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.wattage > 0 && (
                          <span className="block text-[10px] font-mono text-neutral-400">
                            +{item.wattage}W TDP
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className={`px-3 py-1 rounded text-xs font-semibold font-mono transition-colors ${
                          isSelected
                            ? 'bg-red-600 text-white font-bold'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Choose'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Assembly Toggle */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-start gap-4">
            <input
              type="checkbox"
              id="assembly"
              checked={assemblyService}
              onChange={(e) => setAssemblyService(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-700 text-red-600 focus:ring-red-500 bg-neutral-950"
            />
            <label htmlFor="assembly" className="text-xs cursor-pointer flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  VoltCare Custom Lab Assembly & 72-Hour Thermal Stress Testing (+$99.00)
                </span>
                <span className="font-mono text-red-400 font-bold">$99.00</span>
              </div>
              <p className="text-neutral-400 mt-1 leading-relaxed">
                Includes precision cable routing, custom fan curve calibration, latest BIOS flash, Windows 11 installation with zero bloatware, and individual GPU/CPU Cinebench & 3DMark stress certification reports.
              </p>
            </label>
          </div>

        </div>

        {/* Right 4 Cols: Live Telemetry, Compatibility & Purchase Summary */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-display text-base font-bold text-white">
                Live Rig Summary
              </h3>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Build
              </span>
            </div>

            {/* Live Wattage Gauge */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Power Draw:
                </span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {totalWattage}W / {psuWattage}W PSU
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isPsuAdequate ? 'bg-red-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalWattage / (psuWattage || 1)) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={isPsuAdequate ? 'text-emerald-400' : 'text-rose-400'}>
                  {isPsuAdequate ? '✓ Excellent PSU headroom (>150W)' : '⚠ PSU capacity tight; upgrade PSU'}
                </span>
                <span className="text-neutral-400">Headroom: {Math.max(0, psuWattage - totalWattage)}W</span>
              </div>
            </div>

            {/* Compatibility Badge */}
            {compatibilityNotice && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  compatibilityNotice.valid
                    ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-900/60 text-rose-300'
                }`}
              >
                {compatibilityNotice.valid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{compatibilityNotice.message}</span>
              </div>
            )}

            {/* Selected Components Itemized List */}
            <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1">
              {Object.entries(selection).map(([key, item]) => {
                if (!item) return null;
                return (
                  <div key={key} className="flex items-center justify-between text-neutral-300 py-1 border-b border-neutral-800/50">
                    <div className="truncate mr-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block">{key}:</span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="font-mono font-medium text-white tabular-nums shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
              {assemblyService && (
                <div className="flex items-center justify-between text-neutral-300 py-1">
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase block">Labor:</span>
                    <span>72h Stress & Assembly</span>
                  </div>
                  <span className="font-mono font-medium text-white tabular-nums">
                    $99.00
                  </span>
                </div>
              )}
            </div>

            {/* Price & Cart Add */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-400 uppercase font-mono">Total Build Cost:</span>
                <span className="font-mono text-2xl font-extrabold text-white tabular-nums">
                  ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <button
                onClick={handleAddRigToCart}
                disabled={!compatibilityNotice?.valid}
                className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-lg ${
                  compatibilityNotice?.valid
                    ? 'bg-red-600 text-white hover:bg-red-500 active:scale-[0.98] shadow-red-950/50 cursor-pointer'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Rig to Shopping Bag</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-center text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Return to Product Catalog
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
