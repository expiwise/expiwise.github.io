# Images on the site

The scrolling phone uses drawn SVG illustrations of five app screens (`public/screens/*.svg`).
They are platform-neutral (no Android or iOS status bar) and match the real app's layout and the demo data.
Regenerate after changing the design or demo data: `python3 scripts/make-screens.py`.

Real screenshots are not shown on the site. Android ones are saved in `../docs/screenshots/` for the Play Store
listing; take iPhone ones for the App Store. If real screenshots are added to the site later, show Android and iPhone sets.

## Taking clean screenshots
- Run the release build (`flutter run --release`) so there is no DEBUG ribbon.
- Restore the demo data: Settings > Your data > Restore with `docs/demo/shelfwise-demo-backup.zip` (Replace).
- Set Settings > Display > Currency to your currency first, so Stats looks right.
- Pixel 8/9 emulator, portrait. Emulator toolbar camera icon, or `adb exec-out screencap -p > name.png`.
