<script setup>
  import { ref, onMounted } from 'vue'

  const seconds = ref(0)
  const timeWorker = ref(null)
  
  const testWorker = () => {
    const worker = new Worker(new URL('./testWorker.js', import.meta.url))
    worker.postMessage({ command: 'sum', value: 5 })
    console.log('resultado:')
    worker.onmessage = (e) => {
      console.log(e.data)
    }
  }

  const startTimer = () => {
    timeWorker.value.postMessage({ command: 'start', time: seconds.value })
    timeWorker.value.onmessage = (e) => {
      seconds.value = e.data
    }
  }

  const stopTimer = () => {
    timeWorker.value.postMessage({ command: 'stop', time: 0 })
    timeWorker.value.onmessage = (e) => {
      seconds.value = e.data
    }
    timeWorker.value.terminate()
  }

  onMounted(() => {
    timeWorker.value = new Worker(new URL('./timerWorker.js', import.meta.url))
  })

</script>

<template>
  <h3>Componente Ejemplo:</h3>


  <h3>{{ seconds }}</h3>

  <!-- <button @click="testWorker()"> Web Worker </button> -->
  <button @click="startTimer()"> start </button>
  <button @click="stopTimer()"> stop </button>

</template>