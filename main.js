if ('serviceWorker' in navigator) {
    console.log('Si tiene Service Worker');

    navigator.serviceWorker.register('./sw.js')  // Asegúrate de que la ruta sea correcta
        .then(res => console.log('Service Worker cargando correctamente', res))
        .catch(err => console.log('Service Worker no se pudo cargar', err));  // Cambiado 'res' por 'err'
} else {
    console.log('No se localiza Service Worker');
}

if ("serviceWorker" in navigator) {
    console.log("si tiene");
  
    navigator.serviceWorker
      .register("./sw.js")
      .then((res) => console.log("serviceWorker cargado"))
      .catch((err) => console.log("serviceWorker no se puede cargar"));
  } else {
    console.log("no se enceuntra");
  }
  