/** QUIZ WORDING: change the questions and answers in 3 languages. The matching logic stays the same. */
import { useState } from "react";
import { DEFAULT_QUIZ, QUIZ_STEPS } from "../lib/defaults.js";
import { btn, Card, Guide, Icon, LangTabs, SectionTitle, T3Field } from "./ui.jsx";

const STEP_INFO = {
  goal: "The main goal. It also names their result (e.g. “Lean Cut stack”).",
  body: "Man/Woman, age, height and weight on one screen. Used for calories and protein.",
  level: "How often they train. Beginners get at most 2 products, regular 3, hard training 4.",
  avoid: "Safety. Caffeine, heart, pregnancy and medication answers hide unsuitable products.",
  budget: "Their monthly budget. A low budget usually means one product.",
};

export default function QuizWords({ draft, setDraft }) {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState("goal");
  const quiz = draft.quiz;

  const setStep = (key, change) => setDraft((d) => ({ ...d, quiz: { ...d.quiz, [key]: { ...d.quiz[key], ...change } } }));
  const setOption = (key, id, change) =>
    setStep(key, { options: { ...quiz[key].options, [id]: { ...quiz[key].options[id], ...change } } });
  const reset = (key) => {
    if (confirm("Put back the original wording for this question (all languages)?")) setStep(key, structuredClone(DEFAULT_QUIZ[key]));
  };

  return (
    <>
      <SectionTitle title="Quiz wording" intro="Change what the questions and answers say. The questions themselves and how products are picked stay the same, so results stay safe." actions={<LangTabs value={lang} onChange={setLang} />} />
      <Guide
        id="quiz"
        steps={[
          "Choose the language at the top right.",
          "Open a question by clicking it. They're listed in the order customers see them.",
          "Change the question, the small line under it, and the answer words.",
          "Press “Save changes” at the bottom. Made a mess? Use “Reset to original”.",
        ]}
        tip="Keep answers short: people read them on a phone in a second."
      />

      <ol className="flex flex-col gap-3">
        {QUIZ_STEPS.map((s, i) => {
          const q = quiz[s.key];
          const isOpen = open === s.key;
          return (
            <li key={s.key}>
              <Card className="!p-0">
                <button onClick={() => setOpen(isOpen ? null : s.key)} className="flex w-full items-center gap-4 p-5 text-start">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum text-[14px] font-bold text-white">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold" dir={lang === "en" ? "ltr" : "rtl"}>{q.title[lang] || q.title.en}</span>
                    <span className="block text-[13px] text-muted">{STEP_INFO[s.key]}</span>
                  </span>
                  <Icon name="back" size={16} className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`} />
                </button>
                {isOpen && (
                  <div className="flex flex-col gap-4 border-t border-line p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <T3Field label="Question" lang={lang} value={q.title} onChange={(title) => setStep(s.key, { title })} />
                      <T3Field label="Small line under the question" lang={lang} value={q.subtitle} onChange={(subtitle) => setStep(s.key, { subtitle })} />
                    </div>
                    {Object.keys(q.options).length > 0 && (
                      <div>
                        <p className="mb-2 text-[13.5px] font-semibold">Answers</p>
                        <ul className="flex flex-col gap-2.5">
                          {Object.entries(q.options).map(([id, o]) => (
                            <li key={id} className="grid gap-3 rounded-[16px] bg-mist p-3 md:grid-cols-[auto_1fr_1fr] md:items-end">
                              <span className="grid h-10 w-10 place-items-center rounded-full bg-white">{s.icons?.[id] ? <Icon name={s.icons[id]} size={19} /> : <Icon name="sparkle" size={17} />}</span>
                              <T3Field label="Answer" lang={lang} value={o.label} onChange={(label) => setOption(s.key, id, { label })} />
                              <T3Field label="Small hint (optional)" lang={lang} value={o.hint ?? {}} onChange={(hint) => setOption(s.key, id, { hint })} badge={false} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button onClick={() => reset(s.key)} className={`${btn.ghost} self-start`}>Reset to original</button>
                  </div>
                )}
              </Card>
            </li>
          );
        })}
      </ol>
    </>
  );
}
