// src/setupTests.ts
import { vi } from "vitest";
import "@testing-library/jest-dom"; // ⬅️ das hier hinzufügen

// Browser-Mocks
window.HTMLElement.prototype.scrollIntoView = vi.fn();
