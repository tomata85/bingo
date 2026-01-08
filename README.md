```markdown
# bingo

This is a single-page Bingo application. The UI shows a minimal "Bingo" logo, a title (loaded from `data.json`) and a 5×5 table-like board of square cells, each containing a short sentence.

Behavior
- Click a cell to mark it completed. A small green check appears and the cell becomes non-clickable.
- Checked cells are persisted to a cookie and restored on subsequent visits.

Design
- The board is rendered as a 5×5 table: square cells separated by borders (no gaps).
- Visual style is simple, clean and minimalistic.

Development
- Prioritize simplicity, maintainability and readability over modern frameworks.
- Uses Bootstrap for base layout and vanilla JavaScript for behavior.

Files
- `index.html` — page shell and links to assets.
- `styles.css` — table-like board styles and responsive tweaks.
- `app.js` — loads `data.json`, renders the 5×5 grid, handles clicks and cookie persistence.
- `data.json` — contains the `title` and 25 `items` used for the board.

Preview
1. Start a local server from the repository root, for example:

```bash
python3 -m http.server 8000
```

2. Open http://127.0.0.1:8000 in your browser to preview the app.

Resetting progress
- To clear saved checks, clear the `bingo_checks` cookie for the site (browser devtools → Application → Cookies), or reopen in a new private window.

Deployment
- A GitHub Actions workflow is included at `.github/workflows/pages.yml` to publish the repository root to GitHub Pages on pushes to `main`.

```