/* File: patterns.js */

// Draw the standard essential vitamin pattern
function drawEssentialPattern(table, size, largest, alph, factor, palette1, palette2) {
    // Calculate the background color based on selected palettes
    let r0 = (int(table.get(palette1, 0)) + int(table.get(palette2, 0))) / 2;
    let g0 = (int(table.get(palette1, 1)) + int(table.get(palette2, 1))) / 2;
    let b0 = (int(table.get(palette1, 2)) + int(table.get(palette2, 2))) / 2;
    background(r0, g0, b0);
    
    // Call the function to draw the shapes, passing all necessary variables
    drawEssentialShapes(table, palette1, palette2, size, largest, alph, factor);
  }
  
  // Attach the function to the window object
  window.drawEssentialPattern = drawEssentialPattern;
  
  // Draw the shapes for the standard pattern
  function drawEssentialShapes(table, palette1, palette2, size, largest, alph, factor) {
    let rez = random(0.003, 0.01);
    factor += 1000;
    let sF = 360 / random(2, 40);
    
    for (let i = width; i > -size * largest; i -= size) {
      for (let j = height; j > -size * largest; j -= size) {
        let n1 = noise(i * rez + factor, j * rez + factor);
        let n2 = noise(i * rez + factor + 10000, j * rez + factor + 10000);
        let n3 = noise(i * rez + factor + 20000, j * rez + factor + 20000);
  
        let col1 = map(n1, 0, 1, 0, 360);
        let col2 = map(n2, 0, 1, 0, 360);
        let dec1 = fract(col1 / sF);
        let dec2 = fract(col2 / sF);
        
        let col3 = getColorCategory(dec1);
        let col4 = getColorCategory(dec2);
  
        let r1 = table.get(palette1, col3 * 3);
        let g1 = table.get(palette1, col3 * 3 + 1);
        let b1 = table.get(palette1, col3 * 3 + 2);
        let r2 = table.get(palette2, col4 * 3);
        let g2 = table.get(palette2, col4 * 3 + 1);
        let b2 = table.get(palette2, col4 * 3 + 2);
        let size2 = size * floor(random(1, largest));
  
        drawTriangles(i, j, size2, n3, r1, g1, b1, r2, g2, b2, alph);
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
  function drawTriangles(i, j, size2, n3, r1, g1, b1, r2, g2, b2, alph) {
    if (n3 < 0.25) {
      fill(r1, g1, b1, alph);
      triangle(i, j, i + size2, j + size2, i, j + size2);
      fill(r2, g2, b2, alph);
      triangle(i, j, i + size2, j + size2, i + size2, j);
    } else if (n3 < 0.5) {
      fill(r1, g1, b1, alph);
      triangle(i + size2, j, i + size2, j + size2, i, j + size2);
      fill(r2, g2, b2, alph);
      triangle(i, j + size2, i, j, i + size2, j);
    } else if (n3 < 0.75) {
      fill(r1, g1, b1, alph);
      triangle(i, j, i + size2, j + size2, i + size2, j);
      fill(r2, g2, b2, alph);
      triangle(i, j, i + size2, j + size2, i, j + size2);
    } else {
      fill(r1, g1, b1, alph);
      triangle(i, j + size2, i, j, i + size2, j);
      fill(r2, g2, b2, alph);
      triangle(i + size2, j, i + size2, j + size2, i, j + size2);
    }
  }
  
  // Helper function equivalent to the fract function in sketch.js
  function fract(x) {
    return x - floor(x);
  }
  
  // Draw the Pet Supplement pattern
  function drawPetPattern(table, size, largest, alph, factor, palette1, palette2) {
    // Calculate the background color based on selected palettes
    let r0 = (int(table.get(palette1, 0)) + int(table.get(palette2, 0))) / 2;
    let g0 = (int(table.get(palette1, 1)) + int(table.get(palette2, 1))) / 2;
    let b0 = (int(table.get(palette1, 2)) + int(table.get(palette2, 2))) / 2;
    background(r0, g0, b0);
  
    // Call the function to draw the shapes, passing all necessary variables
    drawPetShapes(table, palette1, palette2, size, largest, alph, factor);
  
    // Draw the overlay paw
    drawOverlayPaw(alph);
  }
  
  // Attach the function to the window object
  window.drawPetPattern = drawPetPattern;
  
  // Draw the shapes for the pet pattern
  function drawPetShapes(table, palette1, palette2, size, largest, alph, factor) {
    let rez = random(0.003, 0.01);
    factor += 1000;
    let sF = 360 / random(2, 40);
  
    // List of pet icon drawing functions
    let petIcons = [drawPawPrint, drawBone, drawCat, drawHeartWithPaw];
  
    for (let i = width; i > -size * largest; i -= size) {
      for (let j = height; j > -size * largest; j -= size) {
        let n1 = noise(i * rez + factor, j * rez + factor);
        let n2 = noise(i * rez + factor + 10000, j * rez + factor + 10000);
        let n3 = noise(i * rez + factor + 20000, j * rez + factor + 20000);
  
        let col1 = map(n1, 0, 1, 0, 360);
        let col2 = map(n2, 0, 1, 0, 360);
        let dec1 = fract(col1 / sF);
        let dec2 = fract(col2 / sF);
  
        let col3 = getColorCategory(dec1);
        let col4 = getColorCategory(dec2);
  
        let r1 = table.get(palette1, col3 * 3);
        let g1 = table.get(palette1, col3 * 3 + 1);
        let b1 = table.get(palette1, col3 * 3 + 2);
        let r2 = table.get(palette2, col4 * 3);
        let g2 = table.get(palette2, col4 * 3 + 1);
        let b2 = table.get(palette2, col4 * 3 + 2);
  
        let size2 = size * floor(random(1, largest));
  
        // Randomly decide whether to draw a pet icon or a triangle
        let drawIconChance = random(1);
        if (drawIconChance < 0.15) { // 15% chance to draw a pet icon
          let petIcon = random(petIcons);
          petIcon(i, j, size2, r1, g1, b1, alph, r2, g2, b2);
        } else {
          drawTrianglesWithVariation(i, j, size2, n3, r1, g1, b1, r2, g2, b2, alph);
        }
      }
    }
  }
  
  // Draw triangles with slight randomization for the pet pattern
  function drawTrianglesWithVariation(i, j, size2, n3, r1, g1, b1, r2, g2, b2, alph) {
    // Slightly randomize triangle vertices for organic variation
    let offset = size2 * 0.1;
    if (n3 < 0.25) {
      fill(r1, g1, b1, alph);
      triangle(
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + size2 + random(-offset, offset)
      );
      fill(r2, g2, b2, alph);
      triangle(
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + size2 + random(-offset, offset), j + random(-offset, offset)
      );
    } else if (n3 < 0.5) {
      fill(r1, g1, b1, alph);
      triangle(
        i + size2 + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + size2 + random(-offset, offset)
      );
      fill(r2, g2, b2, alph);
      triangle(
        i + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + random(-offset, offset)
      );
    } else if (n3 < 0.75) {
      fill(r1, g1, b1, alph);
      triangle(
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + size2 + random(-offset, offset), j + random(-offset, offset)
      );
      fill(r2, g2, b2, alph);
      triangle(
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + size2 + random(-offset, offset)
      );
    } else {
      fill(r1, g1, b1, alph);
      triangle(
        i + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + random(-offset, offset)
      );
      fill(r2, g2, b2, alph);
      triangle(
        i + size2 + random(-offset, offset), j + random(-offset, offset),
        i + size2 + random(-offset, offset), j + size2 + random(-offset, offset),
        i + random(-offset, offset), j + size2 + random(-offset, offset)
      );
    }
  }
  
  // Pet icon functions
  function drawPawPrint(x, y, s, r1, g1, b1, alph) {
    fill(r1, g1, b1, alph);
    noStroke();
    // Main pad
    ellipse(x + s * 0.5, y + s * 0.7, s * 0.4, s * 0.3);
    // Toes
    ellipse(x + s * 0.3, y + s * 0.4, s * 0.15, s * 0.2);
    ellipse(x + s * 0.5, y + s * 0.3, s * 0.15, s * 0.2);
    ellipse(x + s * 0.7, y + s * 0.4, s * 0.15, s * 0.2);
  }
  
  function drawBone(x, y, s, r1, g1, b1, alph) {
    fill(r1, g1, b1, alph);
    noStroke();
    // Left circles
    ellipse(x + s * 0.25, y + s * 0.4, s * 0.2, s * 0.2);
    ellipse(x + s * 0.25, y + s * 0.6, s * 0.2, s * 0.2);
    // Right circles
    ellipse(x + s * 0.75, y + s * 0.4, s * 0.2, s * 0.2);
    ellipse(x + s * 0.75, y + s * 0.6, s * 0.2, s * 0.2);
    // Rectangle in the middle
    rect(x + s * 0.25, y + s * 0.4, s * 0.5, s * 0.2);
  }
  
  function drawCat(x, y, s, r1, g1, b1, alph) {
    fill(r1, g1, b1, alph);
    noStroke();
    // Body
    ellipse(x + s * 0.5, y + s * 0.65, s * 0.4, s * 0.5);
    // Head
    ellipse(x + s * 0.5, y + s * 0.35, s * 0.3, s * 0.3);
    // Ears
    triangle(
      x + s * 0.4, y + s * 0.2,
      x + s * 0.45, y + s * 0.3,
      x + s * 0.35, y + s * 0.3
    );
    triangle(
      x + s * 0.6, y + s * 0.2,
      x + s * 0.55, y + s * 0.3,
      x + s * 0.65, y + s * 0.3
    );
    // Tail
    stroke(r1, g1, b1, alph);
    strokeWeight(s * 0.05);
    noFill();
    arc(x + s * 0.75, y + s * 0.65, s * 0.5, s * 0.5, HALF_PI, PI);
  }
  
  function drawHeartWithPaw(x, y, s, r1, g1, b1, alph, r2, g2, b2) {
    fill(r1, g1, b1, alph);
    noStroke();
    // Heart shape
    beginShape();
    vertex(x + s * 0.5, y + s * 0.7);
    bezierVertex(
      x + s * 0.1, y + s * 0.5,
      x + s * 0.1, y + s * 0.1,
      x + s * 0.5, y + s * 0.3
    );
    bezierVertex(
      x + s * 0.9, y + s * 0.1,
      x + s * 0.9, y + s * 0.5,
      x + s * 0.5, y + s * 0.7
    );
    endShape(CLOSE);
    // Paw print inside heart
    fill(r2, g2, b2, alph);
    drawPawPrint(x + s * 0.25, y + s * 0.4, s * 0.5, r2, g2, b2, alph);
  }
  
  // Draw the large overlay paw
  function drawOverlayPaw(alph) {
    push();
    // Set the blend mode to overlay or multiply for an embossed effect
    blendMode(MULTIPLY);
    // Set a low opacity for subtlety
    fill(255, 255, 255, 80); // Adjust alpha value for transparency
    noStroke();
    // Calculate size based on canvas
    let s = min(width, height) * 0.7;
    // Center position
    let x = width / 2 - s / 2;
    let y = height / 2 - s / 2;
    // Draw large paw print
    drawPawPrint(x, y, s, 255, 255, 255, alph);
    pop();
    // Reset blend mode
    blendMode(BLEND);
  }
  