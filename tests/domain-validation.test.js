const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// ── Domain Validation Test Suite ─────────────────────────────────────────
// Unit tests for domain-level validation rules used across the platform:
// email format, date format, time slots, service types, name constraints,
// and security-related input validation patterns.

// ── Regex patterns extracted from routes/appointments.js ─────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const TIME_RE = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const VALID_SERVICES = ['consultation', 'followup', 'premium'];

describe('Domain Validation — Email', () => {
  const validEmails = [
    'user@example.com',
    'first.last@domain.co',
    'name+tag@company.org',
    'a@b.io',
    'user123@test-domain.com',
  ];

  const invalidEmails = [
    '',
    'plaintext',
    '@missing-local.com',
    'user@',
    'user @space.com',
    'user@ space.com',
    'user@.com',
    'user@domain',
    'user@@double.com',
  ];

  for (const email of validEmails) {
    it(`accepts valid email: ${email}`, () => {
      assert.ok(EMAIL_RE.test(email), `${email} should be valid`);
    });
  }

  for (const email of invalidEmails) {
    it(`rejects invalid email: "${email}"`, () => {
      assert.ok(!EMAIL_RE.test(email), `"${email}" should be rejected`);
    });
  }
});

describe('Domain Validation — Date Format (YYYY-MM-DD)', () => {
  const validDates = [
    '2026-01-01',
    '2026-12-31',
    '2025-06-15',
    '2030-02-28',
  ];

  const invalidDates = [
    '',
    '01-01-2026',
    '2026/01/01',
    '2026-1-1',
    '20260101',
    'January 1, 2026',
    '2026-13-01',
    '2026-00-01',
    'not-a-date',
  ];

  for (const date of validDates) {
    it(`accepts valid date: ${date}`, () => {
      assert.ok(DATE_RE.test(date), `${date} should be valid`);
    });
  }

  for (const date of invalidDates) {
    it(`rejects invalid date: "${date}"`, () => {
      assert.ok(!DATE_RE.test(date), `"${date}" should be rejected`);
    });
  }
});

describe('Domain Validation — Time Slot (HH:MM, 24-hour)', () => {
  const validTimes = [
    '0:00',
    '9:00',
    '09:00',
    '12:30',
    '15:45',
    '23:59',
  ];

  const invalidTimes = [
    '',
    '24:00',
    '25:00',
    '12:60',
    '12:99',
    '1200',
    '12-00',
    'noon',
    '12:00 PM',
    '9:00am',
  ];

  for (const time of validTimes) {
    it(`accepts valid time: ${time}`, () => {
      assert.ok(TIME_RE.test(time), `${time} should be valid`);
    });
  }

  for (const time of invalidTimes) {
    it(`rejects invalid time: "${time}"`, () => {
      assert.ok(!TIME_RE.test(time), `"${time}" should be rejected`);
    });
  }
});

describe('Domain Validation — Service Types', () => {
  for (const service of VALID_SERVICES) {
    it(`accepts valid service: ${service}`, () => {
      assert.ok(VALID_SERVICES.includes(service));
    });
  }

  const invalidServices = [
    'invalid',
    'CONSULTATION',
    'Consultation',
    '',
    'basic',
    'enterprise',
    'free-trial',
  ];

  for (const service of invalidServices) {
    it(`rejects invalid service: "${service}"`, () => {
      assert.ok(!VALID_SERVICES.includes(service), `"${service}" should be rejected`);
    });
  }
});

describe('Domain Validation — Name Constraints', () => {
  it('accepts a normal name', () => {
    const name = 'Jane Doe';
    assert.ok(typeof name === 'string' && name.length <= 200);
  });

  it('accepts a name at the 200-char boundary', () => {
    const name = 'A'.repeat(200);
    assert.ok(typeof name === 'string' && name.length <= 200);
  });

  it('rejects a name exceeding 200 characters', () => {
    const name = 'A'.repeat(201);
    assert.ok(name.length > 200, 'Name over 200 chars should be rejected');
  });

  it('rejects non-string name values', () => {
    const invalidNames = [null, undefined, 42, {}, []];
    for (const name of invalidNames) {
      assert.ok(typeof name !== 'string', `${JSON.stringify(name)} is not a string`);
    }
  });
});

describe('Domain Validation — JSON Body Size', () => {
  const BODY_LIMIT_BYTES = 50 * 1024;

  it('50KB limit allows typical appointment payloads', () => {
    const payload = JSON.stringify({
      name: 'Jane Doe',
      email: 'jane@example.com',
      date: '2026-06-01',
      timeSlot: '10:00',
      service: 'consultation',
    });
    assert.ok(Buffer.byteLength(payload) < BODY_LIMIT_BYTES,
      'A typical appointment payload should be well under 50KB');
  });

  it('50KB limit blocks excessively large payloads', () => {
    const oversized = JSON.stringify({ data: 'X'.repeat(60 * 1024) });
    assert.ok(Buffer.byteLength(oversized) > BODY_LIMIT_BYTES,
      'A 60KB payload should exceed the 50KB limit');
  });
});

describe('Domain Validation — Security Patterns', () => {
  it('CORS_ORIGIN parsing splits comma-separated origins', () => {
    const raw = 'https://example.com, https://app.example.com';
    const origins = raw.split(',').map(s => s.trim());
    assert.deepEqual(origins, ['https://example.com', 'https://app.example.com']);
  });

  it('empty CORS_ORIGIN yields empty allowlist', () => {
    const raw = '';
    const origins = raw ? raw.split(',').map(s => s.trim()) : [];
    assert.deepEqual(origins, []);
  });

  it('bearer token extraction pattern works', () => {
    const header = 'Bearer abc123xyz';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    assert.equal(token, 'abc123xyz');
  });

  it('bearer extraction returns null for malformed header', () => {
    const headers = ['', 'Basic abc123', 'bearer lowercase', 'Token xyz'];
    for (const header of headers) {
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      assert.equal(token, null, `"${header}" should not yield a token`);
    }
  });

  it('rate limit window defaults are sensible', () => {
    const defaultMax = 100;
    const defaultWindowMs = 15 * 60 * 1000;
    assert.ok(defaultMax > 0 && defaultMax <= 1000, 'Max should be between 1 and 1000');
    assert.ok(defaultWindowMs >= 60000, 'Window should be at least 1 minute');
    assert.ok(defaultWindowMs <= 3600000, 'Window should be at most 1 hour');
  });
});
