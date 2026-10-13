import { describe, it, expect, beforeEach } from 'vitest';
import { safeGetStorage, safeSetStorage } from '../src/services/storageService';

// Lightweight browser storage mock for node test runner
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = new LocalStorageMock();
}

describe('Storage Resilience & Corruption Guard (Tallennuksen vikasietoisuus)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('palauttaa oletusarvon jos localStorage-avainta ei löydy', () => {
    const fallback = { count: 0 };
    const result = safeGetStorage('non_existent_key', fallback);
    expect(result).toEqual(fallback);
  });

  it('palauttaa oletusarvon turvallisesti jos tallennettu data on korruptoitunutta JSONia', () => {
    localStorage.setItem('corrupted_key', '{ invalid json, broken ...');

    const fallback = [];
    const result = safeGetStorage('corrupted_key', fallback);
    // Should NOT throw exception, must return fallback gracefully
    expect(result).toEqual([]);
  });

  it('tallentaa ja lukee validia dataa virheettömästi', () => {
    const data = { theme: 'dark', habitsDone: [1, 2] };
    const saved = safeSetStorage('valid_key', data);
    expect(saved).toBe(true);

    const loaded = safeGetStorage('valid_key', null);
    expect(loaded).toEqual(data);
  });
});
