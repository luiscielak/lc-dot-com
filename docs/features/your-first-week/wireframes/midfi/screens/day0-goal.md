# Day 0 Goal — mid-fi

**Lo-fi:** `../lofi/day0-goal-mobile.txt`  
**FRs:** FR-011, FR-010

## Layout

1. Banner (unofficial)  
2. Kicker `Day 0 of 7` (`--type-label`)  
3. Title `What do you want first?` (`--type-heading`)  
4. Three radio cards (goal)  
5. Billing module: 7 days, charge, amount, cancel-by, Web/App chips  
6. Footer: Continue (primary), Skip for now (quiet)

## States

- No goal selected → Continue still enabled  
- Web vs App Store chip toggles who-bills copy  

## A11y

Announce selected goal; billing facts in a readable list, not only bold numbers.
