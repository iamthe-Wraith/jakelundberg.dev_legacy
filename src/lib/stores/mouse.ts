import { readable } from 'svelte/store';

interface IMousePos {
  x: number;
  y: number;
}

interface IMouse {
  coords: IMousePos;
  relativeCoords: IMousePos;
}

interface IScreen {
  width: number;
  height: number;
  center: IMousePos;
}

let screen: IScreen = {
  width: 0,
  height: 0,
  center: {
    x: 0,
    y: 0,
  }
};

let initMouse: IMouse = {
  coords: { x: 0, y: 0 },
  relativeCoords: { x: 0, y: 0 },
}

const onResize = () => {
  screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
      x: Math.floor(window.innerWidth / 2),
      y: Math.floor(window.innerHeight / 2),
    }
  }
}

export const MousePos = readable(initMouse, (set) => {
  const onMouseMove = (e: MouseEvent) => {
    console.log('onMouseMove');

    const x = e.clientX;
    const y = e.clientY;

    const relX = Math.floor(x - screen.center.x);
    const relY = Math.floor(y - screen.center.y);

    set({
      coords: { x, y },
      relativeCoords: { x: relX, y: relY },
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('resize', onResize);

  onResize();

	return () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('resize', onResize);
  };
});
