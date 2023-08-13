

export {toDecimal, fromDecimal, initMap};

function fromDecimal(latitude, longitude) {
  // Determina a direção da latitude (Norte ou Sul)
  const direcaoLat = latitude >= 0 ? 'N' : 'S';
  // Determina a direção da longitude (Leste ou Oeste)
  const direcaoLon = longitude >= 0 ? 'E' : 'W';

  // Garante que os valores sejam positivos para os cálculos
  latitude = Math.abs(latitude);
  longitude = Math.abs(longitude);

  // Extrai os graus inteiros da latitude
  const grausLat = Math.floor(latitude);
  // Calcula os minutos a partir da parte decimal da latitude
  const minutosRawLat = (latitude - grausLat) * 60;
  // Extrai os minutos inteiros da latitude
  const minutosLat = Math.floor(minutosRawLat);
  // Calcula os segundos a partir da parte decimal dos minutos
  const segundosLat = (minutosRawLat - minutosLat) * 60;

  // Extrai os graus inteiros da longitude
  const grausLon = Math.floor(longitude);
  // Calcula os minutos a partir da parte decimal da longitude
  const minutosRawLon = (longitude - grausLon) * 60;
  // Extrai os minutos inteiros da longitude
  const minutosLon = Math.floor(minutosRawLon);
  // Calcula os segundos a partir da parte decimal dos minutos
  const segundosLon = (minutosRawLon - minutosLon) * 60;

  return {
    lat: `${grausLat}° ${minutosLat}' ${segundosLat.toFixed(2)}" ${direcaoLat}`,
    lng: `${grausLon}° ${minutosLon}' ${segundosLon.toFixed(2)}" ${direcaoLon}`,
  };

}

//funcao que recebe um par de cordenadas em DMS e retorna o mesmo par em Decimal
function toDecimal(latitudeDMS, longitudeDMS) {
  // Converte a string de coordenada DMS para valores numéricos
  const lat = parseDMS(latitudeDMS);
  const lon = parseDMS(longitudeDMS);
  
  // Calcula as coordenadas decimais a partir dos valores DMS
  const latitude = DMSToDecimal(lat.graus, lat.minutos, lat.segundos, lat.direcao);
  const longitude = DMSToDecimal(lon.graus, lon.minutos, lon.segundos, lon.direcao);
  
  return {
    latitude,
    longitude
  };
}

//função que recebe uma coordenada e retorna em Decimal
function DMSToDecimal(graus, minutos, segundos, direcao) {
  // Calcula o valor decimal a partir de graus, minutos e segundos
  let decimal = graus + minutos / 60 + segundos / 3600;
  
  // Inverte o sinal caso a direção seja "S" ou "W"
  if (direcao === 'S' || direcao === 'W') {
    decimal = -decimal;
  }
  
  return decimal;
}

function parseDMS(dms) {
  // Divide a string de graus, minutos e segundos em partes
  const partes = dms.split(/[^\d\w\.]+/);
  
  // Extrai os valores numéricos das partes
  const graus = parseFloat(partes[0]);
  const minutos = parseFloat(partes[1]);
  const segundos = parseFloat(partes[2]);
  const direcao = partes[3];
  
  return {
    graus,
    minutos,
    segundos,
    direcao
  };
}

function initMap() {

  const myLatlng = { lat: -25.363, lng: 131.044 };
  console.log(window)
  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  const marker = new window.google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });

  map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 3000);
  });
  marker.addListener("click", () => {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}


