# gastown v0.2.5 - Component Breakdown

## 1. Critical Module Analysis

### internal/polecat - Ephemeral Worker Management

**Purpose**: Manage polecat lifecycle (spawn, work, cleanup)

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| manager.go | ~990 | Core polecat lifecycle |
| types.go | ~100 | State/type definitions |
| namepool.go | ~200 | Name allocation |
| cleanup.go | ~150 | Cleanup status tracking |

**Key Abstractions**:

```go
type Manager struct {
    rig      *rig.Rig
    git      *git.Git
    beads    *beads.Beads
    namePool *NamePool
}

type Polecat struct {
    Name      string
    Rig       string
    State     State  // Working, Done, Stuck
    ClonePath string // Git worktree path
    Branch    string // polecat/<name>-<timestamp>
    Issue     string // Assigned issue ID
}

type State int
const (
    StateWorking State = iota
    StateDone
    StateStuck
    StateActive
)
```

**Critical Operations**:

1. **Add** - Create worktree, agent bead, provision PRIME.md
2. **Remove** - Validate cleanup status, remove worktree
3. **RepairWorktree** - Recover stale polecat
4. **DetectStalePolecats** - Find cleanup candidates

**Merlin Relevance**: HIGH - Agent lifecycle model directly applicable

---

### internal/swarm - Swarm Orchestration

**Purpose**: Coordinate multi-worker task execution

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| manager.go | ~290 | Swarm operations |
| types.go | ~100 | Swarm/task definitions |
| landing.go | ~150 | Integration branch |
| integration.go | ~200 | Merge coordination |

**Key Abstractions**:

```go
type Swarm struct {
    ID           string
    RigName      string
    EpicID       string
    BaseCommit   string
    Integration  string      // swarm/<id> branch
    TargetBranch string
    State        SwarmState
    Workers      []string
    Tasks        []SwarmTask
}

type SwarmState string
const (
    SwarmCreated  SwarmState = "created"
    SwarmActive   SwarmState = "active"
    SwarmMerging  SwarmState = "merging"
    SwarmLanded   SwarmState = "landed"
    SwarmFailed   SwarmState = "failed"
    SwarmCanceled SwarmState = "canceled"
)
```

**Critical Operations**:

1. **LoadSwarm** - Load from beads epic
2. **GetReadyTasks** - Query ready front
3. **IsComplete** - Check all tasks closed

**Merlin Relevance**: HIGH - Maps to `@swarm` MCP server concept

---

### internal/beads - Work Tracking Integration

**Purpose**: Wrapper for beads CLI

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| beads.go | ~400 | Core operations |
| agent.go | ~200 | Agent bead ops |
| prime.go | ~150 | PRIME.md provisioning |
| redirect.go | ~100 | Shared beads setup |

**Key Abstractions**:

```go
type Beads struct {
    workDir string
}

type Issue struct {
    ID          string
    Title       string
    Status      string
    Assignee    string
    HookBead    string // For agents
    RoleBead    string
    AgentState  string
}

type AgentFields struct {
    RoleType      string
    Rig           string
    AgentState    string
    RoleBead      string
    HookBead      string
    CleanupStatus string
}
===
```

**Critical Operations**:

1. **GetAssignedIssue** - Find issue by assignee
2. **CreateOrReopenAgentBead** - Agent lifecycle
3. **Update** - State transitions
4. **SetupRedirect** - Shared beads

**Merlin Relevance**: MEDIUM - Different schema from TypeQL

---

### internal/witness - Health Monitoring

**Purpose**: Monitor polecat health, trigger cleanup

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| manager.go | ~300 | Witness operations |
| patrol.go | ~200 | Patrol cycle |

**Key Operations**:

1. **Patrol** - Check all polecats
2. **DetectStuck** - Find inactive agents
3. **Nudge** - Wake stuck agents
4. **Cleanup** - Remove stale polecats

**Merlin Relevance**: MEDIUM - Monitoring pattern applicable

---

### internal/mayor - Global Coordination

**Purpose**: Town-level orchestration

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| manager.go | ~400 | Mayor operations |
| attach.go | ~200 | Session management |

**Key Operations**:

1. **Attach** - Start Mayor session
2. **CreateConvoy** - Bundle work
3. **Sling** - Assign to agents
4. **Coordinate** - Cross-rig ops

**Merlin Relevance**: HIGH - Maps to Cognitive Engine

---

### internal/git - Git Operations

**Purpose**: Git worktree and branch management

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| git.go | ~500 | Core operations |
| worktree.go | ~200 | Worktree ops |

**Key Operations**:

```go
func (g *Git) WorktreeAddFromRef(path, branch, ref string) error
func (g *Git) WorktreeRemove(path string, force bool) error
func (g *Git) CheckUncommittedWork() (*UncommittedWorkStatus, error)
func (g *Git) CountCommitsBehind(remoteBranch string) (int, error)
```

**Merlin Relevance**: HIGH - Git operations reusable

---

### internal/mail - Agent Communication

**Purpose**: Mailbox-based messaging

**Key Files**:
| File | Lines | Description |
|------|-------|-------------|
| mailbox.go | ~300 | Mailbox operations |
| router.go | ~150 | Message routing |
| types.go | ~100 | Message types |

**Key Operations**:

1. **Send** - Queue message
2. **Check** - Read mailbox
3. **Inject** - Add to context
4. **MarkRead** - Clear messages

**Merlin Relevance**: MEDIUM - Event bus alternative

---

## 2. Module Metrics

### Lines of Code by Package

| Package | LOC (approx) | Test Coverage |
|---------|--------------|---------------|
| polecat | 1,500 | Good |
| swarm | 600 | Good |
| beads | 800 | Moderate |
| git | 700 | Good |
| witness | 500 | Moderate |
| mayor | 600 | Moderate |
| mail | 500 | Good |
| rig | 800 | Good |
| config | 500 | Good |
| cmd | 5,000+ | CLI tests |
| tui | 2,000 | UI tests |

### Complexity Assessment

| Module | Complexity | Notes |
|--------|------------|-------|
| polecat/manager.go | Medium | Well-structured |
| swarm/manager.go | Low | Clean state machine |
| beads/beads.go | Low | CLI wrapper |
| git/git.go | Medium | External tool calls |
| cmd/*.go | High | Many CLI commands |

## 3. Critical Code Paths

### Path 1: Polecat Spawn

```
gt sling issue-123 myrig
    │
    ▼
cmd/sling.go
    │
    ├─► polecat.Manager.AllocateName()
    │       └─► namePool.Allocate()
    │
    ├─► polecat.Manager.AddWithOptions()
    │       ├─► git.WorktreeAddFromRef()
    │       ├─► beads.ProvisionPrimeMDForWorktree()
    │       └─► beads.CreateOrReopenAgentBead()
    │
    └─► session.Start() [tmux]
            └─► gt prime --hook
```

### Path 2: State Recovery (GUPP)

```
gt prime --hook
    │
    ▼
cmd/prime.go
    │
    ├─► beads.GetAgentBead(agentID)
    │       └─► Parse hook_bead field
    │
    ├─► beads.Show(hookBead)
    │       └─► Get issue details
    │
    └─► output GUPP context
            └─► "You have work on your hook..."
```

### Path 3: Stale Detection

```
witness patrol
    │
    ▼
witness.Manager.Patrol()
    │
    ├─► polecat.Manager.DetectStalePolecats()
    │       ├─► checkTmuxSession()
    │       ├─► countCommitsBehind()
    │       ├─► git.CheckUncommittedWork()
    │       └─► beads.GetAgentBead()
    │
    └─► assessStaleness()
            └─► Determine cleanup eligibility
```

## 4. Technical Debt Assessment

### TODO/FIXME Analysis

```bash
$ grep -r "TODO\|FIXME" internal/
internal/mq/id_test.go:        // TODO: test collision detection
internal/rig/manager.go:       // TODO: support custom branches
internal/formula/formulas/code-review.formula.toml: # TODO: parallel steps
internal/formula/formulas/mol-polecat-work.formula.toml: # TODO: gate check
internal/cmd/synthesis.go:     // TODO: implement synthesis
internal/config/agents.go:     // TODO: validate agent config
```

**Assessment**: Only 6 TODOs, all non-critical

### Recently Refactored

From CHANGELOG:
- `prime.go` split from 1833 lines into modules
- `beads/mail` modules split for maintainability

### External Dependencies

| Dependency | Risk | Mitigation |
|------------|------|------------|
| beads CLI | External tool | Version pinned (0.44.0+) |
| tmux | Optional | Minimal mode works without |
| Git | System tool | Well-tested, stable |

## 5. Merlin-Relevant Modules

### Directly Applicable

| Module | Merlin Use | Integration Effort |
|--------|------------|-------------------|
| polecat | Agent lifecycle | Low (patterns) |
| swarm | Swarm orchestration | Medium (wrapper) |
| git | Worktree isolation | Low (portable) |

### Partially Applicable

| Module | Merlin Use | Integration Effort |
|--------|------------|-------------------|
| beads | Work tracking | High (schema diff) |
| mail | Event bus | Medium (protocol) |
| witness | Monitoring | Medium (adaptation) |

### Not Applicable

| Module | Reason |
|--------|--------|
| tui | UI-specific |
| tmux | Dev tooling |
| web | Dashboard UI |

## 6. Integration Extraction Points

### Extractable Patterns

1. **Worktree Manager**
   - Git worktree operations
   - Branch naming conventions
   - Cleanup status tracking

2. **State Machine**
   - Explicit state transitions
   - Terminal state handling
   - ZFC-compliant state derivation

3. **Health Detection**
   - Stale agent detection
   - Uncommitted work checks
   - Session liveness queries

### Code Reuse Possibilities

```typescript
// Example: Port git worktree pattern to TypeScript
class WorktreeManager {
  async add(path: string, branch: string, ref: string): Promise<void> {
    await exec(`git worktree add -b ${branch} ${path} ${ref}`);
  }

  async remove(path: string, force: boolean): Promise<void> {
    const flag = force ? '--force' : '';
    await exec(`git worktree remove ${flag} ${path}`);
  }

  async checkUncommitted(path: string): Promise<UncommittedStatus> {
    // Port gastown's CheckUncommittedWork logic
  }
}
```
