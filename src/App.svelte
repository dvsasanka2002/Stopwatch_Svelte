<script>
    import { onDestroy } from 'svelte';
	import Stopwatch from './Stopwatch.svelte';
	import Laps from './Laps.svelte';
	import Controls from './Controls.svelte';
	import { time } from './stores.js';

    let lapse = 0;

    let previous = 0;

    let unsubscribe;

    function start() {
        unsubscribe = time.subscribe(value => {
            lapse = value + previous;
        });
    }
    function terminate() {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

    function stop() {
        lapse = 0;
        previous = 0;

        laps = [];
        terminate();
    }

    function pause() {
        previous = lapse;
        terminate();
	}

    $:subscription = !!unsubscribe;

    $:lapsed = !!lapse;

	let laps = [];

    function lap() {
        const { length } = laps;
        const total = lapse;
        const partial = length > 0 ? total - laps[0].total : total;
        laps = [{
            number: length + 1,
            total,
            partial,
        }, ...laps];
    }

    onDestroy(() => {
        terminate();
    });

</script>
<style>

	@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:300|Open+Sans:400&display=swap");

	
	:global(*) {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
	}

	:global(body) {
			background-image: url("images/background.jpg");
			color:rgb(248, 85, 15);
			transition: background-color 0.1s;
			font-family: "Open Sans", sans-serif;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;	
			min-height: 98vh;
	}
	
	:global(.stopwatch){
			display: flex;
			flex-direction: column;
	}
	:global(.stopwatch > * + *){
			margin-top: 0.75rem;
	}
	
	@supports (display: grid){
			@media (min-width: 600px){

					:global(.stopwatch){
							display: grid;
							grid-gap: 20px 50px;
							grid-template-columns: 300px 250px;
							grid-template-rows: 225px auto;
							grid-template-areas: "watch list" "watch controls";
							justify-content: space-between;
					}
					:global(.stopwatch svg) {
							grid-area: watch;
							align-self: center;
					}
					:global(.stopwatch ul) {
							grid-area: list;
					}
					:global(.stopwatch .controls) {
							grid-area: controls;
							align-self: center;
					}
					:global(.stopwatch > * + *) {
							margin-top: 0;
					}
			}
	}

</style>
<div class = "center">STOPWATCH</div>
<div class="stopwatch">
	<Stopwatch {lapse} />
    <Laps {laps} />
	<Controls on:start={start} on:stop={stop} on:pause={pause} on:lap={lap} {subscription} {lapsed} />
</div>