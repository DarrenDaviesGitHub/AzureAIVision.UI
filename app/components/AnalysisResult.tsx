"use client";

import { motion } from "framer-motion";

type Props = {
  result: any;
};

export default function AnalysisResult({ result }: Props) {
  const words =
    result?.readResult?.blocks?.flatMap(
      (block: any) =>
        block.lines?.flatMap(
          (line: any) =>
            line.words?.map((word: any) => ({
              text: word.text,
              confidence: word.confidence,
            })) ?? []
        ) ?? []
    ) ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-12 w-full max-w-5xl rounded-3xl border border-cyan-500/10 bg-white/5 p-8 backdrop-blur-2xl"
    >
      <div className="mb-8">
        <h2 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
          Analysis Results
        </h2>

        <p className="mt-2 text-cyan-100/60">
          Extracted text and metadata from Ardent AI Vision Response
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-500/10 bg-black/20 p-5">
          <div className="text-sm text-cyan-100/50">
            Width
          </div>

          <div className="mt-2 text-2xl font-semibold">
            {result.metadata?.width}px
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/10 bg-black/20 p-5">
          <div className="text-sm text-cyan-100/50">
            Height
          </div>

          <div className="mt-2 text-2xl font-semibold">
            {result.metadata?.height}px
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-xl font-semibold">
          Detected Words
        </h3>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {words.map((word: any, index: number) => (
            <motion.div
              key={`${word.text}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.03,
              }}
              className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4"
            >
              <div className="text-lg font-medium">
                {word.text}
              </div>

              <div className="mt-2 text-sm text-cyan-100/60">
                Confidence:
                {" "}
                {(word.confidence * 100).toFixed(1)}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <details className="mt-10">
        <summary className="cursor-pointer text-cyan-300">
          View Raw JSON
        </summary>

        <pre className="mt-4 overflow-auto rounded-2xl bg-black/40 p-4 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </motion.div>
  );
}