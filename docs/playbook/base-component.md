# Recipe: Add a base component

> **Written by:** Teo (Phase 2) · **Worked example:** [PR #26 — themed base components (`Screen`, `AppText`, `Button`, `Card`)](https://github.com/Attackeler/gamenight-teo-dragos-marcian/pull/26) · **Replicated by:** —

**Use this when:** you need a small, reusable piece of UI that many screens will use (`Input`, `Avatar`, `Chip`…). It is _not_ the right recipe for a whole screen (that's `new-screen.md`) or for a one-off layout inside a single screen.

**Takes about:** 2–3 hours the first time, most of it reading `DESIGN.md` and getting the types right.

---

## Before you start

- **You should already know:** what a component, props and a hook are ([react.dev Quick Start](https://react.dev/learn)); `View` / `Text` / `Pressable` ([React Native core components](https://reactnative.dev/docs/intro-react-native-components)); TypeScript union types `'a' | 'b'` and optional props `name?:` ([TypeScript for JS programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)).
- **Have running:** `npx expo start`, with the app open on your phone and in the browser.
- **Start a branch** (see [`git-pr-flow.md`](./git-pr-flow.md)):

    ```bash
    git switch main && git pull
    git switch -c feat/phase-2-<component-name>
    ```

## Steps

1. **Read the spec.** Find your component in [`DESIGN.md`](../DESIGN.md) §5 (Components). Write down every value it mentions: colors, radius, height, padding, text style.

2. **Find each value in [`src/theme/tokens.ts`](../../src/theme/tokens.ts).** Colors live in the theme (`theme.colors.core.*`, `theme.colors.accent_semantic.*`); sizes live in `typography`, `spacing`, `radii`, `heights`, `elevation`, `icon`, `avatar`.
    - A value is missing? **Add it to `tokens.ts`** (in the right group, or a new group) and mention it in your PR. Never type a raw number or hex color in the component. Example: PR #26 added `heights.button`.

3. **Create the file** `src/components/<Name>.tsx`. PascalCase name, one component per file, `export default`.

4. **Type the props.** Start from the props of the React Native component you wrap, then add your own:

    ```tsx
    import { View, ViewProps } from 'react-native';

    type Variant = 'filled' | 'outlined';

    type BadgeProps = ViewProps & {
        variant?: Variant; // `?` = optional, so give it a default below
    };
    ```

    | You wrap…                                              | Start from…         |
    | ------------------------------------------------------ | ------------------- |
    | `View`                                                 | `ViewProps`         |
    | `Text`                                                 | `TextProps`         |
    | `Pressable`                                            | `PressableProps`    |
    | `SafeAreaView` (from `react-native-safe-area-context`) | `SafeAreaViewProps` |

    If you need to **change the type** of a prop the base already has (e.g. `Pressable`'s `children` and `style` can be functions; `Button` wants them simpler), remove it first with `Omit`, then add your version: `Omit<PressableProps, 'children' | 'style'> & { children?: React.ReactNode; ... }`. No `any`.

5. **Write the component.** Destructure what you use, give optional props a default, collect the rest:

    ```tsx
    export default function Badge({
        variant = 'filled',
        style,
        children,
        ...rest
    }: BadgeProps) {
        const { theme, scheme } = useContext(ThemeContext); // scheme is 'dark' | 'light'
        return (
            <View
                style={[
                    { backgroundColor: theme.colors.core.surface }, // 1. needs the theme
                    styles.base, // 2. fixed sizes
                    style // 3. the caller's style, always last
                ]}
                {...rest}
            >
                {children}
            </View>
        );
    }

    const styles = StyleSheet.create({
        base: { borderRadius: radii.card, padding: spacing.m }
    });
    ```

    - **Theme colors go inline** (inside the component). `StyleSheet.create` sits outside the component, where there is no theme, so it only takes fixed tokens.
    - **The caller's `style` goes last**, so a screen can override anything.
    - **`{...rest}`** passes on every prop you didn't use (`onPress`, `testID`, accessibility props…).
    - Text inside your component? Use [`AppText`](../../src/components/AppText.tsx) with `variant` and `color`, not a raw `Text`.
    - Different look in dark and light (like `Card`: a shadow in light, a hairline border in dark)? Pick it with `scheme === 'dark' ? … : …` and put the result as its **own item** in the style array.

6. **Try it on screen.** Add it to the component gallery (`app/gallery.tsx`, task 1.D2) in every variant. Until the gallery exists, put it on `app/index.tsx` for a quick test and don't commit that.

7. **Commit** with the message from [`TASKS.md`](../TASKS.md), e.g. `feat(ui): add themed input component`, and open the PR.

## Check it worked

- In the app, switch between **light, dark and system**: every color of your component changes with the theme, and the text is readable in both.
- Try every variant, and try it with a `style` passed from outside (the outside style should win).
- No hex colors and no raw numbers in your file. Search for them: `#`, and digits next to `fontSize`, `padding`, `margin`, `height`, `borderRadius`.
- Run the same checks CI runs:

    ```bash
    make check-files
    ```

## Gotchas

<!-- Replicators: add what tripped you up here, one bullet each. -->

- **`onPress={doIt()}` runs on every render**, not on tap. Pass a function: `onPress={doIt}`, or `onPress={() => doIt('x')}` when it needs an argument.
- **`useContext(ThemeContext)` only works inside a component**, never at the top of the file. That's also why theme colors can't go in `StyleSheet.create`.
- **Don't store the variant's color in `useState`.** It comes straight from the props, so compute it in a plain `const` (a ternary works). Calling `setSomething` during render causes an endless loop.
- **A spread `{ ...a, ...b }` inside a style hides typos.** TypeScript didn't catch `borderMargin` (it doesn't exist) while it was spread into an object; as its own item in the style array it would have. Prefer array items.
- **Use `minHeight`, not `height`,** for things holding text, so bigger system font sizes don't cut it off.
- **Centering:** `justifyContent: 'center'` + `alignItems: 'center'` go on the **container**. `textAlign` only aligns text inside its own box.
- **`selectable={false}`**, not `selectable="false"`: a string is always "true".
- **Don't center or lay out inside a base component** unless the spec says so (e.g. `Screen` only does safe area + background). Layout is the screen's job; it passes it through `style`.
- **Don't build a new object on every render just to read one value from it.** `AppText` first merged both color groups (`{ ...core, ...accent_semantic }`) on every render to read one color; Codex flagged it. Read the value straight from the group it lives in instead. When a prop can be a key from either of two groups, a **type guard** tells TypeScript which group to read from (a plain `key in obj ? … : …` isn't enough for TypeScript). See `isCore` and `getColor` in [`AppText.tsx`](../../src/components/AppText.tsx) and [TypeScript: type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
- **`keyof` goes on an object, never on a list of names.** `keyof Theme['colors']['core']` gives `'bg' | 'surface' | …`. Putting `keyof` on that list again gives the methods of a string (`'charAt' | 'slice' | …`). And join two lists of names with `|` (either one), not `&` (only names in both, which is none).
- **Types don't exist when the app runs.** `in` checks a real object at runtime, so write `c in dark_theme.colors.core` (a value from `tokens.ts`), not `c in Theme['colors']['core']` (a type). Use the `theme` from `useContext` when you _read_ a color, so it follows the chosen theme.

## Changelog

<!-- One line per fix: date — who — what was unclear and what changed. -->

- 2026-11-22 — Teo — first version, from PR #26.
- 2026-11-22 — Teo — added gotchas from the Codex review: no per-render objects, type guards, `keyof` and `|` vs `&`, types vs values.
