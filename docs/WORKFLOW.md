# Development Workflow

## Overview
This document defines our standardized development workflow for building the NextJS Seed App framework-agnostic component generation system.

## Core Workflow Process

### 1. Discussion & Requirements Gathering
- Identify module needs and objectives
- Define scope and boundaries
- Discuss architectural approaches
- Identify dependencies and integration points

### 2. Documentation
- Create or update `MODULE.GUIDE.md` for the specific module
- Document:
  - Purpose and goals
  - API surface area
  - Input/output contracts
  - Integration points
  - Examples and use cases

### 3. Alignment Confirmation
- Review proposed implementation approach
- Confirm architectural decisions
- Validate file structure and naming
- Get explicit approval before writing code
- **NO CODE WRITTEN WITHOUT ALIGNMENT**

### 4. Implementation
- Build module files following documented specifications
- Follow established code patterns and conventions
- Ensure framework-agnostic design where applicable
- Write clean, maintainable, well-commented code

### 5. Unit Testing
- Write comprehensive unit tests
- Cover edge cases and error conditions
- Ensure test coverage meets project standards
- Test framework-agnostic abstraction layers

### 6. Validation & Error Handling
- Run tests and analyze results TOGETHER
- If errors found:
  - Analyze root cause collaboratively
  - Apply fixes methodically
  - Validate fixes before proceeding
- Track error rate: errors after updates / total updates
- **Error Rate > 30% triggers process change:**
  - Option A: Move to line-by-line update analysis and application
  - Option B: Move problematic file to `.context/` folder for reference, write fresh file
- No artifacts left in code
- Manual functional testing
- Integration testing with existing modules
- Performance validation
- Documentation review and updates

## Module Development Standards

### File Organization
```
/modules
  /{module-name}
    /{module-name}.ts         # Main implementation
    /{module-name}.test.ts    # Unit tests
    /{module-name}.types.ts   # TypeScript types/interfaces
    /MODULE.GUIDE.md          # Module documentation
```

### Documentation Requirements
Each module must include:
- Clear purpose statement
- API documentation with examples
- Type definitions
- Usage patterns
- Integration guidelines
- Known limitations

### Testing Requirements
- Minimum 80% code coverage
- All public APIs must have tests
- Edge cases documented and tested
- Integration tests for cross-module functionality

## Git Workflow

### Branching Strategy
- `main` - stable, production-ready code
- `develop` - integration branch for features
- `feature/{name}` - individual feature development
- `fix/{name}` - bug fixes

### Commit Messages
Follow conventional commits:
```
feat: add schema extraction for React components
fix: handle undefined props in template generator
docs: update MODULE.GUIDE for CLI integration
test: add unit tests for framework adapter
```

## Review Process
1. Self-review implementation against MODULE.GUIDE
2. Run full test suite
3. Update documentation if APIs changed
4. Update HANDOFF.md with session progress

## Session-to-Session Continuity
- Update HANDOFF.md at end of each session
- Document current state, decisions made, and next steps
- Note any blockers or questions for future sessions
- Maintain clear trail of architectural decisions

## Quality Gates
Before marking module as complete:
- [ ] All tests passing
- [ ] Documentation complete and accurate
- [ ] Code reviewed against standards
- [ ] Integration points validated
- [ ] HANDOFF.md updated
- [ ] No known blockers or issues
