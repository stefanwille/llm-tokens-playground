"use client";

import { Tiktoken } from "js-tiktoken/lite";
import cl100k_base from "js-tiktoken/ranks/cl100k_base";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import p50k_base from "js-tiktoken/ranks/p50k_base";
import { useMemo, useState } from "react";
import { Code } from "@/app/Code";
import { Input } from "@/components/ui/input";
import { TokensTable } from "./TokensTable";

type TokenizerType = "o200k_base" | "cl100k_base" | "p50k_base";

const TOKENIZER_ENCODINGS = {
  o200k_base: o200k_base,
  cl100k_base: cl100k_base,
  p50k_base: p50k_base,
};

const TOKENIZER_LABELS = {
  o200k_base: "o200k_base (GPT-4o, GPT-4o-mini)",
  cl100k_base: "cl100k_base (GPT-4, GPT-3.5-turbo)",
  p50k_base: "p50k_base (GPT-3, Codex)",
};

export function HomeComponent() {
  const [inputText, setInputText] = useState("How are you today?");
  const [selectedTokenizer, setSelectedTokenizer] =
    useState<TokenizerType>("o200k_base");

  const tokenizer = useMemo(
    () => new Tiktoken(TOKENIZER_ENCODINGS[selectedTokenizer]),
    [selectedTokenizer],
  );

  const tokenIDs = tokenizer.encode(inputText);
  const tokenStrings = tokenIDs.flatMap((token) => tokenizer.decode([token]));

  return (
    <div className="">
      <header>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          LLM Tokens Playground
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          A playground that makes LLM tokens easier to understand.
        </p>
        <div className="mb-12"></div>
      </header>

      <div>
        <div>
          When you send a message to an LLM, it doesn't work with your text
          directly. It breaks it up into smaller pieces, called <b>tokens</b>.
          <br />
          <br />
          Enter some text to see how it's tokenized:
          <br />
          <Input
            className="w-[400px] -ml-0"
            type="text"
            name="inputText"
            value={inputText}
            placeholder="Text to tokenize"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <div className="mb-4"></div>
          <div className="mb-4">
            <label
              htmlFor="tokenizer-select"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Tokenizer:
            </label>
            <select
              id="tokenizer-select"
              value={selectedTokenizer}
              onChange={(e) =>
                setSelectedTokenizer(e.target.value as TokenizerType)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Object.entries(TOKENIZER_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          The LLM encodes your text as a sequence of tokens, of small text
          fragments.
          <br />
          <Code>{JSON.stringify(tokenStrings)}</Code>
          <br />
          <br />
          The LLM's tokenizer has a fixed set of tokens - a token vocabulary, if
          you will.
          <br />
          It represents these tokens as integers, and the integers are called{" "}
          <b>token ids</b>.
          <br />
          <br />
          This is your text represented as a sequence of token ids:
          <br />
          <Code>{JSON.stringify(tokenIDs)}</Code>
          <br />
          Each token id represents a fragment in your text - a word, a fraction
          of a word, a syllable, or a character.
          <br />
          <br />
          The table below shows how each token id maps to its text:
        </div>
        <TokensTable tokenIDs={tokenIDs} tokenStrings={tokenStrings} />
        <br />
        Joining the token strings together reconstructs the original text:{" "}
        <br />
        <Code>{tokenStrings.join("")}</Code>
        <br />
        The LLM does not use your message text. It works with token ids
        internally. And when it generates a reply, it uses token ids too.
        <br />
        <br />
        The token vocabulary of each LLM may be different - each vendor chooses
        their own tokenizer, on a per model basis.
      </div>
    </div>
  );
}
