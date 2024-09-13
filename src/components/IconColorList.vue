<template>
    <v-row justify="center">
        <v-col cols="12" class="text-center">
            <h3>Choose Color For Icon</h3>
        </v-col>
        <v-color-picker :swatches="colorSwatches" width="550" swatches-max-height='250' hide-sliders hide-canvas hide-inputs show-swatches v-model="selectedColor"></v-color-picker>   
    </v-row>
</template>

<script>
import Color from '../assets/color.json';
export default {
    data() {
        return {
            selectedColor: this.setColor, 
        };
    },
    props: {
        setColor: String,
        api: String,
    },
    computed: {
        colorSwatches() {
            return Color[this.api] || [];
        }
    },
    watch: {
        selectedColor(newColor) {
            this.$emit('colorSelected', newColor);  
        }
    },
};
</script>