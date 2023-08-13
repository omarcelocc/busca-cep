<template>
  <section>
    <div class="mapa" id="map" ref="mapDiv"></div>
    <div v-if="map">
      <div class="show-coords" v-if="posicaoClick">
        <span>
          lat: {{ posicaoClick.lat }} <span>lng: {{ posicaoClick.lng }}</span>
        </span>
        <span>
          lat: {{ mostrarDMS(posicaoClick).lat }}
          <span>lng: {{ mostrarDMS(posicaoClick).lng }}</span>
        </span>
      </div>
      <div class="show-coords" v-else-if="posicaoAtual">
        <span>
          lat: {{ posicaoAtual.lat }} <span>lng: {{ posicaoAtual.lng }}</span>
        </span>
        <span>
          lat: {{ mostrarDMS(posicaoAtual).lat }}
          <span>lng: {{ mostrarDMS(posicaoAtual).lng }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { toDecimal, fromDecimal } from "./script.js";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useGeolocation } from "./useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyBfIAMRPJhnOFR3uxi4ZV4PK66DXixo7ks";

let marker = null;
export default {
  props: {
    cep: {
      type: String,
      required: true,
    },
  },
  watch: {
    cep() {
      //this.$emit("updateCep", newValue);
      this.loadMarkerCep(this.cep);
    },
  },
  setup() {
    const { coords } = useGeolocation();
    const posicaoAtual = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    const posicaoClick = ref(null);
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    let map = ref(null);
    let clickListener = null;

    function addMarker(position) {
      return new google.maps.Marker({
        position: position,
        map: map.value,
      });
    }

    onMounted(async () => {
      await loader.load();
      map.value = new google.maps.Map(mapDiv.value, {
        center: posicaoAtual.value,
        zoom: 13,
      });
      if (marker) {
        marker.setMap(null);
      }
      marker = addMarker(posicaoAtual.value);
      
      clickListener = map.value.addListener(
        "click",
        ({ latLng: { lat, lng } }) => {
          posicaoClick.value = {
            lat: lat(),
            lng: lng(),
          };
          if (marker) {
            marker.setMap(null);
          }
          marker = addMarker(posicaoClick.value);
        }
      );
    });
    onUnmounted(async () => {
      if (clickListener) {
        clickListener.remove();
      }
    });

    return { posicaoAtual, posicaoClick, mapDiv, map, addMarker, marker };
  },
  methods: {
    mostrarDMS(coordenadas) {
      return fromDecimal(coordenadas.lat, coordenadas.lng);
    },

    async moveMap() {},
    loadMarkerCep(cep) {
      const url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        cep +
        "&key=AIzaSyDutzi5gvCcH48hEZufzcS-EFKcAshfMGY";
      fetch(url)
        .then((r) => r.json())
        .then(async (v) => {
          this.position = v.results[0].geometry.location;
          marker.setMap(null);
          marker = this.addMarker(this.position);
          this.map.setCenter(this.position);
          this.map.setZoom(16);
        });
    },
  },

  data() {
    return {
      position: {},
    };
  },
};
</script>

<style scoped>
.mapa {
  width: 100%;
  height: 450px;
  border-radius: 10px;
}
.show-coords {
  display: flex;
  gap: 16px;
}
.show-coords span {
  margin-left: 8px;
  font-size: 0.7rem;
  text-transform: uppercase;
}
ul {
  background: #f1f1f1;
  padding: 20px 40px;
  border-radius: 10px;
  color: #000;
  font-weight: 500;
}
section {
  margin: 0px 30px;
  display: grid;
  gap: 10px;
}
form {
  padding: 0px 30px;
  display: flex;
  gap: 20px;
}
input {
  width: 100%;
  padding: 8px 22px 8px 10px;
  font-size: 1rem;
  border: 2px solid #e3e3e3;
  background: #fafafa;
  border-radius: 10px;
  outline: none;
  color: blueviolet;
}

input:focus {
  border-color: blueviolet;
}
.botoes {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>