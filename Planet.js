import * as THREE from "three";

export const Planet = {
  createPlanet: (markerLatLong = []) => {
    // Create Planet geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    // Create Planet material
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "Anonymous";
    const planetTexture = textureLoader.load("http://i.imgur.com/puZgGjm.jpg");
    const material = new THREE.MeshPhongMaterial({
      map: planetTexture,
    });

    // Create Planet Mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Attach Marker to Planet Mesh
    for (let i = 0; i < markerLatLong.length; i++) {
      const latLong = markerLatLong[i];
      Planet.attachMarker(mesh, latLong[0], latLong[1]);
    }

    return mesh;
  },

  attachMarker: (meshPlanet, lat, long) => {
    // Create Marker mesh
    const geometry = new THREE.SphereGeometry(0.01, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("white"),
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Set Marker pos
    let latlonpoint = Planet.latLongToPos(lat, long, 0.5);
    mesh.position.set(latlonpoint[0], latlonpoint[1], latlonpoint[2]);

    // Attach marker to planet mesh
    meshPlanet.add(mesh);
  },

  latLongToPos: (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
  },
};
