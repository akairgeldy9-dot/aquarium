What the code does
10,000 points are plotted every frame. Each point's position comes from feeding loop indices through trig math that outputs polar coordinates (angle + distance from centre). The variable t ticks forward each frame, making it animate. The shape isn't stored — it's recalculated from scratch every frame.
What I changed
k divisors (x/14, y/30 → x/9, y/18) — smaller divisors mean the cosine wave completes more cycles across the canvas, making the pattern denser and more detailed.
Distance field d (divisor 59→40, offset 4→6) — d is basically Pythagoras in (k,e) space. A smaller divisor stretches the arms outward faster; the higher offset stops the centre from collapsing weirdly near zero.
Petal shape q and breathing wave — dropping q's base (60→50) pulls the shape inward. Raising the sine amplitude (3→5) makes the lobes more dramatic. Increasing wave's amplitude (4→6) and time multiplier (t×2 → t×3) makes the pulsing motion bigger and faster.
Colour/timing — stroke changed to cyan for better contrast, t step slowed slightly (PI/20 → PI/25) for a calmer feel.
