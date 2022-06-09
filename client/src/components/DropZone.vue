<template>
    <!-- add `data-active` and the event listeners -->
    <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active">
          <label for="file-input">
              <span v-if="dropZoneActive">
                  <span>Drop Them Here</span>
                  <span class="smaller">to add them</span>
              </span>
              <span v-else>
                  <span>Drag Your Files Here</span>
                  <span class="smaller">
                      or <strong><em>click here</em></strong> to select files
                  </span>
              </span>

              <input type="file" id="file-input" multiple @change="onInputChange" />
          </label>
        </slot>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const emit = defineEmits(["files-dropped"]);

let active = ref(false);
let inActiveTimeout:any = null;

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}

function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e:any) {
  console.log(e);
  setInactive();
  emit("files-dropped", [...e.dataTransfer.files]);
}

function preventDefaults(e:any) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>
