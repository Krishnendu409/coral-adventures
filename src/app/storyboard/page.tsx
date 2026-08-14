"use client";

import React from "react";
import { ScrapbookHero } from "@/components/storyboard/ScrapbookHero";
import { ScrapbookBoards } from "@/components/storyboard/ScrapbookBoards";
import { ScrapbookEpilogue } from "@/components/storyboard/ScrapbookEpilogue";

export default function StoryboardPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F0] text-[#0A2540] selection:bg-[#E05A36] selection:text-white">
      
      {/* 1. The Opening Studio Planning Table & Master Photographic Collage */}
      <ScrapbookHero />

      {/* 2. The 8 Flowing Visual Scrapbook Chapter Boards */}
      <ScrapbookBoards />

      {/* 3. The Final Quiet Travel Scrapbook Photograph & Epilogue */}
      <ScrapbookEpilogue />

    </main>
  );
}
