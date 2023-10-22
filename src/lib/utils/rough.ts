import rough from 'roughjs';
import { removeChildren } from './dom';
import { secondary500Color } from '$lib/constants/colors';

export function drawRoughLine(id: string) {
  const svg = document.getElementById(id) as unknown as SVGSVGElement;
  removeChildren(svg);
  const rect = svg.getBoundingClientRect();
  const roughSvg = rough.svg(svg);

  const line = roughSvg.line(0, rect.height / 2, rect.width, rect.height / 2, {
    stroke: secondary500Color,
    strokeWidth: 2,
    roughness: 1.5
  });
  svg.appendChild(line);
}