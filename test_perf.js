const { JSDOM } = require("jsdom");
const fs = require("fs");

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
  <body>
    <div id="game-container" style="left: 10px; top: 10px; width: 800px; height: 600px;">
      <canvas id="viewport" width="800" height="600"></canvas>
    </div>
  </body>
  </html>
`);

global.document = dom.window.document;
global.window = dom.window;

// We simulate that `getElementById` has an overhead in the browser (layout thrashing/DOM searching)
// This override intercepts calls to document.getElementById
const originalGetElementById = document.getElementById.bind(document);
document.getElementById = function(id) {
    // simulate a small DOM lookup cost
    let sum = 0;
    for(let i=0; i<1000; i++) sum += i;
    return originalGetElementById(id);
};

const container = document.getElementById('game-container');
// Mocking getBoundingClientRect since JSDOM doesn't do real layout
container.getBoundingClientRect = () => {
    // simulate a reflow cost (which would be worse if getElementById triggered reflows or we do it repeatedly inside a fast event handler)
    let sum = 0;
    for(let i=0; i<1000; i++) sum += i;
    return { left: 10, top: 10, width: 800, height: 600 };
};

const canvas = document.getElementById('viewport');
canvas.getBoundingClientRect = () => ({ left: 10, top: 10, width: 800, height: 600 });

// Load Input.js code
const InputCode = fs.readFileSync('engine/Input.js', 'utf8');

// Use new Function to get the Input class
const Input = new Function(InputCode + '; return Input;')();

const mockEngine = {
    canvas: canvas,
    viewport: {
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        clamp: () => {},
        apply: () => {}
    },
    state: { isLocked: false, getCurrentScene: () => ({ hotspots: {} }) },
    dialogue: { isActive: false }
};

const input = new Input(mockEngine);

input.handleTouchStart({
    preventDefault: () => {},
    touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 200 }
    ]
});

const start = performance.now();
const iterations = 10000;
for (let i = 0; i < iterations; i++) {
    input.handleTouchMove({
        preventDefault: () => {},
        touches: [
            { clientX: 100 - i*0.001, clientY: 100 - i*0.001 },
            { clientX: 200 + i*0.001, clientY: 200 + i*0.001 }
        ]
    });
}
const end = performance.now();
console.log(`Optimized performance: ${end - start} ms for ${iterations} touch moves`);
