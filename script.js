// === State ===
let t = 0;

function setup() {
  createCanvas(400, 400);
  // Changed: stroke colour shifted from orange (255,120) to a cool cyan (0,220,255)
  // The three arguments map to R, G, B — cyan sits at the opposite end of the
  // colour wheel from the original orange, giving the organism an icy feel.
  stroke(0, 220, 255);
}

// -----------------------------------------------------------------------
// organism(x, y) — called 10 000 times per frame, once per "pixel seed"
// x  = i % 80   → loops 0..79, acting as a horizontal position index
// y  = i / 43   → rises slowly from 0..~232, acting as a depth/row index
// -----------------------------------------------------------------------
function organism(x, y) {

  // --- Frequency ripple ---
  // k controls how tightly the cosine waves oscillate across the canvas.
  // Original: cos(x/14) * cos(y/30)
  // Changed:  cos(x/9)  * cos(y/18)
  // Smaller denominators → higher spatial frequency → more tightly packed
  // ripples, producing a denser, coral-reef-like texture.
  let k = 5 * cos(x / 9) * cos(y / 18);

  // e is a simple linear ramp along the y-axis, shifted so it is negative
  // near the top and positive further down.  It adds an asymmetric tilt
  // to the whole structure.
  let e = y / 8 - 13;

  // --- Radial distance ---
  // d = ||(k, e)||² / 59 + 4   (mag returns Euclidean length)
  // This is essentially a squared-distance field from the origin in (k,e)
  // space, scaled and offset so d is always > 0.
  // Changed the divisor from 59 → 40 and the offset from 4 → 6.
  // A smaller divisor stretches d outward faster, enlarging the overall
  // radius of each "arm"; the larger offset raises the floor so the centre
  // stays well-defined and doesn't collapse to a pinpoint.
  let d = pow(mag(k, e), 2) / 40 + 6;

  // --- Angle in (k,e) space ---
  let angleTerm = atan2(k, e);
  // q is the base polar radius used to place each point.
  // Original: 60 - 3*sin(angleTerm * e)
  // Changed:  50 - 5*sin(angleTerm * e)
  // Reducing 60→50 pulls the arms inward (tighter bloom), while increasing
  // the sine amplitude 3→5 exaggerates the petal-like undulation around
  // the ring, creating more pronounced lobes.
  let q = 50 - 5 * sin(angleTerm * e);

  // --- Animated wave ---
  // wave modulates the radius over time, making the organism breathe.
  // Original:  k * (3 + 4 / d * sin(d*d - t*2))
  // Changed:   k * (3 + 6 / d * sin(d*d - t*3))
  // Increasing the sine amplitude 4→6 makes the breathing more dramatic;
  // speeding up the time coefficient t*2→t*3 raises the pulse rate,
  // so the organism appears more energetic / alive.
  let wave = k * (3 + 6 / d * sin(d * d - t * 3));

  // --- Angle for canvas coordinates ---
  // c maps each point to a canvas rotation angle.
  let c = d / 2 + e / 99 - t / 18;

  // --- Final screen coordinates ---
  // (q + wave) is the animated polar radius; c is the angle.
  // Multiplying by sin/cos converts polar → Cartesian, then +200 centres
  // the result on the 400×400 canvas.
  let xCoord = (q + wave) * sin(c) + 200;
  let yCoord = (q + d * 9) * cos(c) + 200;

  point(xCoord, yCoord);
}

// -----------------------------------------------------------------------
// draw() — p5 calls this ~60 fps
// -----------------------------------------------------------------------
function draw() {
  // Changed background from near-black (9) to a very deep navy (5,5,18)
  // so the cyan stroke pops with more contrast and the trail fades
  // slightly differently, leaving a subtle blue ghost on each frame.
  background(5, 5, 18);

  // t advances the animation; original step was PI/20.
  // Changed to PI/25 — a slightly slower time step gives the organism a
  // calmer, more hypnotic rotation rather than a frantic spin.
  t += PI / 25;

  for (let i = 0; i < 10000; i++) {
    let x = i % 80;
    let y = i / 43;
    organism(x, y);
  }
}