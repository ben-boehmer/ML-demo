import React from "react";



import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChatbotBox from "./ChatbotBox";

describe("ChatbotBox", () => {
  it("zeigt eine Eingabeaufforderung an", () => {
    render(<ChatbotBox />);
    expect(screen.getByPlaceholderText("Deine Nachricht...")).toBeInTheDocument();
  });

  it("sendet Nachricht beim Drücken von Enter", () => {
    render(<ChatbotBox />);
    const input = screen.getByPlaceholderText("Deine Nachricht...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hallo Ben!" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    // Du kannst hier den Netzwerk-Call mocken, falls nötig
  });
});
