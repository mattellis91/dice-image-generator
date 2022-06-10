<template>
  <div>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mt-4">
        <v-file-input @change="handleUpload"
          v-model="file"
          label="Click to select file"
          truncate-length="18"
        ></v-file-input>
      </v-col>

      <v-col cols="12">
        <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="dMax"
                  label="Max Number Of Dice"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="diceColors"
                  label="Dice Color"
                  :value="'Black'"
                ></v-select>
              </v-col>
            </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col cols="12">
          <canvas id="canvas"></canvas>
    </v-col>
  </v-row>
  </div>
</template>

<script>
  export default {
    name: 'MainView',

    data: () => ({
      diceColorSwitch:true, 
      dMax:10000, 
      diceColors:['Black','White'], 
      file:null,
      showCanvas: false,
      canvas: null,
      ctx: null
    }),

    methods: {
      handleUpload(e) {
        console.log(e);
        this.initCanvas();
      },

      //MAX DICE COUNT (each axis) - 200
      //DICE PIXEL SIZE - 20px

      initCanvas() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.display = 'block';

        const image = new Image();
        image.src = URL.createObjectURL(this.file);
        image.onload = () => {
          this.canvas.width = image.width;
          this.canvas.height = image.height;
          this.canvas.style.margin = 'auto';
          this.ctx.drawImage(image, 0, 0);
          const imageData = this.ctx.getImageData(0,0, image.width, image.height);
          const pixels = imageData.data;
          console.log(imageData);
          console.log('width ' + imageData.width);
          console.log('height ' + imageData.height);
          console.log('pixels: ' + imageData.data.length / 4);
          console.log('dice wide ' + this.getDiceCount(imageData.width));
          console.log('dice high ' + this.getDiceCount(imageData.height));

          //convert img pixels to greyscale
          for (var i = 0; i < pixels.length; i += 4) {

            let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
          }

          this.ctx.putImageData(imageData, 0, 0);
        }

        console.log(this.ctx);
      },

      getDiceCount(x) {
        return (x * 2) / 10;
      }

    }

  }
</script>
<style>
  #canvas {
    max-width: 2000px;
    max-height:2000px;
    background-color: aqua;
    display: none;
  }
</style>
