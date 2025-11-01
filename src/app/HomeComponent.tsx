"use client";

import { useEffect, useRef, useState } from "react";
import * as cl100k from "gpt-tokenizer/encoding/cl100k_base";
import * as o200k from "gpt-tokenizer/encoding/o200k_base";
import * as p50k from "gpt-tokenizer/encoding/p50k_base";
import { Code } from "@/app/Code";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokensTable } from "./TokensTable";

type TokenizerType = "gpt-4o" | "gpt-4" | "gpt-3";

const TOKENIZER_FUNCTIONS = {
  "gpt-4o": o200k,
  "gpt-4": cl100k,
  "gpt-3": p50k,
};

const TOKENIZER_LABELS = {
  "gpt-4o": "GPT-4o / GPT-4o-mini (o200k_base)",
  "gpt-4": "GPT-4 / GPT-3.5-turbo (cl100k_base)",
  "gpt-3": "GPT-3 / Codex (p50k_base)",
};

export function HomeComponent() {
  const [inputText, setInputText] = useState("How are you today?");
  const [selectedTokenizer, setSelectedTokenizer] =
    useState<TokenizerType>("gpt-4o");
  const inputRef = useRef<HTMLInputElement>(null);

  const moveCursorToEnd = () => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
      inputRef.current.focus();
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: It's fine to use an empty dependency array here.
  useEffect(() => {
    moveCursorToEnd();
  }, []);

  const { encode, decode } = TOKENIZER_FUNCTIONS[selectedTokenizer];

  const tokenIDs = encode(inputText);
  const tokenStrings = tokenIDs.map((token) => decode([token]));

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
            ref={inputRef}
            className="w-[400px] -ml-0"
            type="text"
            name="inputText"
            value={inputText}
            placeholder="Text to tokenize"
            autoFocus
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <div className="mb-4"></div>
          <div className="mb-4 space-y-2">
            <label
              htmlFor="tokenizer-select"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Tokenizer:
            </label>
            <Select
              value={selectedTokenizer}
              onValueChange={(value) =>
                setSelectedTokenizer(value as TokenizerType)
              }
            >
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Select a tokenizer" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TOKENIZER_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
