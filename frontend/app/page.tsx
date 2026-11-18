"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Droplets, TrendingDown, TrendingUp } from "lucide-react";

interface CausalTrace {
  unit: string;
  block_name: string;
  district: string;
  state: string;
  aquifer_type: string;
  intervention: string;
  adoption_pct: number;
  horizon_years: number;
  current_stage_pct: number;
  current_category: string;
  timesfm_baseline_trajectory: number[];
  causal_counterfactual_trajectory: number[];
  final_year_baseline_pct: number;
  final_year_projected_pct: number;
  net_causal_effect_pct: number;
  return_flow_loss_ham: number;
  projected_category: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  causal_trace?: CausalTrace;
}

function getTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function categoryColor(cat: string) {
  if (cat === "Safe") return "text-green-400 bg-green-900/40 border-green-700";
  if (cat === "Semi-Critical") return "text-yellow-400 bg-yellow-900/40 border-yellow-700";
  if (cat === "Critical") return "text-orange-400 bg-orange-900/40 border-orange-700";
  return "text-red-400 bg-red-900/40 border-red-700"; // Over-Exploited
}

function SimCard({ trace }: { trace: CausalTrace }) {
  const isImproving = trace.net_causal_effect_pct < 0;
  const bau = trace.timesfm_baseline_trajectory;
  const cfact = trace.causal_counterfactual_trajectory;

  return (
    <div className="mt-3 rounded-xl border border-gray-700 bg-gray-900/80 overflow-hidden text-xs">
      {/* Header */}
      <div className="px-4 py-2.5 bg-gray-800/60 border-b border-gray-700 flex items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-cyan-300">{trace.unit}</span>
          <span className="ml-2 text-gray-400">· {trace.aquifer_type}</span>
        </div>
        <span className="text-[10px] text-gray-500 italic">TimesFM 2.5 + Causal Inference</span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 divide-x divide-gray-700/60 border-b border-gray-700">
        <div className="px-3 py-2.5 text-center">
          <div className="text-[10px] text-gray-500 mb-1">Current Stage</div>
          <div className={`font-bold text-sm px-1.5 py-0.5 rounded border inline-block ${categoryColor(trace.current_category)}`}>
            {trace.current_stage_pct}%
          </div>
          <div className="text-[9px] text-gray-500 mt-0.5">{trace.current_category}</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="text-[10px] text-gray-500 mb-1">TimesFM BAU (Y{trace.horizon_years})</div>
          <div className="font-bold text-sm text-yellow-300">{trace.final_year_baseline_pct}%</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="text-[10px] text-gray-500 mb-1">Projected (Y{trace.horizon_years})</div>
          <div className={`font-bold text-sm px-1.5 py-0.5 rounded border inline-block ${categoryColor(trace.projected_category)}`}>
            {trace.final_year_projected_pct}%
          </div>
          <div className="text-[9px] text-gray-500 mt-0.5">{trace.projected_category}</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="text-[10px] text-gray-500 mb-1">Net Causal Δ</div>
          <div className={`font-bold text-sm flex items-center justify-center gap-0.5 ${isImproving ? "text-green-400" : "text-red-400"}`}>
            {isImproving ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
            {trace.net_causal_effect_pct > 0 ? "+" : ""}{trace.net_causal_effect_pct}%
          </div>
        </div>
      </div>

      {/* Year-by-year trajectory table */}
      <div className="px-4 py-2.5">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium uppercase tracking-wide">
          Year-by-Year Trajectory · {trace.adoption_pct}% adoption · {trace.intervention.replace(/_/g, " ")}
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-gray-500 border-b border-gray-700/50">
              <th className="text-left pb-1 font-medium">Year</th>
              <th className="text-right pb-1 font-medium">TimesFM BAU</th>
              <th className="text-right pb-1 font-medium">Causal Projected</th>
              <th className="text-right pb-1 font-medium">Δ Effect</th>
            </tr>
          </thead>
          <tbody>
            {bau.map((b, i) => {
              const c = cfact[i];
              const delta = +(c - b).toFixed(2);
              return (
                <tr key={i} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-1 text-gray-400">Y{i + 1}</td>
                  <td className="py-1 text-right text-yellow-300">{b}%</td>
                  <td className={`py-1 text-right font-semibold ${c < b ? "text-green-400" : "text-red-400"}`}>{c}%</td>
                  <td className={`py-1 text-right ${delta < 0 ? "text-green-400" : "text-red-400"}`}>
                    {delta > 0 ? "+" : ""}{delta}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-800/30 border-t border-gray-700/50 text-[10px] text-gray-500 flex justify-between">
        <span>Return-flow percolation loss: <span className="text-gray-300">{trace.return_flow_loss_ham.toLocaleString("en-IN")} ham</span> ({trace.aquifer_type})</span>
        <span>GEC-2015 · CGWB</span>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hi! I'm the INGRES Groundwater Policy Assistant. I use **Google TimesFM 2.5** for time-series forecasting and **Structural Causal Inference** to simulate groundwater policy interventions across India.\n\nAsk me about any block, district, or policy scenario.",
      timestamp: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: query, timestamp: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const answer = data.answer || "No response from server.";
      const causal_trace: CausalTrace | undefined = data.causal_trace;

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: answer, timestamp: getTime(), causal_trace },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "⚠️ Could not reach the backend. Make sure the FastAPI server is running on port 8000.",
          timestamp: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "In Nakodar (Punjab), what happens if 35% of paddy shifts to micro-irrigation over 3 years?",
    "Simulate power subsidy rationalization in Bagalkot (Karnataka) with 40% adoption.",
    "What is the groundwater status of Kolar district in Karnataka?",
    "Recommend a policy for Over-Exploited blocks in Rajasthan.",
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight">INGRES Policy Assistant</h1>
          <p className="text-[11px] text-gray-400">CGWB · Google TimesFM 2.5 · Structural Causal Inference · Gemini</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shrink-0 mt-1 shadow">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === "user" ? "" : "w-full"}`}>
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white rounded-br-sm"
                    : "bg-gray-800 border border-gray-700/60 text-gray-100 rounded-bl-sm"
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="mt-1.5 text-[10px] opacity-50 text-right">{msg.timestamp}</div>
              </div>
              {/* Simulation data card */}
              {msg.causal_trace && <SimCard trace={msg.causal_trace} />}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center pl-11">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-cyan-400 animate-pulse">
              <Sparkles className="w-4 h-4 shrink-0" />
              Running TimesFM 2.5 + Causal simulation…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => send(s)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 transition text-left"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-5 pt-2 border-t border-gray-800 bg-gray-900/60 backdrop-blur">
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex gap-2 items-end"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about any groundwater block in India…"
            className="flex-1 resize-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition max-h-32"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition shadow shadow-cyan-600/30 shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
