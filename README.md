# Crash: "Attempt to unmount a view which has a different index" (iOS, Fabric)

Reproducer for a recycled `RCTViewComponentView` that keeps its container view.
It uses the community reproducer template on React Native
`0.90.0-nightly-20261125-c4b72b416`. The whole reproducer is in `App.tsx`.

```sh
npm install
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios          # Debug: the assertion is debug-only
```

1. Tap **1. Swap the views**. The green pill should cover the left half of the
   dark bar. It's missing: it was inserted behind the bar.
2. Tap **2. Hide the green pill**. The app crashes with
   `Attempt to unmount a view which has a different index … index: 1, actual index: 0`.

It crashed in 3 of 3 runs on an iPhone 17 Pro simulator (iOS 26.5), and also on
React Native 0.88.1.

| After step 1 (the bug) | After step 1 with a fix |
|---|---|
| ![actual](screenshots/actual-after-step-1.png) | ![expected](screenshots/expected-after-step-1.png) |
