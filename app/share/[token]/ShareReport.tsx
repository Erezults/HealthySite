'use client';

/**
 * Read-only medical report renderer for the public doctor-share viewer.
 *
 * This mirrors the SHAPE of the app's `reportGenerator.buildReportHtml` output
 * (header → AI executive summary → chapter timeline → record cards → lab tables)
 * but is rendered with the healthy-web "Editorial Wellness" Tailwind tokens.
 *
 * Hard rules (enforced by the SERVER — this component only ever receives the
 * already-sanitized, id-free bundle):
 *  - NO links anywhere (referrer/token leak prevention; nothing pivots into the app).
 *  - NO forms, NO buttons, NO write controls — purely presentational.
 *  - The bundle contains NO ids, NO group internals — only whitelisted display fields.
 *
 * The `ShareBundle` type is intentionally duplicated from the Deno
 * `_shared/share/sanitize.ts` `EventShareBundle` (§4c / §7 — keep in sync).
 */

type Lang = 'he' | 'en';

type Lab = {
  name: string;
  value: string;
  unit?: string;
  flag?: string; // 'normal' | 'borderline' | 'critical' | string
};

type ShareChapter = {
  title: string;
  type: string;
  occurredAt?: string;
  notes?: string;
  aiSummary?: string;
};

type ShareRecord = {
  name: string;
  date?: string;
  doctor?: string;
  location?: string;
  specialty?: string;
  notes?: string;
  labs: Lab[];
  aiOneLine?: string;
};

type ShareAi = {
  executiveSummary?: string;
  keyFindings?: string[];
  recommendations?: string[];
  warnings?: string[];
  timelineOverview?: string;
};

export type EventShareBundle = {
  kind: 'event';
  lang: Lang;
  patientName: string;
  patientDetails?: { birthYear?: number; gender?: string };
  event: {
    title: string;
    status: string;
    startedAt?: string;
    endedAt?: string;
  };
  chapters: ShareChapter[];
  records: ShareRecord[];
  ai?: ShareAi;
};

/**
 * Forward-compatible record/year-summary kinds (v1 may ship event-only — §13).
 * Kept loose so an early ShareReport never crashes on a future bundle shape.
 */
export type ShareBundle =
  | EventShareBundle
  | {
      kind: 'record' | 'year_summary';
      lang: Lang;
      patientName: string;
      patientDetails?: { birthYear?: number; gender?: string };
      // record-shaped payload reuses the same record/lab fields
      title?: string;
      records?: ShareRecord[];
      ai?: ShareAi;
    };

const STRINGS = {
  en: {
    sharedReport: 'Shared health report',
    patient: 'Patient',
    born: 'Born',
    statusActive: 'Active',
    statusCompleted: 'Completed',
    statusPlanned: 'Planned',
    execSummary: 'Executive summary',
    keyFindings: 'Key findings',
    followUp: 'Follow-up required',
    recommendations: 'Recommendations',
    timeline: 'Timeline',
    records: 'Records',
    test: 'Test',
    value: 'Value',
    flag: 'Flag',
    aiDisclaimer:
      'This summary was generated with AI assistance and does not replace professional medical advice.',
    readOnly:
      'This is a private, read-only report shared with you. It cannot be edited.',
    noData: 'No data to display.',
    doctor: 'Doctor',
    location: 'Location',
    specialty: 'Specialty',
  },
  he: {
    sharedReport: 'דוח בריאות משותף',
    patient: 'מטופל/ת',
    born: 'שנת לידה',
    statusActive: 'פעיל',
    statusCompleted: 'הושלם',
    statusPlanned: 'מתוכנן',
    execSummary: 'סיכום מנהלים',
    keyFindings: 'ממצאים עיקריים',
    followUp: 'נדרש מעקב',
    recommendations: 'המלצות',
    timeline: 'ציר זמן',
    records: 'רשומות',
    test: 'בדיקה',
    value: 'ערך',
    flag: 'דגל',
    aiDisclaimer:
      'סיכום זה נוצר בסיוע בינה מלאכותית ואינו מחליף ייעוץ רפואי מקצועי.',
    readOnly: 'זהו דוח פרטי לקריאה בלבד ששותף איתך. לא ניתן לערוך אותו.',
    noData: 'אין נתונים להצגה.',
    doctor: 'רופא/ה',
    location: 'מיקום',
    specialty: 'תחום',
  },
} as const;

function fmtDate(iso: string | undefined, lang: Lang): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function statusLabel(status: string, lang: Lang): string {
  const s = STRINGS[lang];
  switch (status) {
    case 'active':
      return s.statusActive;
    case 'completed':
      return s.statusCompleted;
    case 'planned':
      return s.statusPlanned;
    default:
      return status;
  }
}

function statusClasses(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-[rgba(46,93,68,0.10)] text-[var(--color-brand-forest-deep)]';
    case 'active':
      return 'bg-[rgba(217,162,59,0.16)] text-[#8a6410]';
    case 'planned':
      return 'bg-[var(--color-surface)] text-[var(--color-text-muted)]';
    default:
      return 'bg-[var(--color-surface)] text-[var(--color-text-muted)]';
  }
}

/** Lab flag → calm tint (critical=terracotta, borderline=mustard, normal=muted). */
function labFlagClasses(flag: string | undefined): string {
  if (flag === 'critical')
    return 'text-[var(--color-brand-terracotta)] font-semibold';
  if (flag === 'borderline') return 'text-[#8a6410] font-medium';
  return 'text-[var(--color-text-soft)]';
}

function LabTable({ labs, lang }: { labs: Lab[]; lang: Lang }) {
  if (!labs?.length) return null;
  const s = STRINGS[lang];
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[rgba(46,93,68,0.05)] text-[var(--color-text-muted)]">
            <th className="px-3 py-2 text-start font-medium">{s.test}</th>
            <th className="px-3 py-2 text-start font-medium">{s.value}</th>
            <th className="px-3 py-2 text-start font-medium">{s.flag}</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((l, i) => (
            <tr
              key={i}
              className="border-t border-[var(--color-border)] align-top"
            >
              <td className="px-3 py-2 text-[var(--color-text-soft)]">
                {l.name}
              </td>
              <td className={`px-3 py-2 ${labFlagClasses(l.flag)}`}>
                <strong>{l.value}</strong>
                {l.unit ? ` ${l.unit}` : ''}
              </td>
              <td className="px-3 py-2 text-[var(--color-text-muted)]">
                {l.flag === 'critical'
                  ? '⚠'
                  : l.flag === 'borderline'
                    ? '•'
                    : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecordCard({ rec, lang }: { rec: ShareRecord; lang: Lang }) {
  const s = STRINGS[lang];
  const meta = [
    rec.doctor && `${s.doctor}: ${rec.doctor}`,
    rec.specialty,
    rec.location,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5 shadow-[0_1px_2px_rgba(31,42,34,0.04)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="font-display text-lg text-[var(--color-text)]">
          {rec.name}
        </h4>
        {rec.date ? (
          <span className="text-sm text-[var(--color-text-muted)] tabular-nums">
            {fmtDate(rec.date, lang)}
          </span>
        ) : null}
      </div>
      {meta ? (
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{meta}</p>
      ) : null}
      {rec.aiOneLine ? (
        <p className="mt-3 rounded-lg bg-[rgba(46,93,68,0.05)] px-3 py-2 text-sm italic text-[var(--color-text-soft)]">
          {rec.aiOneLine}
        </p>
      ) : null}
      {rec.notes ? (
        <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-text-soft)]">
          {rec.notes}
        </p>
      ) : null}
      <LabTable labs={rec.labs ?? []} lang={lang} />
    </div>
  );
}

function ChapterBlock({ ch, lang }: { ch: ShareChapter; lang: Lang }) {
  return (
    <div className="relative ps-6">
      {/* timeline dot + connector */}
      <span
        aria-hidden
        className="absolute start-0 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-brand-forest)] bg-[var(--color-paper)]"
      />
      <span
        aria-hidden
        className="absolute start-[5px] top-5 bottom-[-1.25rem] w-px bg-[var(--color-border)]"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="font-display text-xl text-[var(--color-text)]">
          {ch.title}
        </h3>
        {ch.occurredAt ? (
          <span className="text-sm text-[var(--color-text-muted)] tabular-nums">
            {fmtDate(ch.occurredAt, lang)}
          </span>
        ) : null}
      </div>
      {ch.type ? (
        <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
          {ch.type}
        </p>
      ) : null}
      {ch.aiSummary ? (
        <p className="mt-2 rounded-lg bg-[rgba(46,93,68,0.05)] px-3 py-2 text-sm italic text-[var(--color-text-soft)]">
          {ch.aiSummary}
        </p>
      ) : ch.notes ? (
        <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-text-soft)]">
          {ch.notes}
        </p>
      ) : null}
    </div>
  );
}

function AiSummary({ ai, lang }: { ai: ShareAi; lang: Lang }) {
  const s = STRINGS[lang];
  const hasContent =
    ai.executiveSummary ||
    ai.keyFindings?.length ||
    ai.recommendations?.length ||
    ai.warnings?.length ||
    ai.timelineOverview;
  if (!hasContent) return null;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6">
      <h2 className="font-display text-2xl text-[var(--color-text)]">
        {s.execSummary}
      </h2>
      {ai.executiveSummary ? (
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-soft)]">
          {ai.executiveSummary}
        </p>
      ) : null}
      {ai.timelineOverview ? (
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-soft)]">
          {ai.timelineOverview}
        </p>
      ) : null}

      {ai.keyFindings?.length ? (
        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            {s.keyFindings}
          </h3>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-[15px] text-[var(--color-text-soft)]">
            {ai.keyFindings.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {ai.warnings?.length ? (
        <div className="mt-5 rounded-xl border border-[rgba(195,106,75,0.35)] bg-[rgba(195,106,75,0.07)] p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-brand-terracotta)]">
            ⚠ {s.followUp}
          </h3>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-[15px] text-[var(--color-text-soft)]">
            {ai.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {ai.recommendations?.length ? (
        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            {s.recommendations}
          </h3>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-[15px] text-[var(--color-text-soft)]">
            {ai.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-5 text-xs italic text-[var(--color-text-muted)]">
        {s.aiDisclaimer}
      </p>
    </section>
  );
}

export function ShareReport({ bundle }: { bundle: ShareBundle }) {
  const lang: Lang = bundle.lang === 'he' ? 'he' : 'en';
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const s = STRINGS[lang];

  // Normalize event vs record/year-summary into one render shape.
  const isEvent = bundle.kind === 'event';
  const title = isEvent
    ? (bundle as EventShareBundle).event.title
    : ((bundle as { title?: string }).title ?? s.sharedReport);
  const status = isEvent ? (bundle as EventShareBundle).event.status : '';
  const startedAt = isEvent
    ? (bundle as EventShareBundle).event.startedAt
    : undefined;
  const endedAt = isEvent
    ? (bundle as EventShareBundle).event.endedAt
    : undefined;
  const chapters = isEvent ? (bundle as EventShareBundle).chapters : [];
  const records = isEvent
    ? (bundle as EventShareBundle).records
    : ((bundle as { records?: ShareRecord[] }).records ?? []);

  const dateRange = [fmtDate(startedAt, lang), fmtDate(endedAt, lang)]
    .filter(Boolean)
    .join(' – ');

  const detailBits = [
    bundle.patientDetails?.birthYear
      ? `${s.born} ${bundle.patientDetails.birthYear}`
      : null,
    bundle.patientDetails?.gender || null,
  ].filter(Boolean);

  return (
    <section dir={dir} className="relative grain">
      <span
        className="leaf"
        style={{
          width: 520,
          height: 520,
          top: -260,
          insetInlineEnd: -160,
          opacity: 0.3,
        }}
      />
      <div
        className="relative mx-auto max-w-3xl px-5 pb-32 pt-16 sm:px-8"
        style={
          lang === 'he'
            ? { fontFamily: 'var(--font-sans-he), system-ui, sans-serif' }
            : undefined
        }
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="border-b border-[var(--color-border)] pb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-forest)] text-lg font-bold text-white">
              H
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {s.sharedReport}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-lg text-[var(--color-text-soft)]">
              {s.patient}: <strong>{bundle.patientName}</strong>
            </span>
            {detailBits.length ? (
              <span className="text-sm text-[var(--color-text-muted)]">
                {detailBits.join(' · ')}
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {status ? (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusClasses(
                  status,
                )}`}
              >
                {statusLabel(status, lang)}
              </span>
            ) : null}
            {dateRange ? (
              <span className="text-sm text-[var(--color-text-muted)] tabular-nums">
                {dateRange}
              </span>
            ) : null}
          </div>
        </header>

        {/* ── AI executive summary ───────────────────────────────── */}
        {bundle.ai ? (
          <div className="mt-10">
            <AiSummary ai={bundle.ai} lang={lang} />
          </div>
        ) : null}

        {/* ── Chapter timeline ───────────────────────────────────── */}
        {chapters.length ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              {s.timeline}
            </h2>
            <div className="mt-6 space-y-8">
              {chapters.map((ch, i) => (
                <ChapterBlock key={i} ch={ch} lang={lang} />
              ))}
            </div>
          </div>
        ) : null}

        {/* ── Records ────────────────────────────────────────────── */}
        {records.length ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              {s.records}
            </h2>
            <div className="mt-6 space-y-5">
              {records.map((rec, i) => (
                <RecordCard key={i} rec={rec} lang={lang} />
              ))}
            </div>
          </div>
        ) : null}

        {!chapters.length && !records.length && !bundle.ai ? (
          <p className="mt-12 text-[var(--color-text-muted)]">{s.noData}</p>
        ) : null}

        {/* ── Read-only / privacy footnote ───────────────────────── */}
        <footer className="mt-16 border-t border-[var(--color-border)] pt-6">
          <p className="text-sm text-[var(--color-text-muted)]">{s.readOnly}</p>
        </footer>
      </div>
    </section>
  );
}
