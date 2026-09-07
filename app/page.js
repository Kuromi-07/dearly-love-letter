"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const templates = [
  {
    id: "classic",
    label: "Classic",
    description: "Timeless & tender",
    accent: "#b8473d",
    title: "A letter for the one I love",
    greeting: "My dearest {name},",
    body: "Somehow, even after all this time, you still make ordinary days feel like something worth celebrating. I love the way you see the world, the way you make space for my dreams, and the quiet comfort of knowing I can always be myself with you.\n\nThank you for being my favorite person and my safest place. I choose you, today and every day that follows.",
  },
  {
    id: "little-things",
    label: "Little things",
    description: "Soft & specific",
    accent: "#cc7b43",
    title: "The little things I love",
    greeting: "Hey {name},",
    body: "I love the little things about us. The way you send me songs you think I will like. How you always remember my coffee order. The look we share across a crowded room.\n\nNone of it is little to me. It is the collection of these tiny, beautiful moments that makes loving you feel like home.",
  },
  {
    id: "long-distance",
    label: "Long distance",
    description: "Close, wherever",
    accent: "#427a78",
    title: "Until I see you again",
    greeting: "My love,",
    body: "The miles between us have taught me that closeness is not always measured in steps. You are in my morning coffee, in every good story I save to tell you, and in the quiet moments when I reach for your hand in my thoughts.\n\nI am counting down the days, but I am not waiting to love you. I am loving you through all of them.",
  },
];

const initialLetter = {
  recipient: "",
  sender: "",
  title: templates[0].title,
  greeting: templates[0].greeting,
  body: templates[0].body,
  signoff: "Always yours,",
};

const savedLetterKey = "dearly-letter";

export default function Home() {
  const [letter, setLetter] = useState(initialLetter);
  const [activeTemplate, setActiveTemplate] = useState("classic");
  const [downloadStatus, setDownloadStatus] = useState("");
  const [hasLoadedSavedLetter, setHasLoadedSavedLetter] = useState(false);
  const [letterPaper, setLetterPaper] = useState(null);

  useEffect(() => {
    try {
      const savedLetter = window.localStorage.getItem(savedLetterKey);
      if (savedLetter) {
        setLetter({ ...initialLetter, ...JSON.parse(savedLetter) });
      }
    } catch {
    } finally {
      setHasLoadedSavedLetter(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedSavedLetter) {
      try {
        window.localStorage.setItem(savedLetterKey, JSON.stringify(letter));
      } catch {
      }
    }
  }, [letter, hasLoadedSavedLetter]);

  const updateLetter = (field, value) => {
    setLetter((current) => ({ ...current, [field]: value }));
    setDownloadStatus("");
  };

  const applyTemplate = (template) => {
    setActiveTemplate(template.id);
    setLetter((current) => ({
      ...current,
      title: template.title,
      greeting: template.greeting,
      body: template.body,
    }));
    setDownloadStatus("");
  };

  const greeting = letter.greeting.replace("{name}", letter.recipient || "there");

  const getFileName = () => `a-letter-for-${(letter.recipient || "someone-special").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const exportLetter = async (format) => {
    if (!letterPaper) return;

    try {
      setDownloadStatus("Preparing your letter...");
      const dataUrl = await toPng(letterPaper, {
        backgroundColor: "#f8f5ed",
        cacheBust: true,
        pixelRatio: 2,
      });

      if (format === "pdf") {
        const image = new Image();
        image.src = dataUrl;
        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
        const pdf = new jsPDF({ unit: "px", format: [image.width, image.height] });
        pdf.addImage(dataUrl, "PNG", 0, 0, image.width, image.height);
        pdf.save(`${getFileName()}.pdf`);
      } else {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${getFileName()}.png`;
        link.click();
      }

      setDownloadStatus(format === "pdf" ? "PDF downloaded" : "Image downloaded");
    } catch {
      setDownloadStatus("Download failed. Please try again.");
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Dearly home"><span className="brand-mark">d</span> dearly</a>
        <div className="topbar-note"><span className="status-dot" /> your words, kept close</div>
      </header>

      <section className="workspace" id="top">
        <div className="intro">
          <p className="eyebrow">THE LOVE LETTER STUDIO</p>
          <h1>Say the things<br /><em>that matter.</em></h1>
          <p className="intro-copy">A little space for the big feelings. Write something they can hold onto.</p>
        </div>

        <div className="studio-grid">
          <section className="editor-panel" aria-label="Letter editor">
            <div className="section-heading">
              <div><p className="eyebrow">01 / START HERE</p><h2>Set the scene</h2></div>
              <span className="step-number">01</span>
            </div>
            <div className="field-row">
              <label>For <input value={letter.recipient} onChange={(event) => updateLetter("recipient", event.target.value)} placeholder="their name" /></label>
              <label>From <input value={letter.sender} onChange={(event) => updateLetter("sender", event.target.value)} placeholder="your name" /></label>
            </div>

            <div className="section-heading templates-heading">
              <div><p className="eyebrow">02 / FIND YOUR TONE</p><h2>Choose a feeling</h2></div>
              <span className="step-number">02</span>
            </div>
            <div className="template-list">
              {templates.map((template) => (
                <button className={`template-option ${activeTemplate === template.id ? "selected" : ""}`} key={template.id} onClick={() => applyTemplate(template)} style={{ "--template-accent": template.accent }}>
                  <span className="template-swatch" />
                  <span><strong>{template.label}</strong><small>{template.description}</small></span>
                  <span className="radio-indicator" />
                </button>
              ))}
            </div>

            <div className="section-heading write-heading">
              <div><p className="eyebrow">03 / MAKE IT YOURS</p><h2>Write from the heart</h2></div>
              <span className="step-number">03</span>
            </div>
            <div className="writing-fields">
              <label>Letter title <input value={letter.title} onChange={(event) => updateLetter("title", event.target.value)} /></label>
              <label>Opening <input value={letter.greeting} onChange={(event) => updateLetter("greeting", event.target.value)} /></label>
              <label>Letter <textarea rows="7" value={letter.body} onChange={(event) => updateLetter("body", event.target.value)} /></label>
              <label>Sign-off <input value={letter.signoff} onChange={(event) => updateLetter("signoff", event.target.value)} /></label>
            </div>
          </section>

          <section className="preview-column" aria-label="Letter preview">
            <div className="preview-toolbar"><span><span className="live-dot" /> LIVE PREVIEW</span><span>{letter.body.length} characters</span></div>
            <article className="letter-paper" ref={setLetterPaper}>
              <div className="paper-topline"><span>DEARLY / 2026</span><span>♡</span></div>
              <div className="paper-content">
                <p className="paper-kicker">A NOTE FOR {letter.recipient ? letter.recipient.toUpperCase() : "SOMEONE SPECIAL"}</p>
                <h2>{letter.title}</h2>
                <p className="greeting">{greeting}</p>
                <div className="letter-body">{letter.body.split("\n").map((paragraph, index) => paragraph ? <p key={index}>{paragraph}</p> : <span className="paragraph-break" key={index} />)}</div>
                <p className="signoff">{letter.signoff}<br /><strong>{letter.sender || "Your name"}</strong></p>
              </div>
              <div className="paper-footer"><span>made with intention</span><span>✦</span></div>
            </article>
            <div className="download-actions">
              <button className="download-button" onClick={() => exportLetter("png")}><span>Save as image</span><span className="arrow">↗</span></button>
              <button className="download-button secondary" onClick={() => exportLetter("pdf")}><span>Save as PDF</span><span className="arrow">↗</span></button>
            </div>
            <p className="download-note">{downloadStatus || "Your background design is included in both formats."}</p>
          </section>
        </div>
      </section>
      <footer><span>For the words that are easier written down.</span><span>dearly © 2026 · developer: kelkelpogi</span></footer>
    </main>
  );
}
