const SEARCH_URL = "/random";


class ApiClient {

    async getRandomImageUrl() {
        let response = await fetch(SEARCH_URL),
            result = await response.text();
        return result;
    }

    async getRandomImage() {
        let that = this;
        return new Promise(async function(resolve, reject) {
            let url = await that.getRandomImageUrl(),
            image = new Image();
            image.onload = () => resolve(image);
            image.src = url;
        });
    }

}

export default new ApiClient();