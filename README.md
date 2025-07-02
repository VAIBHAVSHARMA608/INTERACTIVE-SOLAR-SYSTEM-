
# Solar System 3D Simulation

This project is a mobile-responsive, interactive 3D simulation of the solar system built with [Three.js](https://threejs.org/).  
You can view all 8 planets orbiting the Sun, adjust their orbital speeds, and interact with the scene.

---

## Features

- Realistic 3D solar system with Sun and 8 planets
- Animated orbits and planet rotations
- Adjustable orbital speed for each planet (via sliders)
- Planet name tags
- Interactive camera (drag to rotate, scroll to zoom)
- Responsive UI

---

## Folder Structure

```
Solar system -one cup/
├── index.html
├── app.js
├── textures/
│   ├── background.webp
│   ├── sun.webp
│   ├── mercury.jpg
│   ├── venus.jpg
│   ├── earth.jpg
│   ├── mars.jpg
│   ├── jupiter.jpg
│   ├── saturn.jpg
│   ├── uranus.jpg
│   ├── neptune.jpg
│   ├── saturn ring.jpg
│   └── uranus ring.jpg
└── libs/
    └── three/
        ├── three.module.js
        └── OrbitControls.js
```

---

## How to Run

1. **Download or clone this repository.**

2. **Install a simple static server** (if you don’t have one):
   - Using [Node.js](https://nodejs.org/):  
     ```
     npx serve
     ```
   - Or use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.

3. **Start the server** in the project folder:
   ```
   npx serve
   ```
   or right-click `index.html` and select **"Open with Live Server"** in VS Code.

4. **Open your browser** and go to the address shown (usually [http://localhost:3000](http://localhost:3000) or [http://localhost:5000](http://localhost:5000)).

5. **Enjoy!**  
   - Drag to rotate the view, scroll to zoom.
   - Use the sliders to adjust each planet’s orbital speed.

---

## Notes

- All code is in `app.js`.
- All textures must be present in the `textures/` folder.
- The project uses local copies of Three.js and OrbitControls from the `libs/three/` folder for offline compatibility.

---

## Demo

Include a screen recording or screenshots here if required.

---

## License

For educational/demo purposes.
