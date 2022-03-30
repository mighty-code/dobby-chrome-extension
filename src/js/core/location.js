export default {
    getLocation() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    },
                    (error) => {
                        console.error(`ERROR(${error.code}): ${error.message}`)
                        reject(error)
                    },
                    {
                        timeout: 8000,
                    }
                )
            } else {
                console.debug('has no geolocation')
                resolve(null)
            }
        })
    },
}
