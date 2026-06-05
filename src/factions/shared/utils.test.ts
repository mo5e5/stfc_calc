import { describe, it, expect } from "vitest";
import { getShipTypeFactor, fmtPower, parsePower } from "./utils";

describe("getShipTypeFactor", () => {
  it("Battleship counters Explorer -> 1.3 (advantage)", () => {
    const r = getShipTypeFactor("Battleship", "Explorer");
    expect(r.factor).toBe(1.3);
    expect(r.status).toBe("advantage");
  });

  it("Explorer counters Interceptor -> 1.3 (advantage)", () => {
    const r = getShipTypeFactor("Explorer", "Interceptor");
    expect(r.factor).toBe(1.3);
    expect(r.status).toBe("advantage");
  });

  it("Interceptor counters Battleship -> 1.3 (advantage)", () => {
    const r = getShipTypeFactor("Interceptor", "Battleship");
    expect(r.factor).toBe(1.3);
    expect(r.status).toBe("advantage");
  });

  it("same type -> 1.0 (neutral)", () => {
    const r = getShipTypeFactor("Explorer", "Explorer");
    expect(r.factor).toBe(1.0);
    expect(r.status).toBe("neutral");
  });

  it("Interceptor vs Explorer -> 0.75 (disadvantage)", () => {
    const r = getShipTypeFactor("Interceptor", "Explorer");
    expect(r.factor).toBe(0.75);
    expect(r.status).toBe("disadvantage");
  });

  it("Battleship vs Interceptor -> 0.75 (disadvantage)", () => {
    const r = getShipTypeFactor("Battleship", "Interceptor");
    expect(r.factor).toBe(0.75);
    expect(r.status).toBe("disadvantage");
  });
});

describe("fmtPower", () => {
  it("formats 1.500.000 in German locale", () => {
    expect(fmtPower(1500000, "de")).toBe("1.500.000");
  });

  it("formats 1,500,000 in English locale", () => {
    expect(fmtPower(1500000, "en")).toBe("1,500,000");
  });

  it("formats 0 as 0", () => {
    expect(fmtPower(0, "de")).toBe("0");
  });

  it("formats 1234 with thousand separator in English", () => {
    expect(fmtPower(1234, "en")).toBe("1,234");
  });
});

describe("parsePower", () => {
  it("parses plain number string", () => {
    expect(parsePower("1500000")).toBe(1500000);
  });

  it("parses German-formatted number (dot thousand separator)", () => {
    expect(parsePower("1.500.000")).toBe(1500000);
  });

  it("parses English-formatted number (comma thousand separator)", () => {
    expect(parsePower("1,500,000")).toBe(1500000);
  });

  it("rounds decimal value", () => {
    expect(parsePower("1.5")).toBe(2);
  });

  it("parses decimal with German comma and rounds", () => {
    expect(parsePower("1500000,50")).toBe(1500001);
  });

  it("parses 2,000,000", () => {
    expect(parsePower("2,000,000")).toBe(2000000);
  });

  it("parses 2.000.000", () => {
    expect(parsePower("2.000.000")).toBe(2000000);
  });

  it("throws on empty string", () => {
    expect(() => parsePower("")).toThrow();
  });

  it("throws on non-numeric string", () => {
    expect(() => parsePower("abc")).toThrow();
  });

  it("throws on zero", () => {
    expect(() => parsePower("0")).toThrow();
  });

  it("throws on negative number", () => {
    expect(() => parsePower("-5")).toThrow();
  });
});
