export const LoginPrompt = (address: string, username: string, password: string): string => `
> **Regeln — vor dem Start lesen:**
>
> 1. Verwende immer Element-Refs (z. B. \`e27\`) aus dem letzten Snapshot als \`target\` für Klicks — niemals CSS- oder Text-Selektoren.
> 2. Nach einem Snapshot: Verwende den benötigten Ref **sofort** im nächsten Tool-Call. Mache **keinen** weiteren Snapshot, bevor du den Ref benutzt hast.
> 3. Snapshots **ohne** Frame-Selektor aufnehmen — kein \`iframe\`-Parameter. Die Login-Seite läuft im Haupt-Browserfenster, nicht in einem iframe.
> 4. Passwörter: Verwende immer die bereitgestellten Zugangsdaten (Username: \`${username}\`, Password: \`${password}\`). Frage niemals nach Zugangsdaten.

---

**Schritt 1 — Offene Tabs prüfen**

Rufe \`#playwright:browser_tabs\` auf.

- Tab mit \`${address}\` ist bereits offen → weiter mit **Schritt 2**.
- Kein passender Tab offen → navigiere mit \`#playwright:browser_navigate\` zu \`${address}\` → weiter mit **Schritt 2**.

---

**Schritt 2 — Login-Status prüfen**

Nimm einen \`#playwright:browser_snapshot\` (\`depth=8\`).

- Kein „Sign in"-Dialog oder -Button sichtbar → **STOP. Melde: „Bereits eingeloggt."**
- Ein „Sign in"-Dialog ist sichtbar → Ref des \`OK\`-Buttons sofort mit \`#playwright:browser_click\` klicken → weiter mit **Schritt 3**.

---

**Schritt 3 — ArcGIS-Login-Tab prüfen**

Rufe \`#playwright:browser_tabs\` auf.

- Kein neuer Tab geöffnet → **STOP. Melde: „Bereits eingeloggt."**
- Neuer Tab erschienen → selektiere ihn mit \`#playwright:browser_tabs\` (\`action=select\`) → weiter mit **Schritt 4**.

---

**Schritt 4 — ArcGIS-Loginformular ausfüllen**

Nimm einen \`#playwright:browser_snapshot\` (\`depth=8\`).

- Abschnitt „ArcGIS login" ist eingeklappt → Expand-Button-Ref sofort mit \`#playwright:browser_click\` klicken → neuen Snapshot nehmen → mit **Schritt 4** fortfahren.
- Felder „Username" und „Password" sind bereits ausgefüllt → \`Sign In\`-Button-Ref sofort mit \`#playwright:browser_click\` klicken → weiter mit **Schritt 5**.
- Felder sind leer → Felder mit \`#playwright:browser_fill_form\` mit Username \`${username}\` und Password \`${password}\` ausfüllen → \`Sign In\`-Button-Ref sofort mit \`#playwright:browser_click\` klicken → weiter mit **Schritt 5**.

---

**Schritt 5 — Rückkehr zum Haupt-Tab bestätigen**

Rufe \`#playwright:browser_tabs\` auf.

- Nur noch der Haupt-Tab (\`${address}\`) ist offen → **STOP. Melde: „Login erfolgreich."**
- Login-Tab ist noch offen → nimm einen \`#playwright:browser_snapshot\` (\`depth=8\`) und berichte dem Nutzer, was angezeigt wird.

`;