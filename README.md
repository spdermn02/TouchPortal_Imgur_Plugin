# TouchPortal Imgur Plugin

- [TouchPortal Imgur Plugin](#touchportal-imgur-plugin)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Issues](#issues)
  - [License](#license)
  - [Author](#author)


## Changelog
```
v1.0.0 - Upload an image to Imgur
    Actions
        - Upload image from path to Imgur
    States
        - Last Imgur Url
    Events
        - None
```

## Installation
1) download the appropriate .tpp file for your OS
   1) [Windows](Installers/TPImgur-Win.tpp)
   2) [MacOS](Installers/TPImgur-Mac.tpp)
2) Using the Wrench icon in Touch Portal PC application, choose "Import Plug-In"
3) should popup 2 things
   1) "Successfully imported" click "OK"
   2) "Do you want to trust this plugin?" click "Trust Always" (if you do not you will be asked this question again on restart of touch portal)
4) Add the Imgur Action to a button or event or flow to upload an image
5) Do something with the last imgur url state that is returned.
   1) *Note*: Depending on size of image and upload speed to imugr, the last imgur url may take a few seconds to return.


## Issues
Please use the #imgur channel on the official Touch Portal discord, or the Issues tab on github to report issues

## License
MIT

## Author
Jameson Allen aka Spdermn02