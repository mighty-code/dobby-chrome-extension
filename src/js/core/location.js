export default {
    getLocation() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    error => {
                        log.error(`ERROR(${error.code}): ${error.message}`);
                        reject(error);
                    },
                    {
                        timeout: 8000,
                    }
                );
            } else {
                log.debug('has not geolocation');
                resolve(null);
            }
        });
    },
};
