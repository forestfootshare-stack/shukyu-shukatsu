import { useMemo, useState } from "react";
import { companies, INDUSTRIES, JOB_TYPES, LOCATIONS } from "../data/companies";
import { CompanyCard, SectionHead, Empty } from "../components/UI";
import { SearchIcon } from "../components/Visual";

function FilterGroup({ label, options, value, onChange }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="chip-group">
        {options.map((o) => (
          <button key={o} type="button" className="chip" aria-pressed={value.includes(o)} onClick={() => toggle(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Companies() {
  const [q, setQ] = useState("");
  const [ind, setInd] = useState([]);
  const [job, setJob] = useState([]);
  const [loc, setLoc] = useState([]);
  const [football, setFootball] = useState(false);
  const [athlete, setAthlete] = useState(false);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const key = q.trim().toLowerCase();
    return companies.filter((c) => {
      if (key) {
        const hay = [c.name, c.tagline, c.industry, c.about, ...c.tags, ...c.jobs].join(" ").toLowerCase();
        if (!hay.includes(key)) return false;
      }
      if (ind.length && !ind.includes(c.industry)) return false;
      if (job.length && !c.jobs.some((j) => job.includes(j))) return false;
      if (loc.length && !c.locations.some((l) => loc.includes(l))) return false;
      if (football && !c.welcomesFootball) return false;
      if (athlete && !c.welcomesAthlete) return false;
      return true;
    });
  }, [q, ind, job, loc, football, athlete]);

  const active = ind.length + job.length + loc.length + (football ? 1 : 0) + (athlete ? 1 : 0);
  const reset = () => { setQ(""); setInd([]); setJob([]); setLoc([]); setFootball(false); setAthlete(false); };

  const filters = (
    <div className="filters">
      <FilterGroup label="業界" options={INDUSTRIES} value={ind} onChange={setInd} />
      <FilterGroup label="職種" options={JOB_TYPES} value={job} onChange={setJob} />
      <FilterGroup label="勤務地" options={LOCATIONS} value={loc} onChange={setLoc} />
      <div className="filter-group">
        <span className="filter-label">競技経験</span>
        <div style={{ display: "grid", gap: 11 }}>
          <label className="check">
            <input type="checkbox" checked={football} onChange={(e) => setFootball(e.target.checked)} />
            <span>サッカー経験者歓迎</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={athlete} onChange={(e) => setAthlete(e.target.checked)} />
            <span>体育会経験者歓迎</span>
          </label>
        </div>
      </div>
      {active > 0 && (
        <button className="btn btn-ghost btn-sm" onClick={reset}>絞り込みをすべて解除</button>
      )}
    </div>
  );

  return (
    <div className="page">
      <div className="wrap">
        <SectionHead
          en="COMPANIES"
          title="あなたの経験を評価してくれる企業を探そう。"
          lead="各企業のページには、競技経験のどこを評価しているかが書かれています。気になる企業から話を聞いてみてください。"
        />

        <div className="search-box" style={{ marginBottom: 24 }}>
          <SearchIcon />
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="企業名・業界・キーワードで検索"
            aria-label="企業を検索"
            type="search"
          />
        </div>

        <div className="list-layout">
          {/* PC: サイドバー / スマホ: 開閉パネル */}
          <div>
            <button
              className="btn btn-ghost btn-block"
              style={{ display: "none" }}
              id="filter-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              絞り込み{active > 0 ? `（${active}件適用中）` : ""}
            </button>
            <div className="side-panel" data-open={open}>{filters}</div>
          </div>

          <div>
            <p className="muted" style={{ marginBottom: 16 }}>
              {results.length}社が見つかりました
              {active > 0 && `（${active}件の条件で絞り込み中）`}
            </p>

            {results.length === 0 ? (
              <Empty
                title="条件に合う企業が見つかりませんでした"
                lead="キーワードを短くするか、絞り込み条件を減らしてみてください。"
              />
            ) : (
              <div className="grid-2">
                {results.map((c) => <CompanyCard key={c.id} c={c} />)}
              </div>
            )}

            <p className="tiny" style={{ marginTop: 26 }}>
              ※ 掲載している企業はすべて初版用のサンプルです。実在する企業との提携を示すものではありません。
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #filter-toggle { display: flex !important; margin-bottom: 12px; }
          .side-panel[data-open="false"] { display: none; }
        }
      `}</style>
    </div>
  );
}
