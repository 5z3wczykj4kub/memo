# Coder's memo

## Bugs

### 1. Incorrect card flipping.

**Story:**

Click two cards one after another. Once cards begin to flip back, keep clicking one of them.

**Unwanted result:**

Constantly clicked card unflips.

**Wanted result:**

Constantly clicked should stay as flipped.

**Status**: done

_Hints:_

Let's give names to our cards:

`A` - constantly clicked one,

`B` - the other.

The bug occurs because `B` actually flips. One probable reason is that the `.isTouched` flag on `A` is set before the transition ends on `B` therefore bypassing the guard clause.

_Comments:_

The bug got solved by switching from vanilla CSS transtions to `React Transition Group` package. The package allowed for easier managment of different animation states though it was still very cumbersome as there were many problems with data synchronization (keeping redux store data in sync with different transiton stages).
