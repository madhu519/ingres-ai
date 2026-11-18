"use client";

import React, { useState, useRef } from "react";
import {
  Layers,
  Map as MapIcon,
  Search,
  Printer,
  Download,
  Filter,
  ZoomIn,
  ZoomOut,
  Home,
  Compass,
  BarChart3,
  Table as TableIcon,
  CheckSquare,
  Square,
  FileSpreadsheet,
  X,
  ExternalLink,
  Info,
  Maximize2,
  Navigation,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface StateData {
  sNo: number;
  state: string;
  majorProjects: number;
  commandAreaThHa: number;
  saltAffectedThHa: number;
  waterloggedThHa: number;
  geoAreaThHa: number;
  mediumProjects: number;
  basin: string;
  coords: { x: number; y: number; zoom: number };
}

const STATE_DATASET: StateData[] = [
  {
    sNo: 1,
    state: "Uttar Pradesh",
    majorProjects: 62,
    commandAreaThHa: 23400.76,
    saltAffectedThHa: 283.15,
    waterloggedThHa: 126.68,
    geoAreaThHa: 24092.8,
    mediumProjects: 78,
    basin: "Ganga",
    coords: { x: 50, y: 38, zoom: 2.2 },
  },
  {
    sNo: 2,
    state: "Punjab",
    majorProjects: 18,
    commandAreaThHa: 4120.5,
    saltAffectedThHa: 142.3,
    waterloggedThHa: 89.4,
    geoAreaThHa: 5036.0,
    mediumProjects: 24,
    basin: "Indus",
    coords: { x: 34, y: 24, zoom: 2.8 },
  },
  {
    sNo: 3,
    state: "Andhra Pradesh",
    majorProjects: 54,
    commandAreaThHa: 11631.41,
    saltAffectedThHa: 12.93,
    waterloggedThHa: 28.27,
    geoAreaThHa: 27504.5,
    mediumProjects: 45,
    basin: "Krishna-Godavari",
    coords: { x: 52, y: 68, zoom: 2.2 },
  },
  {
    sNo: 4,
    state: "Gujarat",
    majorProjects: 36,
    commandAreaThHa: 5334.17,
    saltAffectedThHa: 307.32,
    waterloggedThHa: 265.26,
    geoAreaThHa: 19602.4,
    mediumProjects: 42,
    basin: "Narmada-Tapi",
    coords: { x: 26, y: 50, zoom: 2.3 },
  },
  {
    sNo: 5,
    state: "Bihar",
    majorProjects: 22,
    commandAreaThHa: 5939.26,
    saltAffectedThHa: 156.69,
    waterloggedThHa: 627.89,
    geoAreaThHa: 9416.3,
    mediumProjects: 31,
    basin: "Ganga",
    coords: { x: 68, y: 41, zoom: 2.5 },
  },
  {
    sNo: 6,
    state: "Karnataka",
    majorProjects: 28,
    commandAreaThHa: 3450.2,
    saltAffectedThHa: 84.15,
    waterloggedThHa: 52.8,
    geoAreaThHa: 19179.0,
    mediumProjects: 38,
    basin: "Krishna-Cauvery",
    coords: { x: 40, y: 74, zoom: 2.4 },
  },
  {
    sNo: 7,
    state: "Chhattisgarh",
    majorProjects: 9,
    commandAreaThHa: 2009.82,
    saltAffectedThHa: 0.0,
    waterloggedThHa: 0.0,
    geoAreaThHa: 13519.1,
    mediumProjects: 14,
    basin: "Mahanadi",
    coords: { x: 56, y: 52, zoom: 2.3 },
  },
  {
    sNo: 8,
    state: "Assam",
    majorProjects: 6,
    commandAreaThHa: 326.04,
    saltAffectedThHa: 0.0,
    waterloggedThHa: 2.09,
    geoAreaThHa: 7843.8,
    mediumProjects: 9,
    basin: "Brahmaputra",
    coords: { x: 86, y: 35, zoom: 2.6 },
  },
  {
    sNo: 9,
    state: "Himachal Pradesh",
    majorProjects: 1,
    commandAreaThHa: 35.83,
    saltAffectedThHa: 0.0,
    waterloggedThHa: 0.26,
    geoAreaThHa: 5567.3,
    mediumProjects: 5,
    basin: "Indus",
    coords: { x: 38, y: 19, zoom: 3.0 },
  },
  {
    sNo: 10,
    state: "Goa",
    majorProjects: 2,
    commandAreaThHa: 38.12,
    saltAffectedThHa: 0.0,
    waterloggedThHa: 0.0,
    geoAreaThHa: 370.2,
    mediumProjects: 3,
    basin: "West Flowing",
    coords: { x: 33, y: 71, zoom: 3.5 },
  },
];

interface IndiaWrisGisViewerProps {
  onSelectStateForSimulation?: (stateName: string) => void;
}

export default function IndiaWrisGisViewer({ onSelectStateForSimulation }: IndiaWrisGisViewerProps) {
  // Navigation & selection states
  const [unitType, setUnitType] = useState<"Administrative" | "Basin">("Administrative");
  const [selectedState, setSelectedState] = useState<StateData>(STATE_DATASET[0]);
  const [activeTab, setActiveTab] = useState<"statistics" | "chart">("statistics");
  const [chartSubView, setChartSubView] = useState<"area" | "command" | "pctAffected">("area");

  // Floating Widget states
  const [showLayerList, setShowLayerList] = useState(false);
  const [showBasemapGallery, setShowBasemapGallery] = useState(false);
  const [showUnitWiseWidget, setShowUnitWiseWidget] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activeBasemap, setActiveBasemap] = useState<string>("Light Gray Canvas");

  // Layers visibility state
  const [layers, setLayers] = useState({
    stateBoundary: true,
    districtBoundary: true,
    soilSampleProjects: true,
    waterloggedArea: true,
    saltAffectedArea: true,
    commandArea: true,
  });

  // Map viewport states
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [cursorCoord, setCursorCoord] = useState({ lat: "24.775816° N", lng: "80.760457° E" });
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [showSamplePopup, setShowSamplePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const lat = (35.5 - yPct * 27.5).toFixed(6);
    const lng = (68.0 + xPct * 29.5).toFixed(6);
    setCursorCoord({ lat: `${lat}° N`, lng: `${lng}° E` });
  };

  const handleStateClick = (st: StateData) => {
    setSelectedState(st);
    setMapZoom(st.coords.zoom);
    setMapPan({ x: (st.coords.x - 50) * -4, y: (st.coords.y - 50) * -4 });
  };

  const resetMapView = () => {
    setMapZoom(1);
    setMapPan({ x: 0, y: 0 });
    setSelectedState(STATE_DATASET[0]);
  };

  // Filtered list
  const filteredStates = STATE_DATASET.filter((s) =>
    unitType === "Administrative"
      ? s.state.toLowerCase().includes(searchQuery.toLowerCase())
      : s.basin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Chart data for selected state
  const areaChartData = [
    {
      name: selectedState.state,
      "Salt Affected (Th Ha)": selectedState.saltAffectedThHa,
      "Command Area (Th Ha)": selectedState.commandAreaThHa,
      "Geographical Area (Th Ha)": selectedState.geoAreaThHa,
      "Total Waterlogged (Th Ha)": selectedState.waterloggedThHa,
    },
  ];

  const commandChartData = [
    {
      name: selectedState.state,
      "Medium Command Projects": selectedState.mediumProjects,
      "Major Command Projects": selectedState.majorProjects,
    },
  ];

  const pctAffected = selectedState.commandAreaThHa > 0
    ? parseFloat(((selectedState.waterloggedThHa / selectedState.commandAreaThHa) * 100).toFixed(2))
    : 0;

  const pctChartData = [
    {
      name: selectedState.state,
      "% Affected Area in Commands": pctAffected,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 text-slate-800 select-none overflow-hidden">
      {/* Top Banner with NWIC & India-WRIS Official Branding */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-700 to-blue-900 text-white px-4 py-2 flex items-center justify-between border-b border-sky-950 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1 shadow">
            <span className="text-sky-700 font-extrabold text-xs tracking-tighter">WRIS</span>
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide flex items-center gap-2">
              National Water Informatics Centre (NWIC)
              <span className="text-[10px] font-normal bg-sky-600/80 px-2 py-0.5 rounded border border-sky-400/40">
                Ministry of Jal Shakti
              </span>
            </h2>
            <p className="text-[11px] text-sky-200">
              India-WRIS GIS Module: Water Logging & Soil Salinity Monitoring System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-medium bg-sky-950/60 px-3 py-1 rounded border border-sky-600/40">
            Country: <strong>India</strong>
          </span>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download Excel
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left GIS Map Viewer + Right Data Panel */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT PANE: Interactive GIS Map Viewer */}
        <div
          className="w-1/2 h-full relative bg-[#e5e9ec] overflow-hidden flex flex-col border-r border-slate-300"
          onMouseMove={handleMouseMove}
        >
          {/* Map Floating Toolbar - Top Left */}
          <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5">
            {/* Global Search Bar */}
            <div className="flex items-center bg-white rounded shadow-md border border-slate-300 text-xs px-2.5 py-1.5 w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Find state, block or place..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* GIS Widget Icons Group */}
            <div className="flex flex-col bg-white rounded shadow-md border border-slate-300 overflow-hidden w-9">
              <button
                onClick={() => {
                  setShowLayerList(!showLayerList);
                  setShowBasemapGallery(false);
                  setShowUnitWiseWidget(false);
                }}
                title="Layer List"
                className={`p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition ${
                  showLayerList ? "bg-sky-100 text-sky-700 font-bold" : ""
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setShowBasemapGallery(!showBasemapGallery);
                  setShowLayerList(false);
                  setShowUnitWiseWidget(false);
                }}
                title="Basemap Gallery"
                className={`p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition ${
                  showBasemapGallery ? "bg-sky-100 text-sky-700 font-bold" : ""
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setShowUnitWiseWidget(!showUnitWiseWidget);
                  setShowLayerList(false);
                  setShowBasemapGallery(false);
                }}
                title="Unit-Wise Selection (Admin / Basin)"
                className={`p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition ${
                  showUnitWiseWidget ? "bg-sky-100 text-sky-700 font-bold" : ""
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPrintModal(true)}
                title="Print / Export Map"
                className="p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMapZoom((z) => Math.min(z + 0.5, 4))}
                title="Zoom In"
                className="p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMapZoom((z) => Math.max(z - 0.5, 1))}
                title="Zoom Out"
                className="p-2 hover:bg-sky-50 text-slate-700 border-b border-slate-200 transition"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={resetMapView}
                title="Default Map View (Reset)"
                className="p-2 hover:bg-sky-50 text-slate-700 transition"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Slider Window 1: Layer List */}
          {showLayerList && (
            <div className="absolute top-12 left-16 z-40 bg-white rounded-lg shadow-xl border border-slate-300 w-64 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-sky-900">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-700" /> Layers
                </span>
                <button onClick={() => setShowLayerList(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 space-y-2">
                <div className="font-semibold text-slate-700">▾ Admin Boundaries</div>
                <div className="pl-3 space-y-1.5 text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.stateBoundary}
                      onChange={(e) => setLayers({ ...layers, stateBoundary: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span>State Boundary</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.districtBoundary}
                      onChange={(e) => setLayers({ ...layers, districtBoundary: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span>District Boundary</span>
                  </label>
                </div>

                <div className="font-semibold text-slate-700 pt-1">▾ Command-Waterlogged / Salt Affected</div>
                <div className="pl-3 space-y-1.5 text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.soilSampleProjects}
                      onChange={(e) => setLayers({ ...layers, soilSampleProjects: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                      Soil Sample Irrigation Projects
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.waterloggedArea}
                      onChange={(e) => setLayers({ ...layers, waterloggedArea: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-amber-400 inline-block"></span>
                      Waterlogged Area
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.saltAffectedArea}
                      onChange={(e) => setLayers({ ...layers, saltAffectedArea: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-rose-500 inline-block"></span>
                      Salt Affected Area
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layers.commandArea}
                      onChange={(e) => setLayers({ ...layers, commandArea: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-emerald-500 inline-block"></span>
                      Command Area
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Floating Slider Window 2: Basemap Gallery */}
          {showBasemapGallery && (
            <div className="absolute top-20 left-16 z-40 bg-white rounded-lg shadow-xl border border-slate-300 w-56 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-sky-900">
                <span className="flex items-center gap-1.5">
                  <MapIcon className="w-3.5 h-3.5 text-sky-700" /> Basemap Gallery
                </span>
                <button onClick={() => setShowBasemapGallery(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 space-y-1.5">
                {[
                  "Light Gray Canvas",
                  "Navigation Map",
                  "Oceans",
                  "Streets (Night)",
                  "Streets Map",
                  "Terrain with Labels",
                ].map((bName) => (
                  <button
                    key={bName}
                    onClick={() => {
                      setActiveBasemap(bName);
                      setShowBasemapGallery(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition ${
                      activeBasemap === bName ? "bg-sky-100 text-sky-800 font-bold" : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    • {bName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Floating Slider Window 3: Unit-Wise Selection */}
          {showUnitWiseWidget && (
            <div className="absolute top-28 left-16 z-40 bg-white rounded-lg shadow-xl border border-slate-300 w-60 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-sky-900">
                <span>Unit-Wise Selection</span>
                <button onClick={() => setShowUnitWiseWidget(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 flex gap-4 text-slate-700">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="unitWise"
                    checked={unitType === "Administrative"}
                    onChange={() => setUnitType("Administrative")}
                    className="text-sky-600"
                  />
                  Administrative
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="unitWise"
                    checked={unitType === "Basin"}
                    onChange={() => setUnitType("Basin")}
                    className="text-sky-600"
                  />
                  Basin
                </label>
              </div>

              <div className="mt-3">
                <label className="text-slate-500 block mb-1">
                  {unitType === "Administrative" ? "Select State:" : "Select Basin:"}
                </label>
                <select
                  value={unitType === "Administrative" ? selectedState.state : selectedState.basin}
                  onChange={(e) => {
                    const match = STATE_DATASET.find((s) =>
                      unitType === "Administrative" ? s.state === e.target.value : s.basin === e.target.value
                    );
                    if (match) handleStateClick(match);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-slate-700 font-medium focus:outline-none focus:border-sky-500"
                >
                  {STATE_DATASET.map((s) => (
                    <option key={s.sNo} value={unitType === "Administrative" ? s.state : s.basin}>
                      {unitType === "Administrative" ? s.state : `${s.basin} Basin`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Interactive GIS Vector Map Canvas */}
          <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-full transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${mapZoom}) translate(${mapPan.x}px, ${mapPan.y}px)`,
                backgroundColor: activeBasemap === "Streets (Night)" ? "#0f172a" : activeBasemap === "Oceans" ? "#cce3f5" : "#e4edf3",
              }}
            >
              {/* Regional Indian Subcontinent Base Contour */}
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.4" />
                </pattern>
                <radialGradient id="highlightGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#facc15" stopOpacity="0.4" />
                </radialGradient>
              </defs>

              <rect width="1000" height="1000" fill="url(#gridPattern)" />

              {/* Simplified India Landmass Polygon */}
              <path
                d="M 330 140 L 400 120 L 460 160 L 520 230 L 630 250 L 750 250 L 880 270 L 920 340 L 850 400 L 760 380 L 680 430 L 590 530 L 540 680 L 470 850 L 410 790 L 330 680 L 250 560 L 220 480 L 280 400 L 320 320 Z"
                fill="#f8fafc"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* State Polygons with Active Highlighting */}
              {layers.stateBoundary && (
                <g id="state-boundaries">
                  {/* Uttar Pradesh Polygon */}
                  <polygon
                    points="420,310 580,310 650,380 570,450 470,430 430,370"
                    fill={selectedState.state === "Uttar Pradesh" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Uttar Pradesh" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Uttar Pradesh" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[0])}
                  />

                  {/* Punjab Polygon */}
                  <polygon
                    points="310,210 370,210 390,270 330,290 290,250"
                    fill={selectedState.state === "Punjab" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Punjab" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Punjab" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[1])}
                  />

                  {/* Gujarat Polygon */}
                  <polygon
                    points="220,440 310,430 330,520 270,570 200,530"
                    fill={selectedState.state === "Gujarat" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Gujarat" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Gujarat" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[3])}
                  />

                  {/* Karnataka Polygon */}
                  <polygon
                    points="340,650 430,650 430,780 370,820 330,730"
                    fill={selectedState.state === "Karnataka" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Karnataka" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Karnataka" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[5])}
                  />

                  {/* Andhra Pradesh Polygon */}
                  <polygon
                    points="450,620 560,600 580,720 480,770 440,690"
                    fill={selectedState.state === "Andhra Pradesh" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Andhra Pradesh" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Andhra Pradesh" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[2])}
                  />

                  {/* Bihar Polygon */}
                  <polygon
                    points="650,370 740,360 760,430 670,440"
                    fill={selectedState.state === "Bihar" ? "url(#highlightGrad)" : "#f1f5f9"}
                    stroke={selectedState.state === "Bihar" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedState.state === "Bihar" ? 3 : 1.5}
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => handleStateClick(STATE_DATASET[4])}
                  />
                </g>
              )}

              {/* Waterlogged & Salt Affected Layer Overlays */}
              {layers.waterloggedArea && (
                <g id="waterlogged-zones" opacity="0.6">
                  {/* Bundelkhand / Ganga Canal Command Waterlogging patches */}
                  <circle cx="510" cy="380" r="18" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  <circle cx="540" cy="370" r="22" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  <circle cx="490" cy="400" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  {/* Punjab Sirhind Canal patch */}
                  <circle cx="340" cy="250" r="16" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                </g>
              )}

              {layers.saltAffectedArea && (
                <g id="salt-affected-zones" opacity="0.5">
                  <rect x="250" y="470" width="28" height="20" rx="4" fill="#f43f5e" />
                  <rect x="495" cy="360" width="24" height="16" rx="4" fill="#f43f5e" />
                </g>
              )}

              {/* Soil Sample Points Layer (Clickable with Popup Modal) */}
              {layers.soilSampleProjects && (
                <g id="soil-sample-pins">
                  {[
                    { id: "P1", cx: 505, cy: 375, name: "Dams in Bundelkhand - Point 1", type: "Major", ha: "1,142,393.21" },
                    { id: "P2", cx: 535, cy: 365, name: "Ganga Canal Command - Point 2", type: "Major", ha: "2,340,763.00" },
                    { id: "P3", cx: 335, cy: 245, name: "Bist Doab Canal Command - Nakodar", type: "Major", ha: "412,050.00" },
                    { id: "P4", cx: 390, cy: 720, name: "Ghataprabha Command - Bagalkot", type: "Medium", ha: "345,020.00" },
                  ].map((pin) => (
                    <g
                      key={pin.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        setHoveredPoint(pin.name);
                        setShowSamplePopup(true);
                      }}
                    >
                      <circle cx={pin.cx} cy={pin.cy} r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={pin.cx} cy={pin.cy} r="10" fill="#2563eb" opacity="0.25" className="animate-ping" />
                    </g>
                  ))}
                </g>
              )}
            </svg>

            {/* Clickable Sample Point Popup (Matching Page 9 in PDF) */}
            {showSamplePopup && (
              <div className="absolute top-16 right-4 z-40 bg-white rounded-lg shadow-2xl border border-slate-300 w-64 p-3 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <span className="font-bold text-sky-900 truncate">Command Area: Dams in Bundelkhand</span>
                  <button onClick={() => setShowSamplePopup(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2 space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Command Name:</span>
                    <span className="font-medium text-slate-800">Dams in Bundelkhand</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="font-medium text-slate-800">Major</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-medium text-emerald-600">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Area (ha):</span>
                    <span className="font-semibold text-slate-800">1,142,393.21</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">STATE:</span>
                    <span className="font-medium text-slate-800">UP</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Scale bar & Live Coordinate Bar (Matching Page 1 & 2 in PDF) */}
          <div className="h-8 bg-white/95 border-t border-slate-300 px-4 flex items-center justify-between text-[11px] text-slate-600 z-20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-mono" suppressHydrationWarning>
                <span className="font-bold text-slate-700">Scale:</span> 1 : {Math.round(20000000 / mapZoom).toLocaleString("en-IN")}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5 font-mono">
                <span className="font-bold text-slate-700">XY:</span> {cursorCoord.lng}, {cursorCoord.lat}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[10px]">
              <span>Esri, HERE, Garmin, FAO, NOAA, USGS</span>
              <span>• Powered by NWIC GIS</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Data Panel (Statistics & Chart Views) */}
        <div className="w-1/2 h-full bg-white flex flex-col overflow-hidden">
          {/* Header Bar of Data Panel (Matching Page 5 & 6 in PDF) */}
          <div className="bg-sky-800 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs">
                State Name: <strong>{selectedState.state}</strong>
              </span>
              <span className="text-[10px] bg-sky-900 px-2 py-0.5 rounded border border-sky-600">
                Basin: {selectedState.basin}
              </span>
            </div>

            {onSelectStateForSimulation && (
              <button
                onClick={() => onSelectStateForSimulation(selectedState.state)}
                className="text-[11px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded flex items-center gap-1 transition shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simulate in Causal Assistant
              </button>
            )}
          </div>

          {/* Info Banner (Matching Page 5 in PDF) */}
          <div className="bg-sky-50 border-b border-sky-100 px-4 py-1.5 flex items-center gap-2 text-[11px] text-sky-800">
            <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>
              Click row in table to zoom to state. Blue markers show soil sample irrigation points with telemetry.
            </span>
          </div>

          {/* Sub-Tabs: Statistics vs. Chart (Matching Page 5 & 7 in PDF) */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-4">
            <button
              onClick={() => setActiveTab("statistics")}
              className={`py-2 px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "statistics"
                  ? "border-sky-700 text-sky-800 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Statistics
            </button>
            <button
              onClick={() => setActiveTab("chart")}
              className={`py-2 px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "chart"
                  ? "border-sky-700 text-sky-800 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Chart
            </button>
          </div>

          {/* TAB 1: Statistics View (Table matching Page 1 & 5 in PDF) */}
          {activeTab === "statistics" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-700 text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">S.No</th>
                      <th className="py-2.5 px-3">State</th>
                      <th className="py-2.5 px-3 text-right">Major Projects</th>
                      <th className="py-2.5 px-3 text-right">Command Area (Th Ha)</th>
                      <th className="py-2.5 px-3 text-right">Salt Affected (Th Ha)</th>
                      <th className="py-2.5 px-3 text-right">Waterlogged (Th Ha)</th>
                      <th className="py-2.5 px-3 text-right">Geo Area (Th Ha)</th>
                      <th className="py-2.5 px-3 text-right">Medium Projects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filteredStates.map((row) => {
                      const isSelected = row.state === selectedState.state;
                      return (
                        <tr
                          key={row.sNo}
                          onClick={() => handleStateClick(row)}
                          className={`cursor-pointer transition ${
                            isSelected ? "bg-sky-100 font-semibold text-sky-900" : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="py-2 px-3">{row.sNo}</td>
                          <td className="py-2 px-3 flex items-center gap-1.5">
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-700"></span>}
                            {row.state}
                          </td>
                          <td className="py-2 px-3 text-right font-mono">{row.majorProjects}</td>
                          <td className="py-2 px-3 text-right font-mono" suppressHydrationWarning>{row.commandAreaThHa.toLocaleString("en-IN")}</td>
                          <td className="py-2 px-3 text-right font-mono text-rose-600" suppressHydrationWarning>{row.saltAffectedThHa.toLocaleString("en-IN")}</td>
                          <td className="py-2 px-3 text-right font-mono text-amber-600" suppressHydrationWarning>{row.waterloggedThHa.toLocaleString("en-IN")}</td>
                          <td className="py-2 px-3 text-right font-mono" suppressHydrationWarning>{row.geoAreaThHa.toLocaleString("en-IN")}</td>
                          <td className="py-2 px-3 text-right font-mono">{row.mediumProjects}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Chart View (Matching Page 7 & 8 in PDF) */}
          {activeTab === "chart" && (
            <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
              {/* Chart Selector Pills */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
                <span className="text-slate-400 font-medium">Select Chart:</span>
                <button
                  onClick={() => setChartSubView("area")}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    chartSubView === "area" ? "bg-sky-700 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  Area Statistics
                </button>
                <button
                  onClick={() => setChartSubView("command")}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    chartSubView === "command" ? "bg-sky-700 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  Command Statistics
                </button>
                <button
                  onClick={() => setChartSubView("pctAffected")}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    chartSubView === "pctAffected" ? "bg-sky-700 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  % Affected Area in Commands
                </button>
              </div>

              {/* Chart Rendering Container */}
              <div className="h-72 w-full bg-slate-50 border border-slate-200 rounded-lg p-3">
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  {chartSubView === "area" && `Area Statistics - ${selectedState.state}`}
                  {chartSubView === "command" && `Command Statistics - ${selectedState.state}`}
                  {chartSubView === "pctAffected" && `% Affected Area in Commands - ${selectedState.state}`}
                </h4>

                <ResponsiveContainer width="100%" height="90%">
                  {chartSubView === "area" ? (
                    <BarChart data={areaChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Salt Affected (Th Ha)" fill="#6366f1" />
                      <Bar dataKey="Command Area (Th Ha)" fill="#06b6d4" />
                      <Bar dataKey="Geographical Area (Th Ha)" fill="#f43f5e" />
                      <Bar dataKey="Total Waterlogged (Th Ha)" fill="#eab308" />
                    </BarChart>
                  ) : chartSubView === "command" ? (
                    <BarChart data={commandChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Medium Command Projects" fill="#4f46e5" />
                      <Bar dataKey="Major Command Projects" fill="#0891b2" />
                    </BarChart>
                  ) : (
                    <BarChart data={pctChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="% Affected Area in Commands" fill="#3b82f6" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export / Download Excel Modal (Matching Page 6 in PDF) */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden animate-in fade-in">
            <div className="bg-sky-800 text-white px-4 py-3 flex items-center justify-between font-bold text-sm">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Download Data Resource
              </span>
              <button onClick={() => setShowDownloadModal(false)} className="text-sky-200 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 text-xs text-slate-700 space-y-4">
              <p className="text-slate-600">
                Kindly state your purpose of downloading this NWIC water logging and soil salinity resource:
              </p>

              <div>
                <label className="font-semibold block mb-2">Purpose:</label>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  {["Government official", "Professional", "Student", "Academician", "NGO", "Other"].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="downloadPurpose" defaultChecked={p === "Professional"} className="text-sky-600" />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-slate-500 block mb-1">Enter Name:</label>
                  <input
                    type="text"
                    defaultValue="Researcher / Engineer"
                    className="w-full border border-slate-300 rounded p-2 text-slate-800 outline-none focus:border-sky-600"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Enter Email Address:</label>
                  <input
                    type="email"
                    defaultValue="policy.analyst@cgwb.gov.in"
                    className="w-full border border-slate-300 rounded p-2 text-slate-800 outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Dataset exported successfully in Excel (.xlsx) format!");
                  setShowDownloadModal(false);
                }}
                className="w-full py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded-lg transition shadow"
              >
                Submit & Download Excel (.xlsx)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Map Modal (Matching Page 10 in PDF) */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-sm overflow-hidden animate-in fade-in">
            <div className="bg-sky-800 text-white px-4 py-3 flex items-center justify-between font-bold text-sm">
              <span className="flex items-center gap-2">
                <Printer className="w-4 h-4" /> Export Map
              </span>
              <button onClick={() => setShowPrintModal(false)} className="text-sky-200 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 text-xs text-slate-700 space-y-3">
              <div>
                <label className="text-slate-500 block mb-1">Title:</label>
                <input
                  type="text"
                  defaultValue={`Waterlogging Map - ${selectedState.state}`}
                  className="w-full border border-slate-300 rounded p-1.5 text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Page setup:</label>
                <select className="w-full border border-slate-300 rounded p-1.5 text-slate-800">
                  <option>Letter ANSI A landscape</option>
                  <option>A4 Landscape</option>
                  <option>A4 Portrait</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">File format:</label>
                <select className="w-full border border-slate-300 rounded p-1.5 text-slate-800">
                  <option>PDF</option>
                  <option>PNG</option>
                  <option>JPG</option>
                  <option>SVG</option>
                </select>
              </div>

              <button
                onClick={() => {
                  window.print();
                  setShowPrintModal(false);
                }}
                className="w-full py-2 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded transition"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
