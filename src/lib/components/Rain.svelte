<script lang="ts">
	import { getRandomNum } from '$lib/utils/number';
	import { onMount } from 'svelte';

	export let id = 'rain';
	export let width = 0;
	export let height = 0;
	export let maxDrops = 100;

	interface IDrop {
		x: number;
		y: number;
		length: number;
		moveX: number;
		moveY: number;
		end: number;
		strokeAlpha: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let interval: number;
	let canvasWidth: number;
	let canvasHeight: number;

	const rainMaxDrops = maxDrops;
	const drops: IDrop[] = [];

	onMount(() => {
		initialize();

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			clearInterval(interval);
		};
	});

	function initialize() {
		canvasWidth = width ? Math.abs(width) : window.innerWidth;
		canvasHeight = height ? Math.abs(height) : window.innerHeight;

		canvas = document.getElementById('rain') as HTMLCanvasElement;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';

		for (let i = 0; i < rainMaxDrops; i++) {
			const end = (getRandomNum() * canvasHeight) / 2;

			const drop: IDrop = {
				x: getRandomNum() * canvasWidth,
				y: getRandomNum() * canvasHeight,
				length: getRandomNum() * 1.8 + 0.5,
				moveX: 0,
				moveY: getRandomNum() * 10 + 45,
				end: canvasHeight - end,
				strokeAlpha: 0.5 - end / canvasHeight
			};

			drops.push(drop);
		}

		interval = window.setInterval(drawDrops, 30);
	}

	function drawDrops() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		for (let i = 0; i < drops.length; i++) {
			const drop = drops[i];
			ctx.beginPath();
			ctx.moveTo(drop.x, drop.y);
			ctx.lineTo(drop.x + drop.length * drop.moveX, drop.y + drop.length * drop.moveY);
			ctx.strokeStyle = `rgba(174,194,224,${drop.strokeAlpha})`;
			ctx.stroke();
		}
		moveDrops();
	}

	function moveDrops() {
		for (let i = 0; i < drops.length; i++) {
			const drop = drops[i];

			drop.x += drop.moveX;
			drop.y += drop.moveY;
			if (drop.x > canvasWidth || drop.y > drop.end) {
				drop.x = getRandomNum() * canvasWidth;
				drop.y = -20;
			}
		}
	}

	function onResize() {
		canvasWidth = width ? Math.abs(width) : window.innerWidth;
		canvasHeight = height ? Math.abs(height) : window.innerHeight;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		ctx.strokeStyle = 'rgba(174,194,224,0.5)';
	}
</script>

<canvas {id} />
