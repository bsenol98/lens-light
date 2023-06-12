$(function () {
    const panelLeftBarSelected = (() => {
        $("#panelLeftBar .list-group .active").removeClass("active");
        $(`#panelLeftBar [href="${location.pathname}"]`).addClass("active");
    })();
})