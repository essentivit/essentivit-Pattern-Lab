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

// Ensure global access to functions
window.drawEssentialPattern = drawEssentialPattern;
