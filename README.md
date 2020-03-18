# Insturctions

## Development

```sh
git clone https://github.com/dobladov/route-builder.git
cd route-builder
npm install
npm start
```
The app will be running on [localhost:1234](http://localhost:1234).

---

Run linters
```sh
npm test
```

## Production
```
npm run build
```

A new build will be at the dist/ folder.

# Important files

```sh
# Components
App.tsx # Main logic for the app, holding the other components
DownloadButton.tsx # On click it will generate a gpx file and download it
List.tsx # Represents the waypoints as a list that can be dragged and allows to delete single waypoints
Map.tsx # Represent the waypoints connected by a path and allows to create new waypoints

# Other
index.tsx # Initializes the react app and adds style normalizing
index.html # Entry point for the app
globalStyles.css # Styles that are not namespaced
deploy.yml # Github action to deploy the live production version
```

# Screenshot

![Route-Builder](https://user-images.githubusercontent.com/1938043/76961585-e8449c00-691d-11ea-9a2f-f47bc4fb8534.gif)
