# How To Recreate

Useful commands to handle PCF components.

For more details, see [Microsoft Docs](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/create-custom-controls-using-pcf).

## Prerequisites 
- 
- Windows machine
- [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction#update-power-platform-cli-for-windows). 
- npm
- [MSBuild](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2022) (you can avoid this requirement and use the provided [Dockerfile](./Dockerfile) instead)

## Create boilerplate component and solution

```powershell
# scope to component dir
mkdir component
cd component
# create new boilerplate component
pac pcf init --namespace <specify your namespace here> --name <Name of the code component> --template field --run-npm-install
# scope solution to Solutions dir
mkdir Solutions
cd Solutions
# create new boilerplate solution
pac solution init --publisher-name <Developer name> --publisher-prefix <Unique prefix, e.g. dev>
# reference component
pac solution add-reference --path ..\
```

## Build solution

```bash
cd build
docker build -f Dockerfile -t msbuild .
docker create --name msbuild-1 msbuild
docker cp msbuild-1:C:\\build\\Solutions\\bin .\\Solutions\bin
```

Borrows heavily from [alexellis.io](https://blog.alexellis.io/3-steps-to-msbuild-with-docker/).
