// File: patterns.js

// Helper function for fractional part
function fract(x) {
  return x - Math.floor(x);
}

// Draw the standard essential vitamin pattern
export function drawEssentialPattern(
  s,
  palettes,
  size,
  largest,
  alph,
  factor,
  palette1Index,
  palette2Index
) {
  // Get the selected palettes
  let palette1 = palettes.palettes[palette1Index].colors;
  let palette2 = palettes.palettes[palette2Index].colors;

  // Calculate the background color using the first color in both palettes
  let r0 = (palette1[0][0] + palette2[0][0]) / 2;
  let g0 = (palette1[0][1] + palette2[0][1]) / 2;
  let b0 = (palette1[0][2] + palette2[0][2]) / 2;
  s.background(r0, g0, b0);

  // Now call the function to draw the shapes, passing all necessary variables
  drawEssentialShapes(
    s,
    palettes,
    palette1Index,
    palette2Index,
    size,
    largest,
    alph,
    factor
  );
}

// Draw the shapes for the standard pattern
function drawEssentialShapes(
  s,
  palettes,
  palette1Index,
  palette2Index,
  size,
  largest,
  alph,
  factor
) {
  let palette1 = palettes.palettes[palette1Index].colors;
  let palette2 = palettes.palettes[palette2Index].colors;

  let rez = s.random(0.003, 0.01);
  factor += 1000;
  let sF = 360 / s.random(2, 40);

  for (let i = s.width; i > -size * largest; i -= size) {
    for (let j = s.height; j > -size * largest; j -= size) {
      let n1 = s.noise(i * rez + factor, j * rez + factor);
      let n2 = s.noise(i * rez + factor + 10000, j * rez + factor + 10000);
      let n3 = s.noise(i * rez + factor + 20000, j * rez + factor + 20000);

      let col1 = s.map(n1, 0, 1, 0, 360);
      let col2 = s.map(n2, 0, 1, 0, 360);
      let dec1 = fract(col1 / sF);
      let dec2 = fract(col2 / sF);

      let col3 = getColorCategory(dec1);
      let col4 = getColorCategory(dec2);

      let r1 = palette1[col3][0];
      let g1 = palette1[col3][1];
      let b1 = palette1[col3][2];
      let r2 = palette2[col4][0];
      let g2 = palette2[col4][1];
      let b2 = palette2[col4][2];

      let size2 = size * Math.floor(s.random(1, largest));

      drawTriangles(
        s,
        i,
        j,
        size2,
        n3,
        r1,
        g1,
        b1,
        r2,
        g2,
        b2,
        alph
      );
    }
  }
}

// Helper function to map decimal values to color categories
function getColorCategory(decimal) {
  if (decimal < 0.2) return 0;
  else if (decimal < 0.4) return 1;
  else if (decimal < 0.6) return 2;
  else if (decimal < 0.8) return 3;
  else return 4;
}

// Helper function to draw triangles with the generated color
function drawTriangles(
  s,
  i,
  j,
  size2,
  n3,
  r1,
  g1,
  b1,
  r2,
  g2,
  b2,
  alph
) {
  if (n3 < 0.25) {
    s.fill(r1, g1, b1, alph);
    s.triangle(i, j, i + size2, j + size2, i, j + size2);
    s.fill(r2, g2, b2, alph);
    s.triangle(i, j, i + size2, j + size2, i + size2, j);
  } else if (n3 < 0.5) {
    s.fill(r1, g1, b1, alph);
    s.triangle(i + size2, j, i + size2, j + size2, i, j + size2);
    s.fill(r2, g2, b2, alph);
    s.triangle(i, j + size2, i, j, i + size2, j);
  } else if (n3 < 0.75) {
    s.fill(r1, g1, b1, alph);
    s.triangle(i, j, i + size2, j + size2, i + size2, j);
    s.fill(r2, g2, b2, alph);
    s.triangle(i, j, i + size2, j + size2, i, j + size2);
  } else {
    s.fill(r1, g1, b1, alph);
    s.triangle(i, j + size2, i, j, i + size2, j);
    s.fill(r2, g2, b2, alph);
    s.triangle(i + size2, j, i + size2, j + size2, i, j + size2);
  }
}

// Draw the Pet Supplement pattern
export function drawPetPattern(
  s,
  palettes,
  size,
  largest,
  alph,
  factor,
  palette1Index,
  palette2Index
) {
  // Get the selected palettes
  let palette1 = palettes.palettes[palette1Index].colors;
  let palette2 = palettes.palettes[palette2Index].colors;

  // Calculate the background color using the first color in both palettes
  let r0 = (palette1[0][0] + palette2[0][0]) / 2;
  let g0 = (palette1[0][1] + palette2[0][1]) / 2;
  let b0 = (palette1[0][2] + palette2[0][2]) / 2;
  s.background(r0, g0, b0);

  // Call the function to draw the shapes, passing all necessary variables
  drawPetShapes(
    s,
    palettes,
    palette1Index,
    palette2Index,
    size,
    largest,
    alph,
    factor
  );

  // Draw the overlay paw
  drawOverlayPaw(s, alph);
}

// Draw the shapes for the pet pattern
function drawPetShapes(
  s,
  palettes,
  palette1Index,
  palette2Index,
  size,
  largest,
  alph,
  factor
) {
  let palette1 = palettes.palettes[palette1Index].colors;
  let palette2 = palettes.palettes[palette2Index].colors;

  let rez = s.random(0.003, 0.01);
  factor += 1000;
  let sF = 360 / s.random(2, 40);

  // List of pet icon drawing functions
  let petIcons = [drawPawPrint, drawBone, drawCat, drawHeartWithPaw];

  for (let i = s.width; i > -size * largest; i -= size) {
    for (let j = s.height; j > -size * largest; j -= size) {
      let n1 = s.noise(i * rez + factor, j * rez + factor);
      let n2 = s.noise(i * rez + factor + 10000, j * rez + factor + 10000);
      let n3 = s.noise(i * rez + factor + 20000, j * rez + factor + 20000);

      let col1 = s.map(n1, 0, 1, 0, 360);
      let col2 = s.map(n2, 0, 1, 0, 360);
      let dec1 = fract(col1 / sF);
      let dec2 = fract(col2 / sF);

      let col3 = getColorCategory(dec1);
      let col4 = getColorCategory(dec2);

      let r1 = palette1[col3][0];
      let g1 = palette1[col3][1];
      let b1 = palette1[col3][2];
      let r2 = palette2[col4][0];
      let g2 = palette2[col4][1];
      let b2 = palette2[col4][2];

      let size2 = size * Math.floor(s.random(1, largest));

      // Randomly decide whether to draw a pet icon or a triangle
      let drawIconChance = s.random(1);
      if (drawIconChance < 0.20) {
        // 20% chance to draw a pet icon
        let petIcon = s.random(petIcons);
        petIcon(s, i, j, size2, r1, g1, b1, alph, r2, g2, b2);
      } else {
        drawTrianglesWithVariation(
          s,
          i,
          j,
          size2,
          n3,
          r1,
          g1,
          b1,
          r2,
          g2,
          b2,
          alph
        );
      }
    }
  }
}

// Draw triangles with slight randomization for the pet pattern
function drawTrianglesWithVariation(
  s,
  i,
  j,
  size2,
  n3,
  r1,
  g1,
  b1,
  r2,
  g2,
  b2,
  alph
) {
  // Slightly randomize triangle vertices for organic variation
  let offset = size2 * 0.1;
  if (n3 < 0.25) {
    s.fill(r1, g1, b1, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset)
    );
    s.fill(r2, g2, b2, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset)
    );
  } else if (n3 < 0.5) {
    s.fill(r1, g1, b1, alph);
    s.triangle(
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset)
    );
    s.fill(r2, g2, b2, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset)
    );
  } else if (n3 < 0.75) {
    s.fill(r1, g1, b1, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset)
    );
    s.fill(r2, g2, b2, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset)
    );
  } else {
    s.fill(r1, g1, b1, alph);
    s.triangle(
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset)
    );
    s.fill(r2, g2, b2, alph);
    s.triangle(
      i + size2 + s.random(-offset, offset),
      j + s.random(-offset, offset),
      i + size2 + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset),
      i + s.random(-offset, offset),
      j + size2 + s.random(-offset, offset)
    );
  }
}

// Pet icon functions
function drawPawPrint(s, x, y, size, r1, g1, b1, alph) {
  s.fill(r1, g1, b1, alph);
  s.noStroke();
  // Main pad
  s.ellipse(x + size * 0.5, y + size * 0.7, size * 0.4, size * 0.3);
  // Toes
  s.ellipse(x + size * 0.3, y + size * 0.4, size * 0.15, size * 0.2);
  s.ellipse(x + size * 0.5, y + size * 0.3, size * 0.15, size * 0.2);
  s.ellipse(x + size * 0.7, y + size * 0.4, size * 0.15, size * 0.2);
}

function drawBone(s, x, y, size, r1, g1, b1, alph) {
  s.fill(r1, g1, b1, alph);
  s.noStroke();
  // Left circles
  s.ellipse(x + size * 0.25, y + size * 0.4, size * 0.2, size * 0.2);
  s.ellipse(x + size * 0.25, y + size * 0.6, size * 0.2, size * 0.2);
  // Right circles
  s.ellipse(x + size * 0.75, y + size * 0.4, size * 0.2, size * 0.2);
  s.ellipse(x + size * 0.75, y + size * 0.6, size * 0.2, size * 0.2);
  // Rectangle in the middle
  s.rect(x + size * 0.25, y + size * 0.4, size * 0.5, size * 0.2);
}

function drawCat(s, x, y, size, r1, g1, b1, alph) {
  s.fill(r1, g1, b1, alph);
  s.noStroke();
  // Body
  s.ellipse(x + size * 0.5, y + size * 0.65, size * 0.4, size * 0.5);
  // Head
  s.ellipse(x + size * 0.5, y + size * 0.35, size * 0.3, size * 0.3);
  // Ears
  s.triangle(
    x + size * 0.4,
    y + size * 0.2,
    x + size * 0.45,
    y + size * 0.3,
    x + size * 0.35,
    y + size * 0.3
  );
  s.triangle(
    x + size * 0.6,
    y + size * 0.2,
    x + size * 0.55,
    y + size * 0.3,
    x + size * 0.65,
    y + size * 0.3
  );
  // Tail
  s.stroke(r1, g1, b1, alph);
  s.strokeWeight(size * 0.05);
  s.noFill();
  s.arc(
    x + size * 0.75,
    y + size * 0.65,
    size * 0.5,
    size * 0.5,
    s.HALF_PI,
    s.PI
  );
}

function drawHeartWithPaw(s, x, y, size, r1, g1, b1, alph, r2, g2, b2) {
  s.fill(r1, g1, b1, alph);
  s.noStroke();
  // Heart shape
  s.beginShape();
  s.vertex(x + size * 0.5, y + size * 0.7);
  s.bezierVertex(
    x + size * 0.1,
    y + size * 0.5,
    x + size * 0.1,
    y + size * 0.1,
    x + size * 0.5,
    y + size * 0.3
  );
  s.bezierVertex(
    x + size * 0.9,
    y + size * 0.1,
    x + size * 0.9,
    y + size * 0.5,
    x + size * 0.5,
    y + size * 0.7
  );
  s.endShape(s.CLOSE);
  // Paw print inside heart
  s.fill(r2, g2, b2, alph);
  drawPawPrint(s, x + size * 0.25, y + size * 0.4, size * 0.5, r2, g2, b2, alph);
}

// Draw the large overlay paw
function drawOverlayPaw(s, alph) {
  s.push();
  // Set the blend mode to overlay or multiply for an embossed effect
  s.blendMode(s.MULTIPLY);
  // Set a low opacity for subtlety
  s.fill(255, 255, 255, 80); // Adjust alpha value for transparency
  s.noStroke();
  // Calculate size based on canvas
  let size = Math.min(s.width, s.height) * 0.7;
  // Center position
  let x = s.width / 2 - size / 2;
  let y = s.height / 2 - size / 2;
  // Draw large paw print
  drawPawPrint(s, x, y, size, 255, 255, 255, alph);
  s.pop();
  // Reset blend mode
  s.blendMode(s.BLEND);
}
