
const clientID = ''
const redirectURI = "http://localhost:3000/";

let accessToken;
const Spotify = {
    getAccessToken(lastSearch) {
        if (accessToken) {
            return accessToken;
        }
        //check for access token match
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // this clears the parameters, alllwing us to grab a new access
            // token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.sessionStorage.lastSearch = lastSearch;
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }

    },

    search(term) {
        accessToken = this.getAccessToken(term)
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {headers: {Authorization: `Bearer ${accessToken}`}})
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    console.log('error with return')
                    return [];
                }
                let returnValue = jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
                return returnValue;
            });
    },

    savePlaylist(name, uris) {
        if (!name || uris.length < 1) {
            return;
        } else {
            accessToken = Spotify.getAccessToken();
            let userId;
            let playlistId;

             fetch('https://api.spotify.com/v1/me', {headers: {'Authorization': `Bearer  ${accessToken}`}})
                .then(response => response.json())
                .then(responseJSON => {
                    userId = responseJSON.id
                })
                .then(() => {
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        method: 'POST',
                        headers: {'Authorization': `Bearer  ${accessToken}`},
                        body: JSON.stringify({name: name, public: true})
                    })
                })
                .then(response => {
                    return response.json()
                })
                .then(jsonResponse => {
                    playlistId = jsonResponse.id;
                })
                .then(() => {
                    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {'Authorization': `Bearer  ${accessToken}`, 'Content-Type': 'application/json'},
                    body: JSON.stringify({uris: uris})
                        }
                    )
                })
                .then(() => {
                    console.log('Success');
                })
        }
    }

};


export default Spotify;

