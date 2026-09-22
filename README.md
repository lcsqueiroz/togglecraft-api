# 🎛️ ToggleCraft

> A lightweight Feature Flag **engine**, built with **TypeScript** and **Clean Architecture**, meant to be published as an npm package.

---

## 📌 About the Project

**ToggleCraft** is a feature-flag evaluation engine: a small, dependency-free core that any Node.js app can install to check whether a feature is enabled, and that other tools (an API, an admin panel) can build on top of.

This repository is **the core library only** — it does not include a server, a database, or a UI. Those are planned as separate projects that will consume this package once it's published:

- An **API service** (Express + PostgreSQL) implementing `IFlagRepository` against Postgres and exposing REST endpoints.
- An **admin panel** that talks to that API to create and toggle flags.
- Consuming apps stay in sync by **polling** — no WebSocket/SSE infrastructure planned, on purpose: it solves the real problem (no redeploy needed to flip a flag) without extra infra.

By using **Clean Architecture**, the core stays decoupled from any framework or persistence technology — it only depends on the `IFlagRepository` contract, so a Postgres-backed implementation (or an in-memory one, already included) can be swapped in without touching business logic.

The project is intentionally scoped for what it needs to do *today*, not for hypothetical future scale — it's built one milestone at a time.

---

## 🏗️ Architecture & Software Design

ToggleCraft's core follows 3 Clean Architecture layers:

```text
┌──────────────────────────────────────────────┐
│  3. Use Cases (Application Business Logic)   │
│  ┌─────────────────────────────────────────┐ │
│  │  2. Repositories (Contracts + adapters) │ │
│  │  ┌───────────────────────────────────┐  │ │
│  │  │  1. Domain Entities (Pure Types) │  │ │
│  │  └───────────────────────────────────┘  │ │
│  └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

1. **Domain Layer (`src/domain/`):** Core entity, zero dependencies (`Flag`).
2. **Repository Layer (`src/repositories/`):** `IFlagRepository` contract (Dependency Inversion) plus `InMemoryFlagRepository`, the first concrete implementation.
3. **Use Cases Layer (`src/use-cases/`):** Application actions — `EvaluateFlagUseCase`, `CreateFlagUseCase`, `ToggleFlagUseCase`, `FindAllFlagsUseCase`.

A future Postgres-backed `IFlagRepository` implementation (in the separate API project) plugs into the same use cases without any change to this layer.

---

## 🛠️ Tech Stack

* **Language:** TypeScript (compiled/run natively by Node, no build step yet)
* **Runtime:** Node.js 24+
* **Tests:** Node's built-in test runner (`node:test`) — no external test framework
* **Architecture:** Clean Architecture & Repository Pattern

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/togglecraft-api.git
cd togglecraft-api
npm install
npm test
```

There's no server or database to set up — the library runs standalone, backed by the in-memory repository until a real one is plugged in.

---

## 📁 Project Structure

```text
togglecraft-api/
├── src/
│   ├── domain/         # Pure domain entities (Flag)
│   ├── repositories/    # IFlagRepository contract + InMemoryFlagRepository
│   └── use-cases/      # Evaluate / Create / Toggle / FindAll business logic
├── test/               # Tests, mirroring the src/ structure
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] Domain entity + `IFlagRepository` contract
- [x] Core use cases (Evaluate, Create, Toggle, FindAll) + in-memory repository + tests
- [ ] Prepare `package.json` for npm publishing (build, `files`, `exports`) and publish v0.1.0
- [ ] Separate API project (Express + PostgreSQL) implementing `IFlagRepository`
- [ ] Admin panel to manage flags through that API
- [ ] Polling-based client for consuming apps to stay in sync in real time

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
