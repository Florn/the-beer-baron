import Geolocation from "react-native-geolocation-service";

async function getCurrentPosition(success, failure) {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  })
    .then(position => {
      const { latitude, longitude } = position.coords;
      return success({
        latitude,
        longitude
      });
    })
    .catch(error => {
      Sentry.addBreadcrumb("Geolocation", "Failed to get current position");
      return failure(error);
    });
}
