"use client";

import React, { useState } from "react";

/* ---------- COLOR HELPER ---------- */

const darkenColor = (hex: string, percent: number) => {
  let color = hex.replace("#", "");
  const num = parseInt(color, 16);

  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/* ---------- FOLDER COMPONENT ---------- */

function Folder({
  color = "#ad46ff",
  items = []
}: {
  color?: string;
  items?: React.ReactNode[];
}) {

  const [open, setOpen] = useState(false);

  const style: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": darkenColor(color, 0.08)
  } as React.CSSProperties;

  return (

    <div className="folder-container">

      <div
        className={`folder ${open ? "open" : ""}`}
        style={style}
        onClick={() => setOpen(!open)}
      >

        <div className="folder__back">

          {items.map((item, i) => (
            <div key={i} className={`paper paper-${i + 1}`}>
              {item}
            </div>
          ))}

          <div className="folder__front"></div>
          <div className="folder__front right"></div>

        </div>

      </div>

    </div>
  );
}

/* ---------- PAGE ---------- */

export default function WorksPage() {

  return (

    <main className="works-page">

      <h1 className="title">Our Works</h1>

      <Folder
        items={[

          <div className="paper-content">
            <h4>AI Video</h4>

            <div className="works-scroll">

              <div className="work-card">
                <video autoPlay muted loop>
                  <source src="/amg.mp4" type="video/mp4"/>
                </video>
              </div>

              <div className="work-card logo">
                <img src="/zenato.png"/>
              </div>

            </div>
          </div>,

          <div className="paper-content">
            <h4>Apps</h4>

            <div className="works-scroll">

              <div className="work-card">
                <video autoPlay muted loop>
                  <source src="/hyundai.mp4" type="video/mp4"/>
                </video>
              </div>

              <div className="work-card logo">
                <img src="/crizpo.png"/>
              </div>

            </div>
          </div>,

          <div className="paper-content">
            <h4>Marketing</h4>

            <div className="works-scroll">

              <div className="work-card">
                <video autoPlay muted loop>
                  <source src="/myg.mp4" type="video/mp4"/>
                </video>
              </div>

            </div>
          </div>

        ]}
      />

      <style jsx global>{`

      body{
        margin:0;
      }

      .works-page{
        min-height:100vh;
        background:#000;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        color:white;
        font-family:sans-serif;
      }

      .title{
        font-size:72px;
        font-weight:900;
        margin-bottom:100px;
      }

      .folder-container{
        width:100%;
        height:0px;
        display:flex;
        align-items:center;
        justify-content:center;
        position:relative;
      }

      .folder{
        cursor:pointer;
        position:relative;
        transform-origin:center center;
        transition:0.35s ease;
      }

      .folder:hover{
        transform:translateY(-6px);
      }

      .folder__back{
        position:relative;
        width:120px;
        height:90px;
        background:var(--folder-back-color);
        border-radius:0 12px 12px 12px;
      }

      .folder__back::after{
        content:"";
        position:absolute;
        bottom:98%;
        left:0;
        width:40px;
        height:12px;
        background:var(--folder-back-color);
        border-radius:5px 5px 0 0;
      }

      .folder__front{
        position:absolute;
        width:100%;
        height:100%;
        background:var(--folder-color);
        border-radius:6px 12px 12px 12px;
        transform-origin:bottom;
        transition:0.3s;
      }

      .paper{
        position:absolute;
        bottom:10%;
        left:50%;
        transform:translate(-50%,10%);
        width:280px;
        height:200px;
        background:white;
        border-radius:14px;
        padding:12px;
        transition:0.4s;
        opacity:0;
      }

      .paper:nth-child(2){
        background:#f2f2f2;
      }

      .paper:nth-child(3){
        background:#e6e6e6;
      }

      .folder.open .paper{
        opacity:1;
      }
.folder.open .paper:nth-child(1){
  transform:rotate(-40deg) translateY(-240px) rotate(40deg);
}

.folder.open .paper:nth-child(2){
  transform:rotate(0deg) translateY(-260px) rotate(0deg);
}

.folder.open .paper:nth-child(3){
  transform:rotate(40deg) translateY(-240px) rotate(-40deg);
}
      .folder.open .folder__front{
        transform:skew(15deg) scaleY(0.6);
      }

      .folder.open .right{
        transform:skew(-15deg) scaleY(0.6);
      }

      .paper-content h4{
        color:#000;
        font-size:14px;
        margin-bottom:8px;
        font-weight:700;
      }

      .works-scroll{
        display:flex;
        gap:10px;
        overflow-x:auto;
      }

      .work-card{
        min-width:120px;
        height:90px;
        border-radius:10px;
        overflow:hidden;
        background:black;
      }

      .work-card video{
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .work-card.logo{
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .work-card.logo img{
        width:70%;
      }

      `}</style>

    </main>
  );
}