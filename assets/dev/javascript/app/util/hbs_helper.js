Handlebars.registerHelper("cover_img", function (cover) {
    var image = API_host.path_join(cover);
    console.log(image);
    return image
});